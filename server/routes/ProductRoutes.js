const { Router } = require('express')

const { auth } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

const productRouter = Router()

const {createProduct, getAllProducts, getProductById, getProductByCategoryId, getProductByCategoryAndSubCategoryId} = require('../controllers/Product')

// Create Product route
productRouter.post('/create-product', auth, upload.any('images'), createProduct)

// Get All Product route
productRouter.post('/get-all-products', auth, getAllProducts)

// Get Product by Id route
productRouter.get('/get-product-by-id/:id', auth, getProductById)

// Get Product by CategoryId
productRouter.get('/get-product-by-category-id/:id', auth, getProductByCategoryId)

// Get product by category id and subcategory id
productRouter.post('/get-product-by-category-and-subcategory-id', auth, getProductByCategoryAndSubCategoryId)

module.exports = productRouter;