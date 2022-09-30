const express = require('express');
const router = express.Router();

const BrandController = require('./../../controllers/v1/Brands.Controller');



// @route   GET api/v1/
// @desc    Get success message
// @access  Public
router.route('/').get(BrandController.isRouteWorking);



router.route('/brand').post(BrandController.createBrand).get(BrandController.getAllBrands);




router.route('/brand/:id').get(BrandController.getBrandById).patch(BrandController.updateBrandById).delete(BrandController.deleteBrandById);

module.exports = router;