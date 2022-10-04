const StockModel = require("../../models/v1/Stock.Model");

// POST a new product
exports.createStock = async (req, res, next) => {
  try {
    const stockDetails = req.body;

    // this is the old way যখন save করার সময় কোন কিছু করার দরকার
    const stock = await StockModel(stockDetails);
    if (stock.quantity == 0) {
      stock.status = "out-of-stock";
    }
    await stock.save();

    // const product = await ProductModel.create(productDetails);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      stock,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all products
exports.getAllStocks = async (req, res, next) => {
  try {
    const stocks = await StockModel.find();
    res.status(200).json({
      success: true,
      message: `All ${stocks.length} products`,
      stocks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET  products by features (query | pagination | sorting | filtering)
exports.getStocksByFeatures = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    // step-1: req.query থেকে page,limit,sort নামের key value গুলোকে exclude করে আলাদা করে দিব
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((field) => delete filters[field]);

    // step-2 [filtering,filteringByRange,sorting,specific fieldsk,pagination]:

    // advance filtering এর জন্য আমাদেরকে filter opt এর আগে $ দিতে হবে। এরজন্য filters var কে striginfy করে নিব কাজ শেষে আবার parse করে নিব। অর্থাঠ price: { lt: '200' } => "price":{"$lt":"200"} => {price:{$lt:"200"}}

    const filtersStr = JSON.stringify(filters).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersStr);

    const queries = {};
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" "); // "price,name" => "price name"
      queries.fields = fields;
    }
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" "); // "price,name" => "price name"
      queries.sortBy = sortBy;
    }
    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = Number(limit);
    }
    console.log(req.query.page, queries);
    const stocks = await StockModel.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy);

    const totalStocks = await StockModel.countDocuments(filters);
    const pageCount = Math.ceil(totalStocks / queries.limit);

    res.status(200).json({
      success: true,
      message: `All ${totalStocks} products`,
      pageCount,
      stocks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await StockModel.findById(id);
    res.status(200).json({
      success: true,
      message: `Stock with id: ${id}`,
      stock,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};