import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createProduct } from '../../../api/productService';
import './AddProduct.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('Token');
        const newProduct = { name, description, price, category, image, stock };
        if (!name || !description || !price || !category || !image) {
            alert(`Enter All Details about the product`);
            return;
        }
        try {
            await createProduct(newProduct, token);
            alert('Product added successfully');
            navigate('/products');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            <Link to="/products">
                <button>Products List</button>
            </Link>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    min={0}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    min={0}
                    onChange={(e) => setStock(e.target.value)}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
