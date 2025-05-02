const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        default: null,
    },
    categoryId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        }
    ],
}, {timestamps: true});
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
