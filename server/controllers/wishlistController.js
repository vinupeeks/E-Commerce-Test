const Wishlist = require('../models/Wishlist');

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.user.id, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
            }
        }
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get wishlist items
exports.getWishlistItems = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        wishlist.products = wishlist.products.filter(p => p != productId);
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
