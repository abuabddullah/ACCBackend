const StoreModel = require("../../models/v1/Store.Model");
exports.createStore = async (req, res, next) => {
  try {
    const storeDetails = req.body;
    const result = await StoreModel.create(storeDetails);
    res.status(201).json({
      success: true,
      message: "Store created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// get all stores
exports.getAllStores = async (req, res, next) => {
  try {
    const result = await StoreModel.find();
    res.status(200).json({
      success: true,
      message: "All stores",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
} 


// update store by id
exports.updateStoreById = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    const storeDetails = req.body;
    const result = await StoreModel.findByIdAndUpdate(storeId, storeDetails, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Store updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


//get store by id
exports.getStoreById = async (req, res, next) => {  
  try {
    const storeId = req.params.id;
    const result = await StoreModel.findById(storeId);
    res.status(200).json({
      success: true,
      message: "Store got successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
} 