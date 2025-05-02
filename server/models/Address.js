const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
},{timestamps: true});

const Address = mongoose.model("Address", addressSchema);
module.exports =  Address;