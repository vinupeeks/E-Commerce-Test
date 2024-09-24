import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/productService.js';
import { validateToken } from '../../api/authService.js';
import { addToCart } from '../../api/cartService.js';
import './ProductListing.css';
import { addToWishlist } from '../../api/wishListService.js';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);

    const handleAction = async (product, actionType) => {
        const token = localStorage.getItem('Token');

        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const isValid = await validateToken(token);
            if (!isValid) {
                localStorage.removeItem('Token');
                navigate('/login');
                return;
            }
            if (actionType === 'cart') {
                try {
                    await addToCart(product._id, token);
                    alert('Product added to cart');
                } catch (error) {
                    console.error('Error adding product to cart:', error.response?.data || error);
                }
            } else if (actionType === 'wishlist') {
                try {
                    const response = await addToWishlist(product._id);
                    alert('Product added to wishlist:', response);
                } catch (error) {
                    if (error.message === 'Not authenticated') {
                        navigate('/login');
                    } else {
                        console.error('Error adding product to wishlist', error);
                    }
                }
            }
        } catch (error) {
            console.error('Token validation error:', error);
            localStorage.removeItem('Token');
            navigate('/login');
        }
    };

    return (
        <div>
            <div className="search-container">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <img
                        src={"https://th.bing.com/th/id/OIP.NfAAYLO3ftYuKOrZdOUk9wHaHa?rs=1&pid=ImgDetMain"}
                        alt="Search Icon"
                        className="search-icon"
                    />
                </div>
            </div>
            <div className="product-listing">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                        <div className="product-actions">
                            <button onClick={() => handleAction(product, 'cart')}>Add to Cart</button>
                            <button onClick={() => handleAction(product, 'wishlist')}>Add to Wishlist</button>
                        </div>
                        <Link to={`/product/${product._id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
