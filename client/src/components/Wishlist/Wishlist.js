import React, { useEffect, useState } from 'react';
import { getAllWishlist, removeFromWishlist } from '../../api/wishListService.js';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';
import { addToCart } from '../../api/cartService.js';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllWishlist()
            .then(data => {
                setWishlistItems(data.products);

            })
            .catch(error => {
                console.error('Error fetching wishlist items:', error);
            });
    }, []);

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId)
            .then(() => {
                setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId))
            })
            .catch(error => {
                console.error('Error removing product from wishlist:', error);
            })
    };

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('Token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await addToCart(product._id, token);
            console.log('Product added to cart', response.data);
            const removeResponse = await removeFromWishlist(product._id, token)
            console.log('Product removed from wishlist:', removeResponse.data);
            setWishlistItems((prevItems) => prevItems.filter(item => item._id !== product._id));
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div className="wishlist-page">
            <h2>Your Wishlist</h2>
            {wishlistItems.map((item,) => (
                <div key={item._id} className="wishlist-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                        <h3>{item.name}</h3>
                        <button onClick={() => handleRemoveFromWishlist(item._id)}>Remove</button>
                        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Wishlist;
