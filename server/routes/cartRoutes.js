const express = require('express');
const { addToCart, getCartItems, removeFromCart, updateCartQuantity } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getCartItems)
    .post(protect, addToCart);
router.route('/:productId')
    .delete(protect, removeFromCart)
    .put(protect, updateCartQuantity);

module.exports = router;
