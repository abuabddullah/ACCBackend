const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //removes extra white space from username
      required: [true, "Category brand name is required"],
      maxlength: [100, "Category name must be less than 100 characters long"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Category name must be at least 3 characters long"],
      lowercase: true, // to unsure unique name
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
    },
  },
  {
    // this is the options object
    timestamps: true,
    // _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true }, versionKey: false
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
