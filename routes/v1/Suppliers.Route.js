const express = require("express");
const supplierController = require("./../../controllers/v1/Supplier.Controller");

const router = express.Router();

router.route("/supplier")
  .post(supplierController.createSupplier)
  .get(supplierController.getSuppliers);

router.route("/supplier/:id")
  .get(supplierController.getSupplierById)
  .patch(supplierController.updateSupplier);


module.exports = router;