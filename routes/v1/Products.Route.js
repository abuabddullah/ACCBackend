const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/v1/Products.Controller');


// @route   POST api/v1/products
// @desc    Create a new product
// @access  admin
router.route('/product').post(ProductController.createProduct);


// @route   GET api/v1/products
// @desc    Get all products
// @access  Public
router.route('/products').get(ProductController.getAllProducts);


// @route   GET api/v1/productsByFeatures
// @desc    Get all productsByFeatures
// @access  Public
router.route('/productsByFeatures').get(ProductController.getProductsByFeatures);


// @route   GET api/v1/products/:id
// @desc    Get a single product
// @access  Public
router.route('/products/:id').get(ProductController.getSingleProduct);


//@rout PATCH api/v1/products/bulk-update
//@desc update multiple products
//@access admin
router.route('/products/bulk-update').patch(ProductController.bulkUpdateProductService);
router.route('/products/Individual-bulk-update').patch(ProductController.bulkUpdateIndividualProductService);
router.route('/products/bulk-delete').delete(ProductController.bulkDeleteProductService);


// @route   PATCH api/v1/products/:id
// @desc    Update a single product
// @access  admin
router.route('/products/:id').patch(ProductController.updateProduct).delete(ProductController.deleteProduct);

module.exports = router;