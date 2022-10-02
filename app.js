const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());

// import routes
const productsRoute = require("./routes/v1/Products.Route");
const brandsRoute = require("./routes/v1/Brands.Route");
const storesRoute = require("./routes/v1/Stores.Route");
const categoryRoute = require("./routes/v1/Category.Route");


// route middlewares
app.use("/api/v1", productsRoute);
app.use("/api/v1", brandsRoute);
app.use("/api/v1", storesRoute);
app.use("/api/v1", categoryRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
