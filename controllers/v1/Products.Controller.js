const ProductModel = require("./../../models/v1/Products.Model");

exports.isRouteWorking = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Route is working fine",
  });
};

// POST a new product
exports.createProduct = async (req, res, next) => {
  try {
    const productDetails = req.body;

    // this is the old way যখন save করার সময় কোন কিছু করার দরকার
    const product = await ProductModel(productDetails);
    if (product.quantity == 0) {
      product.status = "out-of-stock";
    }
    await product.save();

    // const product = await ProductModel.create(productDetails);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      success: true,
      message: "All products",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get a single product
exports.getSingleProduct = async (req, res, next) => {
  try {
    // findById || findOne || find || where && filter


    // const product = await ProductModel.findById(req.params.id); /* staic query*/
    // const product = await ProductModel.find({ _id: req.params.id }); /* single query*/
    // const product = await ProductModel.find({ _id: req.params.id,name:"Computer" }); /* multi query by && opt*/
    // const product = await ProductModel.find({$or:[{ _id: req.params.id},{name:"Computer" },]}); /* multi query by || opt*/
    // const product = await ProductModel.find({status:{$ne:"out-of-stock"}}); /* query by filtering opt $ne*/
    // const product = await ProductModel.find({quantity:{$gte:10}}); /* query by filtering opt $gte*/
    // const product = await ProductModel.find({quantity:{$lte:10}}); /* query by filtering opt $lte*/
    // const product = await ProductModel.find({name:{$in:["Computer","Microphone"]}}); /* query by serching opt $in [includes]*/
    // const product = await ProductModel.find({}).select({quantity:1}); /* query by projction only which field you want to show*/
    // const product = await ProductModel.find({},"name quantity"); /* query by projction only which field you want to show*/
    // const product = await ProductModel.find({},"-name -quantity"); /* query by projction except which field you don't want to show*/
    // const product = await ProductModel.find({}).limit(1); /* only limted no of item to show*/
    // const product = await ProductModel.find({}).sort({quantity:-1}); /* to sort the data by quantity in descending order[বড় থেকে ছোট]*/
    // const product = await ProductModel.find({}).sort({quantity:1}); /* to sort the data by quantity in ascending order[ছোট থেকে বড়]*/


    /* using mongoose default query builder to avoid the code reading deficulty */
    const product = await ProductModel
    // .where("status").ne("out-of-stock");
    // .where("quantity").eq(15);
    .where("price").gte(1000).lt(100000).limit(2).sort({quantity:-1});



    res.status(200).json({
      success: true,
      message: "Single product",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
