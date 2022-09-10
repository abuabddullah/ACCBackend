const ProductModel = require('./../../models/v1/Products.Model');

exports.isRouteWorking = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Route is working fine"
    })
}


// POST a new product
exports.createProduct = async (req, res, next) => {
    try {
        const productDetails = req.body;

        // this is the old way যখন save করার সময় কোন কিছু করার দরকার 
        const product = await ProductModel(productDetails);
        if(product.quantity == 0) {
            product.status = "out-of-stock";
        }
        await product.save();


        // const product = await ProductModel.create(productDetails);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}