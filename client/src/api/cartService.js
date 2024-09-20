import axios from 'axios';
const API_BASE_URL = 'https://e-commerce-test-qeb8.onrender.com/api/cart/';


export const fetchCartItems = async () => {
    const token = localStorage.getItem('Token');
    if (!token) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`Data`,response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
};

export const addToCart = async (productId, token) => {
    try {
        const response = await axios.post(
            API_BASE_URL,
            { productId, quantity: 1 },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};

export const removeFromCart = async (productId) => {
    const token = localStorage.getItem('Token');
    try {
        const response = await axios.delete(`${API_BASE_URL}/${productId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error;
    }
};

export const updateCartItemQuantity = async (productId, quantity) => {
    const token = localStorage.getItem('Token');
    try {
        const response = await axios.put(`${API_BASE_URL}${productId}`, 
            { quantity },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};
