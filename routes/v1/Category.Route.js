const express = require('express');
const router = express.Router();

const CategoryController = require('../../controllers/v1/Category.Controller');

router.route('/category').post(CategoryController.createCategory).get(CategoryController.getAllCategories);


module.exports = router;
