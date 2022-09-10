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

module.exports = router;