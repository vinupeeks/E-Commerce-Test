const express = require('express');
const { addToWishlist, getWishlistItems, removeFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getWishlistItems)
    .post(protect, addToWishlist);
router.route('/:productId')
    .delete(protect, removeFromWishlist);

module.exports = router;
