const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const StoreSchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "Store status is required"],
      enum: {
        values: ["active", "inactive"],
        message:
          "Store status can't be {VALUE} must be either active or inactive",
      },
      default: "active",
    },
    manager: {
      name: String,
      phone: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    // this is the options object
    timestamps: true,
    // _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true }, versionKey: false
  }
);

const StoreModel = mongoose.model("Store", StoreSchema);
module.exports = StoreModel;

