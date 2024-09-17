import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';
import { getProductById, updateProduct } from '../../../api/productService';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProductById(id);
            setProduct(response);
        };

        fetchProduct();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('Token');
        try {
            await updateProduct(id, product, token);
            alert('Product updated successfully');
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={(e) => setProduct({ ...product, image: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
