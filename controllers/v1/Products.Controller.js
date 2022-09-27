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
      message: `All ${products.length} products`,
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
      .where("price")
      .gte(1000)
      .lt(100000)
      .limit(2)
      .sort({ quantity: -1 });

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

// update a product by id
exports.updateProduct = async (req, res, next) => {
  try {
    const productDetails = req.body;
    const { id } = req.params;

    // const product = await ProductModel.updateOne({_id:id},{$set:productDetails}); /* using $set operator */
    // const product = await ProductModel.updateOne({ _id: id }, productDetails, {
    //   runValidators: true,
    // }); /* without using $set operator */
    // using updateOne is not preferable because এটা mongoose schema কে validate করে না তা যেকোন value ই update করে দেয় যেটা আমরা চাই না। আর এটাকে থামানোর জন্য runValidators:true দিতে হয়।

    // using set and save method for update
    // const product = await ProductModel.findById(id);
    // const result = product.set(productDetails).save();

    /* const result = await ProductModel.findByIdAndUpdate(id, productDetails, {
      new: true,
      runValidators: true,
    }); */

    // incrementing 21 with price and update
    const result = await ProductModel.findByIdAndUpdate(
      id,
      { $inc: { price: 21 } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// bulk update products
exports.bulkUpdateProductService = async (req, res, next) => {
  try {
    const { idsArray, updateDetails } = req.body;

    /* // যদি conditionally update করতে চাই তাহলে এভাবে করতে হবে।  এর মানে হচ্ছে price ১০০০৳ এর উপরে যারা আছে তাদের সবার দাম ২১ বাড়াবে।
    const result = await ProductModel.updateMany(
      { price: { $gt: 1000 } },
      { $inc: { price: 21 } },
      {
        new: true,
        runValidators: true,
      }
    ); */

    // direct update করতে চাই তাহলে এভাবে করতে হবে।
    // const result = await ProductModel.updateMany(
    //   { _id: idsArray },
    //   updateDetails,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    // const result = await ProductModel.updateMany(
    //   { _id: { $in: idsArray } },
    //   updateDetails,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // ); /* using $in opt */

    // Promise.all use করে একসাথে একাধিক আপডেট করতে পারি।

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// bulk update for individual products
exports.bulkUpdateIndividualProductService = async (req, res, next) => {
  try {
    const { productsArr } = req.body;

    const updatedProducts = [];
    productsArr.forEach((product) => {
      updatedProducts.push(
        ProductModel.findByIdAndUpdate(product.id, product.data, {
          new: true,
          runValidators: true,
        })
      );
    });

    const result = await Promise.all(updatedProducts);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// delete product by id
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    
    const result = await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// bulk delete products
exports.bulkDeleteProductService = async (req, res, next) => {
  try {
    const { idsArray } = req.body;

    const result = await ProductModel.deleteMany({ _id: idsArray });

    if(!result.deletedCount){
      throw new Error("No product found to delete");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};