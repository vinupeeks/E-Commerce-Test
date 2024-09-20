import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { fetchCartItems, removeFromCart, updateCartItemQuantity } from '../../api/cartService.js';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems()
            .then(data => {
                console.log('Fetched cart items:', data);
                setCartItems(data.products || []);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []);
    useEffect(() => {
        console.log('cartItems:', cartItems);
    }, [cartItems]);

    const handleHomePage = () => {
        navigate(`/`);
    }
    const handleRemoveFromCart = async (productId) => {
        try {
            const response = await removeFromCart(productId);
            if (response.statusText === 'OK') {
                setCartItems(prevCart => prevCart.filter(item => item.productId?._id !== productId));
                console.log('Product removed:', response);
            }
        } catch (error) {
            console.error('Failed to remove product:', error);
        }
    };

    const viewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleIncrement = async (productId) => {
        const updatedCart = cartItems.map(item => {
            if (item.productId?._id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        setCartItems(updatedCart);

        try {
            const newQuantity = updatedCart.find(item => item.productId?._id === productId)?.quantity;
            await updateCartItemQuantity(productId, newQuantity);
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const handleDecrement = async (productId) => {
        const updatedCart = cartItems.map(item => {
            if (item.productId?._id === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        setCartItems(updatedCart);

        try {
            const updatedQuantity = updatedCart.find(item => item.productId?._id === productId)?.quantity;
            if (updatedQuantity > 0) {
                await updateCartItemQuantity(productId, updatedQuantity);
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        if (item.productId) {
            return acc + item.productId.price * item.quantity;
        }
        return acc;
    }, 0);

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <>
                    <p>Your cart is empty</p>
                    <button onClick={handleHomePage}>GO and Purchase</button>
                </>

            ) : (
                cartItems.map(item => (
                    item.productId && (
                        <div key={item.productId._id || item._id} className="cart-item">
                            <img src={item.productId.image} alt={item.productId.name} />
                            <div>
                                <h3>{item.productId.name}</h3>
                                <p>Unit Price: ${item.productId.price}</p>
                                <p>Total Price: ${(item.productId.price * item.quantity).toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p><strong>Status:</strong> {item.productId.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                <button onClick={() => handleIncrement(item.productId._id)}>+</button>
                                <button onClick={() => handleDecrement(item.productId._id)}>-</button>
                                <button onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
                                <button onClick={() => viewDetails(item.productId._id)}>View Details</button>
                            </div>
                        </div>
                    )
                ))
            )}
            <h3>Total Price of Cart: ${totalPrice.toFixed(2)}</h3>
            <button>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;
