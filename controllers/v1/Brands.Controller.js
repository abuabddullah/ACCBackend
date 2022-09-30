const BrandModel = require("./../../models/v1/Brand.Model");

exports.isRouteWorking = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "brandController Route is working fine",
  });
};

// brand related apis start
exports.createBrand = async (req, res, next) => {
  try {
    const brandDetails = req.body;
    const result = await BrandModel.create(brandDetails);
    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBrands = async (req, res, next) => {
  try {
    const result = await BrandModel.find().select("-products -suppliers");
    const totalBrands = await BrandModel.countDocuments();
    res.status(200).json({
      success: true,
      message: `All ${totalBrands} brands fetched successfully`,
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get brand by id
exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await BrandModel.findById(id).select("-products -suppliers");

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: `No brand found with id ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Brand with id ${id} fetched successfully`,
      brand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// update brand by id
exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brandDetails = req.body;
    const brand = await BrandModel.findByIdAndUpdate(id, brandDetails, {
      new: true,
      runValidators: true,
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: `No brand found with id ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Brand with id ${id} updated successfully`,
      brand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// delete brand by id
exports.deleteBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await BrandModel.findByIdAndDelete(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: `No brand found with id ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Brand with id ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};