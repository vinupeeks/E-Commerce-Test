import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/productService.js';
import { addToCart } from '../../api/cartService.js';
import './SingleProduct.css';
import { addToWishlist } from '../../api/wishListService.js';

const SingleProduct = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);


    useEffect(() => {
        getProductById(id)
            .then(data => {
                console.log(data);

                setProduct(data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('Token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await addToCart(product._id, token);
            console.log('Product added to cart', response.data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleAddToWishlist = async (productId) => {
        try {
            const response = await addToWishlist(productId);
            console.log('Product added to wishlist:', response);

        } catch (error) {
            if (error.message === 'Not authenticated') {
                navigate('/login');
            } else {
                console.error('Error adding product to wishlist', error);
            }
        };
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="single-product">
            <div className="image-section">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="details-section">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Status:</strong> {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button onClick={() => handleAddToWishlist(product._id)}>Add to Wishlist</button>
            </div>
        </div>
    );
};

export default SingleProduct;
