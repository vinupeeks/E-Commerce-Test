const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    console.log(`Details of products:`, req.body);
    const { name, description, price, category, image, stock } = req.body;
    try {
        const product = new Product({ name, description, price, category, image, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// New createManyProducts function
exports.createManyProducts = async (req, res) => {
    const products = req.body; // Expecting an array of product objects

    try {
        // Validate that `products` is an array and contains valid product objects
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Invalid input: Products must be a non-empty array' });
        }

        // Map through each product and create them individually
        const createdProducts = [];
        for (const productData of products) {
            // Validate product data
            if (!productData.name || !productData.price) {
                // Ensure required fields are present
                throw new Error('Product data is missing required fields');
            }

            const product = new Product(productData);
            const savedProduct = await product.save();
            createdProducts.push(savedProduct);
        }

        res.status(201).json({ message: 'Products successfully created', data: createdProducts });
    } catch (error) {
        // Log error for debugging
        console.error('Error inserting products:', error);

        // Determine if the error is related to validation
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }

        // Handle other server errors
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
