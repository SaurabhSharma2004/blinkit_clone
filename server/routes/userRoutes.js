const {Router} = require('express')

const {signup, verifyEmail} = require('../controllers/Auth')

const userRouter = Router()

//signup route
userRouter.post('/signup', signup)

//verify email route
userRouter.post('/verify-email', verifyEmail)

module.exports = userRouter