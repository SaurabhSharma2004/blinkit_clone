const Category = require('../models/Category');
const SubCategory = require('../models/subCategory')
const Product = require('../models/Product')
const uploadImageToCloudinary = require('../utlis/imageUploader')
const dotenv = require('dotenv')
dotenv.config()

const createCategory = async (req, res) => {
    console.log("Creating category...")
    console.log(req.body);
    console.log(req.file);
    try {
        const { name } = req.body;
        const image = req.file;

        if (!name || !image) {
            return res.status(400).json({ message: 'Name and image are required' });
        }

        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME)
        if (!uploadedImage) {
            return res.status(500).json({ message: 'Failed to upload image', success: false });
        }

        const newCategory = await Category.create({
            name: name,
            image: uploadedImage.secure_url
        })

        return res.status(200).json({ message: 'Category created successfully', data: newCategory, success: true });

    } catch (error) {
        return res.status(500).json({ message: 'Error in creating category', success: false });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find()

        return res.status(200).json({
            message: 'Categories fetched successfully',
            data: allCategories,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error in fetching categories', success: false });
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!id || !name?.trim()) {
            return res
                .status(400)
                .json({ success: false, message: 'Category id and name are required' });
        }

        // build the update object
        const updates = { name: name.trim() };

        // only upload a new image if user provided one
        if (req.file) {
            const uploaded = await uploadImageToCloudinary(req.file, process.env.FOLDER_NAME);
            if (!uploaded?.secure_url) {
                return res
                    .status(500)
                    .json({ success: false, message: 'Image upload failed' });
            }
            updates.image = uploaded.secure_url;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updatedCategory) {
            return res
                .status(404)
                .json({ success: false, message: 'Category not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (error) {
        console.error('Error in updateCategoryById:', error);
        return res
            .status(500)
            .json({ success: false, message: 'Server error while updating category' });
    }
};

const getCategoryDetailsById = async (req, res) => {
    try {
        const { categoryId } = req.params
        const categoryDetail = await Category.findById(categoryId)
        if (!categoryDetail) {
            return res.status(404).json({ message: 'Category not found', success: false });
        }
        return res.status(200).json({
            message: 'Category detail fetched successfully',
            data: categoryDetail,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error in getting category by Id', success: false });
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'Category id is required', success: false });
        }

        const checkSubCategory = await SubCategory.find(
            {
                categoryId :{
                    "$in": [id]
                }
            }
        ).countDocuments()

        const checkProduct = await Product.find(
            {
                categoryId :{
                    "$in": [id]
                }
            }
        ).countDocuments()

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({ message: 'Category cannot be deleted as it is associated with subcategory or product', success: false });
        }

        const deletedCategory = await Category.findByIdAndDelete(id, {new: true})
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found while deleting', success: false });
        }
        return res.status(200).json({
            message: 'Category deleted successfully',
            success: true,
            data: deletedCategory,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error in delete category', success: false });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategoryById,
    getCategoryDetailsById,
    deleteCategoryById
}