const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());

// import routes
const productsRoute = require("./routes/v1/Products.Route");


// route middlewares
app.use("/api/v1", productsRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
