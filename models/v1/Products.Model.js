const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true, //removes extra white space from username
        unique: [true, "Product name must be unique"],
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [20, "Product name must be less than 20 characters long"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [20, "Product description must be at least 20 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price must be at least 0"]
    },
    unit: {
        type: String,
        required: [true, "Product unit is required"],
        // enum: ["kg", "litre", "pcs"] //only these values are allowed as unit
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Product unit can't be {VALUE} must be either kg, litre or pcs"
        }
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [0, "Product quantity must be at least 0"],
        default: 0,
        validate: {
            validator: function (value) {
                const isInteger = Number.isInteger(value);
                if (!isInteger) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        message: "Product quantity must be an integer"
    },
    status: {
        type: String,
        required: [true, "Product status is required"],
        enum: {
            values: ["in-stock", "out-of-stock", "unavailable"],
            message: "Product status can't be {VALUE} must be either in-stock, out-of-stock or unavailable"
        }
    },

    // category is itself has an schema will generate later
    categories: [{
        name: {
            type: String,
            required: [true, "Product category name is required"]
        },
        _id: mongoose.Schema.Types.ObjectId,
    }]


    // // Supplier info is reffered from another model
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },


    // // alternative to timestamps
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }

}, { // this is the options object
    timestamps: true,
    // _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true }, versionKey: false 
});


// module.exports.ProductModel = mongoose.model('Product', ProductSchema);
const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
