const express = require('express');
const router = express.Router();

const BrandController = require('./../../controllers/v1/Brands.Controller');






router.route('/brand').post(BrandController.createBrand).get(BrandController.getAllBrands);




router.route('/brand/:id').get(BrandController.getBrandById).patch(BrandController.updateBrandById).delete(BrandController.deleteBrandById);

module.exports = router;