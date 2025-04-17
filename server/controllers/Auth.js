const User = require('../models/User');
const sendEmail = require('../config/sendEmail');
const verifyEmailTemplate = require('../utlis/verifyEmailTemplate');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,

        } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields', success: false });
        }
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const verifyEmail = await sendEmail({
            to: newUser.email,
            subject: 'Verify your email',
            html: verifyEmailTemplate({
                name:newUser.name,
                url: `${process.env.CLIENT_URL}/verify-email?code=${newUser._id}`
            })
        })

        if(!verifyEmail) {
            return res.status(400).json({ message: 'Error sending email', success: false });
        }

        return res.status(201).json({success:true, message: 'User created successfully', data: newUser });
    } catch (error) {
        console.log("Error in signup ",error);
        return res.status(500).json({success:false, message:error });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        console.log("printing code for verify email", code);
        const user = await User.findById(code);
        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        user.verify_email = true;
        await user.save();
        return res.status(200).json({success:true, message: 'User verified successfully' });
    } catch (error) {
        console.log("Error in verifyEmail ",error);
        return res.status(500).json({success:false, message:error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields', success: false });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        // if(!user.verify_email) {
        //     return res.status(400).json({ message: 'Please verify your email' });
        // }

        if(user.status != "active") {
            return res.status(400).json({ message: 'User is not active', success: false });

        }


        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials', success: false });
        }
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});


        

    } catch (error) {
        console.log("Error in login ",error);
        return res.status(500).json({success:false, message:error });
    }
}

module.exports = {signup, verifyEmail}