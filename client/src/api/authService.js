import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post('https://e-commerce-test-qeb8.onrender.com/api/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Failed to login: ' + error.response.data.message);
    }
};


export const validateToken = async (token) => {
    try {
        const response = await fetch('https://e-commerce-test-qeb8.onrender.com/api/auth/validateToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.isValid;
    } catch (error) {
        console.error('Token validation request failed:', error);
        return false;
    }
};