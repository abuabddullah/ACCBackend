const CategoryModel = require('../../models/v1/Category.Model');

exports.createCategory = async (req, res, next) => {
    try {
        const categoryDetails = req.body;
        const result = await CategoryModel.create(categoryDetails);
        res.status(201).json({
        success: true,
        message: 'Category created successfully',
        result,
        });
    } catch (error) {
        res.status(400).json({
        success: false,
        message: error.message,
        });
    }
    };


// get all categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const result = await CategoryModel.find();
        res.status(200).json({
        success: true,
        message: 'All categories',
        result,
        });
    } catch (error) {
        res.status(400).json({
        success: false,
        message: error.message,
        });
    }
    }   