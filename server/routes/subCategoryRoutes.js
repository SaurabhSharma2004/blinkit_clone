const { Router } = require('express')

const { auth } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

const {createSubCategory, getAllSubCategories, deleteSubCategoryById, getSubCategoryDetailsById, updateSubCategoryById} = require("../controllers/SubCategory");

const subCategoryRouter = Router()

// create Subcategory route
subCategoryRouter.post('/create-subcategory', auth, upload.single('image'), createSubCategory)

// get all subcategory routes
subCategoryRouter.get('/get-all-subcategories', auth, getAllSubCategories)

// delete subcategory routes
subCategoryRouter.post('/delete-subcategory/:id', auth, deleteSubCategoryById)

// get subcategory routes by id
subCategoryRouter.get('/get-subcategory/:id', auth, getSubCategoryDetailsById)

// update subcategory routes by id
subCategoryRouter.post('/update-subcategory/:id', auth, upload.single('image'), updateSubCategoryById)

module.exports = subCategoryRouter