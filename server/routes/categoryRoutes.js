const { Router } = require('express')

const { auth } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

const { createCategory, getAllCategories, updateCategory, updateCategoryById, getCategoryDetailsById,
    deleteCategoryById
} = require('../controllers/Category')


const categoryRouter = Router()

// Create Category route
categoryRouter.post('/create-category', auth, upload.single('image'), createCategory)

// Get All Category route
categoryRouter.get('/get-all-categories', auth, getAllCategories)

// update Category
categoryRouter.post('/update-category/:id', auth, upload.single('image'), updateCategoryById)

// get category detail by id
categoryRouter.get('/get-category-by-id/:categoryId', auth, getCategoryDetailsById)

// delete category by id
categoryRouter.post('/delete-category/:id', auth, deleteCategoryById)

module.exports = categoryRouter