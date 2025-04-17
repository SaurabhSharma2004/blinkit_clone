const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const connectDB = require('./config/connectDB.js')


const userRouter = require('./routes/userRoutes.js')

dotenv.config()

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

const port = process.env.PORT || 5000

connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// user routes
app.use('/api/user', userRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})