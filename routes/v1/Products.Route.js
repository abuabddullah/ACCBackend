const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/v1/Products.Controller');


// @route   GET api/v1/
// @desc    Get success message
// @access  Public
router.route('/').get(ProductController.isRouteWorking);


// @route   POST api/v1/products
// @desc    Create a new product
// @access  admin
router.route('/product').post(ProductController.createProduct);


// @route   GET api/v1/products
// @desc    Get all products
// @access  Public
router.route('/products').get(ProductController.getAllProducts);


// @route   GET api/v1/products/:id
// @desc    Get a single product
// @access  Public
router.route('/products/:id').get(ProductController.getSingleProduct);

module.exports = router;