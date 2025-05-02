const Category = require('../models/Category');
const SubCategory = require('../models/subCategory')
const dotenv = require('dotenv')
const uploadImageToCloudinary = require("../utlis/imageUploader");
dotenv.config()


const createSubCategory = async (req, res) => {
    try {
        const {name, category} = req.body
        const image = req.file

        if (!name || !image || !category.length) {
            res.status(400).json({message: 'Please provide all the required fields', success: false})
        }

        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME)

        if (!uploadedImage) {
            return res.status(500).json({ message: 'Failed to upload image', success: false });
        }

        const newSubCategory = await SubCategory.create({
            name: name,
            image: uploadedImage.secure_url,
            categoryId: category
        })

        return res.status(200).json({ message: 'Subcategory created successfully', data: newSubCategory, success: true });

    } catch (error) {
        return res.status(500).json({ message: 'Error in creating subcategory', success: false });
    }
}

const getAllSubCategories = async (req, res) => {
    try {
        const allSubCategories = await SubCategory.find().sort({createdAt: -1}).populate('categoryId', 'name')

        if (!allSubCategories){
            return res.status(201).json({
                message:"No subCategory found",
                success: true
            })
        }

        return res.status(200).json({
            message: "Subcategories fetched successfully",
            success: true,
            data: allSubCategories
        })

    } catch (error) {
        return res.status(500).json({
            message:"Error while fetching all subCategories",
            success:false
        })
    }
}

const deleteSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'Subcategory id is required', success: false });
        }

        const deletedSubCategory = await SubCategory.findByIdAndDelete(id, {new: true})
        if (!deletedSubCategory) {
            return res.status(404).json({ message: 'Subcategory not found while deleting', success: false });
        }
        return res.status(200).json({
            message: 'Subcategory deleted successfully',
            success: true,
            data: deletedSubCategory,
        })

    } catch (error) {
        return res.status(500).json({ message: 'Error in delete subcategory', success: false });
    }
}

const getSubCategoryDetailsById = async (req, res) => {
    try {
        const { id } = req.params
        const subCategoryDetail = await SubCategory.findById(id).populate('categoryId', 'name')
        if (!subCategoryDetail) {
            return res.status(404).json({ message: 'Subcategory not found', success: false });
        }
        return res.status(200).json({
            message: 'Subcategory detail fetched successfully',
            data: subCategoryDetail,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error in getting subcategory by Id', success: false });
    }
}

const updateSubCategoryById = async (req, res) => {
    try {
        const { name, category } = req.body;
        const { id } = req.params;
        const image = req.file

        if (!id || !name?.trim() || !category?.length) {
            return res
                .status(400)
                .json({ success: false, message: 'Subcategory id, name and category are required' });
        }

        const updates = { name: name.trim(), categoryId: category }
        if (image) {
            const uploaded = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
            if (!uploaded?.secure_url) {
                return res
                    .status(500)
                    .json({ success: false, message: 'Image upload failed while updating subcategory' });
            }
            updates.image = uploaded.secure_url;
        }
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );
        if (!updatedSubCategory) {
            return res
                .status(404)
                .json({ success: false, message: 'Subcategory not found' });
        }
        return res.status(200).json({
            success: true,
            message: 'Subcategory updated successfully',
            data: updatedSubCategory
        })

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Server error while updating subcategory' });
    }
}

module.exports = {
    createSubCategory,
    getAllSubCategories,
    deleteSubCategoryById,
    getSubCategoryDetailsById,
    updateSubCategoryById
}
