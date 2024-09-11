const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add a product to the cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId == productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({ userId: req.user.id, products: [{ productId, quantity }] });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get cart items
exports.getCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    console.log('Prdct Id Removed:',productId);
    
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        console.log(`cartr details`,cart);
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId.toString());
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        cart.products.splice(productIndex, 1);
        console.log(`updated cart:`,cart);
        
        await cart.save(); 
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user._id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productInCart = cart.products.find(p => p.productId && p.productId.toString() === productId.toString());

        if (!productInCart) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        if (quantity > 0) {
            productInCart.quantity = quantity;
        } else {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        res.status(500).json({ message: 'Server error' });
    }
};