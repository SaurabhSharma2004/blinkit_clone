const {Router} = require('express')

const {signup, verifyEmail, login, uploadAvatar, logout, updateUserDetails, forgotPassword, verifyForgotPasswordOtp, resetPassword, refreshToken, getUserDetails} = require('../controllers/Auth')

const {auth} = require('../middlewares/auth')
const {upload} = require('../middlewares/multer')

const userRouter = Router()

//signup route
userRouter.post('/signup', signup)

//verify email route
userRouter.post('/verify-email', verifyEmail)

//login route
userRouter.post('/login', login)

//logout route
userRouter.post('/logout', auth, logout)

//upload Avatar router
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)

//update user details route
userRouter.put('/update-user', auth, updateUserDetails)

//forgot password route
userRouter.put('/forgot-password', forgotPassword)

// forgot password otp verification route
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp)

// Reset password route
userRouter.put('/reset-password', resetPassword)

// refresh token route
userRouter.post('/refresh-token', refreshToken)

// get user details route
userRouter.get('/get-user', auth, getUserDetails)

module.exports = userRouter