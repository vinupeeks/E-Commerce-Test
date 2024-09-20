
import axios from 'axios';

const API_BASE_URL = 'https://e-commerce-test-qeb8.onrender.com/api/products';

export const getProducts = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    const token = localStorage.getItem('Token');
    if (!token) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
};


export const createProduct = async (product) => {
    const token = localStorage.getItem('Token');
    if (!token) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await axios.post(API_BASE_URL, product, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    const token = localStorage.getItem('Token');
    if (!token) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, product, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    const token = localStorage.getItem('Token');
    if (!token) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};