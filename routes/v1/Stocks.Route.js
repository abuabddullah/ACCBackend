const express = require("express");
const router = express.Router();


const StockController = require("../../controllers/v1/Stocks.Controller");


  

router.route("/stock").post(StockController.createStock);


router.route("/stocks").get(StockController.getAllStocks);


router
  .route("/stocksByFeatures")
  .get(StockController.getStocksByFeatures);


  router.route("/stocks/:id").get(StockController.getStockById);

module.exports = router;
