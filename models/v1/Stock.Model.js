const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const StockSchema = new mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
      required: [true, "Product id is required"],
    },
    name: {
      type: String,
      required: [true, "Stock name is required"],
      trim: true,
      // unique: [true, "Stock name must be unique"],
      minlength: [3, "Stock name must be at least 3 characters long"],
      maxlength: [50, "Stock name must be less than 50 characters long"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Stock description is required"],
      minlength: [20, "Stock description must be at least 20 characters long"],
    },
    unit: {
      type: String,
      required: [true, "Stock unit is required"],
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message:
          "Stock unit can't be {VALUE} must be either kg, litre or pcs,bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: [true, "Images are required"],
        // validate: {
        //   validator: (value) => {
        //     /* test value is array or not */
        //     if (!Array.isArray(value)) {
        //       return false;
        //     }

        //     /* test url is valid or not */
        //     let isURLValid = true;
        //     value.forEach((url) => {
        //       if (!validator.isURL(url)) {
        //         isURLValid = false;
        //       }
        //     });
        //     return isURLValid;
        //   },
        //   message: "Images are required to be valid",
        // },
        validate: [validator.isURL, "Images are required to be valid"],
      },
    ],
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price must be at least 0"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Product quantity must be at least 0"],
      default: 0,
      validate: {
        /* if quantity is integer or not */
        validator: function (value) {
          const isInteger = Number.isInteger(value);
          if (!isInteger) {
            return false;
          } else {
            return true;
          }
        },
      },
      message: "Product quantity must be an integer",
    },
    status: {
      type: String,
      required: [true, "Product status is required"],
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message:
          "Product status can't be {VALUE} must be either in-stock, out-of-stock or unavailable",
      },
      default: "in-stock",
    },
    store: {
      name: {
        type: String,
        trim: true, //removes extra white space from username
        required: [true, "Store brand name is required"],
        lowercase: true, // to unsure unique name
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "khulna",
            "rajshahi",
            "barishal",
            "sylhet",
            "rangpur",
          ],
          message:
            "Store name {VALUE} is not valid. must be one of the following: dhaka, chattogram, khulna, rajshahi, barishal, sylhet, rangpur",
        },
      },
      id: {
        type: ObjectId,
        ref: "Store",
        required: [true, "Store id is required"],
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true, //removes extra white space from username
        required: [true, "Store brand name is required"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    category: {
      type: String,
      required: [true, "Stock category is required"],
    },
    brand: {
      name: {
        type: String,
        required: [true, "Stock brand name is required"],
      },
      id: {
        type: ObjectId,
        ref: "Brand",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    // this is the options object
    timestamps: true,
    // _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true }, versionKey: false
  }
);

const StockModel = mongoose.model("Stock", StockSchema);
module.exports = StockModel;
