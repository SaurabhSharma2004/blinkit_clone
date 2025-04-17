const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://www.gravatar.com/avatar/"+ Math.floor(Math.random() * 1000) + "?d=identicon"
    },
    mobile:{
        type: Number,
        default: null,
    },
    refresh_token:{
        type: String,
        default: null,
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    verify_email:{
        type: Boolean,
        default: false,
    },
    last_login_date:{
        type: Date,
        default: null,
    },
    status:{
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active",
    },
    forgot_password_otp:{
        type: String,
        default: null,
    },
    forgot_password_expiry:{
        type: Date,
        default: null,
    },
    address_details:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        }
    ],
    shopping_cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cartProduct',
        }
    ],
    orderHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }
    ],
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;