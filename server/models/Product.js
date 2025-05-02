const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type:Array,
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    categoryId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        }
    ],
    subCategoryId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: true,
        }
    ],
    publish: {
        type: Boolean,
        default: true,
    },
    more_details: {
        type: Object,
        default: {},
    },
},{timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;