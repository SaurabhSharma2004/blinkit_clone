const User = require('../models/User');
const sendEmail = require('../config/sendEmail');
const verifyEmailTemplate = require('../utlis/verifyEmailTemplate');
const bcryptjs = require('bcryptjs');
const generateAccessToken = require('../utlis/generateAccessToken')
const generateRefreshToken = require('../utlis/generateRefreshToken');
const uploadImageToCloudinary = require('../utlis/imageUploader')
const otpGenerator = require('otp-generator');
const dotenv = require('dotenv')
const forgotPasswordTemplate = require('../utlis/forgotPasswordTemplate')

dotenv.config();

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
        
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const updatedUser = await User.findByIdAndUpdate(user._id, {last_login_date: new Date()}, {new: true});

        const cookieOptions = {
            httpOnly: true,
            secure :true,
            sameSite: 'None',
        }

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    status: updatedUser.status,
                },
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        console.log("Error in login ",error);
        return res.status(500).json({success:false, message:error });
    }
}

const logout = async (req, res) => {
    try {

        const userId = req.userId

        const cookieOptions = {
            httpOnly: true,
            secure :true,
            sameSite: 'None',
        }
        res.cookie('refreshToken', cookieOptions);
        res.cookie('accessToken', cookieOptions);

        const removeRefreshToken = await User.findByIdAndUpdate(userId, {
            refresh_token: ''
        }, {new: true});

        return res.status(200).json({success:true, message: 'User logged out successfully' });
    } catch (error) {
        console.log("Error in logout ",error);
        return res.status(500).json({success:false, message:error });
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const userId = req.userId
        const image = req.file;
        if(!image) {
            return res.status(400).json({ message: 'Please upload an image', success: false });
        }
        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);

        console.log("printing uploaded image", uploadedImage);

        const updateUser = await User.findByIdAndUpdate(userId, {
            avatar: uploadedImage.secure_url
        }, {new: true});

        return res.status(200).json({success:true, message: 'Image uploaded successfully', data:{
            _id: updateUser._id,
            avatar: updateUser.avatar,
        }});
    } catch (error) {
        console.log("Error in uploadAvatar ",error);
        return res.status(500).json({success:false, message:error });
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId
        const {name, email, password, mobile} = req.body;
        let hashedPassword = null;
        if(password) {
            hashedPassword = await bcryptjs.hash(password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(userId, {
            ...(name && {name}),
            ...(email && {email}),
            ...(password && {password: hashedPassword}),
            ...(mobile && {mobile}),
        }, {new: true});
        return res.status(200).json({success:true, message: 'User details updated successfully', data:{
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            mobile: updateUser.mobile,
            avatar: updateUser.avatar,
        }});
    } catch (error) {
        return res.status(500).json({success:false, message:"Error while updating user details" });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email) {
            return res.status(400).json({ message: 'Please provide email', success: false });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            forgot_password_otp:otp,
            forgot_password_expiry: Date.now() + 15 * 60 * 1000,
        }, {new: true});
        
        const sendOtp = await sendEmail({
            to:email,
            subject: 'Reset Password OTP',
            html:forgotPasswordTemplate({
                name:updatedUser.name,
                otp:otp
            })
        })

        if(!sendOtp) {
            return res.status(400).json({ message: 'Error sending forgot password otp email', success: false });
        }

        return res.status(200).json({success:true, message: 'Forgot password otp sent successfully'});

    } catch (error) {
        console.log("Error in forgotPassword ",error);
        return res.status(500).json({success:false, message:error });
    }
}

const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const {email, otp} = req.body;
        if(!email || !otp) {
            return res.status(400).json({ message: 'Please provide email and otp', success: false });
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        if(user.forgot_password_otp !== otp) {
            return res.status(400).json({ message: 'Invalid otp', success: false });
        }
        if(user.forgot_password_expiry < Date.now()) {
            return res.status(400).json({ message: 'Otp expired', success: false });
        }
        return res.status(200).json({success:true, message: 'Otp verified successfully'})

    } catch (error) {
        // console.log("Error in verifyForgotPasswordOtp ",error);
        return res.status(500).json({ success: false, message: "Error in verifyForgotPasswordOtp " });
        
    }
}

const resetPassword = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password', success: false });
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            password:hashedPassword,
            forgot_password_otp:null,
            forgot_password_expiry:null
        }, {new: true});
        return res.status(200).json({success:true, message: 'Password reset successfully'})
    } catch (error) {
        console.log("Error in resetPassword ",error);
        return res.status(500).json({success:false, message:error });
    }
}


module.exports = {signup, verifyEmail, login, logout, uploadAvatar, updateUserDetails, forgotPassword, verifyForgotPasswordOtp, resetPassword};