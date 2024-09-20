import axios from 'axios';

const API_BASE_URL = 'https://e-commerce-test-qeb8.onrender.com/api/wishlist';


export const addToWishlist = async (productId) => {
    const token = localStorage.getItem('Token');
    if (!token) throw new Error('Not authenticated');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_BASE_URL, { productId }, config);
    return response.data;
};


export const getAllWishlist = async () => {
    const token = localStorage.getItem('Token');
    if (!token) throw new Error('Not authenticated');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_BASE_URL, config);
    return response.data;
}


export const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('Token');
    try {
        const response = await axios.delete(`${API_BASE_URL}/${productId}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};
