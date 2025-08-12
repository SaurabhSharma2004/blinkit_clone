const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const connectDB = require('./config/connectDB.js')
// const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')
const cloudinaryConnect = require('./config/cloudinaryConnect')

dotenv.config()

// import routes
const userRouter = require('./routes/userRoutes.js')
const categoryRouter = require('./routes/categoryRoutes.js')
const subCategoryRouter = require('./routes/subCategoryRoutes.js')
const productRouter = require('./routes/ProductRoutes.js')

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use(cookieParser())

const port = process.env.PORT || 5000

connectDB()
cloudinaryConnect()



// user routes
app.use('/api/user', userRouter)

// category routes
app.use('/api/category', categoryRouter)

// subcategory routes
app.use('/api/subcategory', subCategoryRouter)

// product routes
app.use('/api/product', productRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})