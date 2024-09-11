import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../../api/productService';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response);
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('Token');
        try {
            await deleteProduct(id, token);
            alert('Product deleted successfully');
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <Link to="/add-product">Add Product</Link>
            <ul>
                {products.map(product => (
                    <li key={product._id} className="product-list-item">
                        <img src={product.image} alt={product.name} />
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <button onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</button>
                            <button onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
