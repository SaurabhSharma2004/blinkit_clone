const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        default: null,
    }
}, {timestamps: true});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;