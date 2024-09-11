const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, createManyProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
// const admin = require '../middleware/authMiddleware';
const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(protect, admin, createProduct);

router.route('/bulk')
    .post(protect, admin, createManyProducts);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
