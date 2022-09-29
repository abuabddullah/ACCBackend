const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //removes extra white space from username
      required: [true, "Product brand name is required"],
      maxlength: [100, "Product name must be less than 100 characters long"],
      unique: [true, "Product name must be unique"],
      minlength: [3, "Product name must be at least 3 characters long"],
      lowercase: true, // to unsure unique name 
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [
        20,
        "Product description must be at least 20 characters long",
      ],
    },
    email: {
      type: String,
      required: [true, "Product email is required"],
      validate: [validator.isEmail, "Please provide a valid email"],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
    },
    location: String,


    /* এই brand এর under যত products আছে তাদের id কে record হিসেবে রাখব আর ref এ source হিসেবে বলে দিব এরা Product.Model.js থেকে আসতেছে বা populate হবে */
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    /* suppler কিন্তু অতটা important কিছু না যে এর জন্য mendatory একতা model generate করা লাগবে তাই আমরা hardcoded করে তার details রেখে দিব আর পাশাপাশি id ও রাখব যদি future এ কখনো model বানানো লাগে তার জন্য */
    supplier: {
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
      name: String,
      email: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    // this is the options object
    timestamps: true,
    // _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true }, versionKey: false
  }
);

// module.exports.BrandModel = mongoose.model('Brand', BrandSchema);
const BrandModel = mongoose.model("Brand", BrandSchema);
module.exports = BrandModel;
