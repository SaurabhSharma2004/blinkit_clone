const Product = require('../models/Product');
const uploadImageToCloudinary = require('../utlis/imageUploader');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            unit,
            stock,
            discount,
            categoryIds,
            subCategoryIds,
            details,
        } = req.body;

        // Fix: Use req.files for multiple file upload
        const images = req.files;

        // Parse and validate categoryIds and subCategoryIds
        let parsedCategoryIds = [];
        let parsedSubCategoryIds = [];
        let parsedDetails = [];

        try {
            // Parse categoryIds if it's a string
            if (typeof categoryIds === 'string') {
                parsedCategoryIds = JSON.parse(categoryIds);
            } else if (Array.isArray(categoryIds)) {
                parsedCategoryIds = categoryIds;
            }

            // Parse subCategoryIds if it's a string
            if (typeof subCategoryIds === 'string') {
                parsedSubCategoryIds = JSON.parse(subCategoryIds);
            } else if (Array.isArray(subCategoryIds)) {
                parsedSubCategoryIds = subCategoryIds;
            }

            // Parse details if it's a string
            if (typeof details === 'string') {
                parsedDetails = JSON.parse(details);
            } else if (Array.isArray(details)) {
                parsedDetails = details;
            }
        } catch (parseError) {
            return res.status(400).json({
                message: "Invalid JSON format for categories, subcategories, or details",
                success: false
            });
        }

        // Validate required fields
        if (!name || !price || !description || !unit || !stock || !discount ||
            !parsedCategoryIds?.length || !parsedSubCategoryIds?.length || !images?.length) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        }

        // Validate and convert to ObjectIds
        try {
            parsedCategoryIds = parsedCategoryIds.map(id => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error(`Invalid category ID: ${id}`);
                }
                return new mongoose.Types.ObjectId(id);
            });

            parsedSubCategoryIds = parsedSubCategoryIds.map(id => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error(`Invalid subcategory ID: ${id}`);
                }
                return new mongoose.Types.ObjectId(id);
            });

            parsedDetails = parsedDetails.map(detail => {
                if (typeof detail !== 'object' || !detail.key || !detail.value) {
                    throw new Error("Each detail must be an object with 'key' and 'value'");
                }
                return {
                    key: detail.key,
                    value: detail.value
                };
            });
        } catch (idError) {
            return res.status(400).json({
                message: idError.message,
                success: false
            });
        }



        let uploadedImages = [];

        try {
            // Optimize: Upload all images concurrently with error handling
            const uploadPromises = images.map(async (image, index) => {
                try {
                    const result = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
                    return result.secure_url;
                } catch (uploadError) {
                    console.error(`Error uploading image ${index + 1} (${image.originalname}):`, uploadError);
                    throw new Error(`Failed to upload image: ${image.originalname}`);
                }
            });

            uploadedImages = await Promise.all(uploadPromises);
        } catch (uploadError) {
            return res.status(500).json({
                message: uploadError.message || "Failed to upload one or more images",
                success: false
            });
        }

        // Create product with uploaded images
        const product = await Product.create({
            name,
            price: parseFloat(price),
            description,
            unit,
            stock: parseInt(stock),
            discount: parseFloat(discount),
            categoryId: parsedCategoryIds,
            subCategoryId: parsedSubCategoryIds,
            more_details: parsedDetails,
            image: uploadedImages
        });

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: product
        });

    } catch (error) {
        console.error('Product creation error:', error);

        return res.status(500).json({
            message: "Error in creating product",
            success: false,
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        let {page, limit, search} = req.body;

        if (!page)page = 1
        if (!limit)limit = 12

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            Product.find(query).sort({createdAt: -1}).skip(skip).limit(limit).populate('categoryId', 'subCategoryId'),
            Product.countDocuments(query)
        ])


        return res.status(200).json({
            message: "All products fetched successfully",
            success: true,
            data: data,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / limit),
        });

    } catch (error) {
        console.error('Error in getAllProducts:', error);
        return res.status(500).json({
            message: "Error in getting all products",
            success: false,
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: product
        })
    } catch (error) {
        console.error('Error in getProductById:', error);
        return res.status(500).json({
            message: "Error in getting product by id",
            success: false,
        });
    }
}

const getProductByCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Category id is required to fetch products",
                success: false,
            })
        }
        const product = await Product.find({categoryId: id});
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            })
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: product
        })
    } catch (error) {
        console.error('Error in getProductByCategoryId:', error);
        return res.status(500).json({
            message: "Error in getting product by category id",
            success: false,
        });
    }
}

const getProductByCategoryAndSubCategoryId = async (req, res) => {
    try{
        const {categoryId, subCategoryId, page, limit} = req.body;
        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: "Category id and sub category id are required to fetch products",
                success: false,
            })
        }
        const skip = (page - 1) * limit;
        const [data, totalCount] = await Promise.all([
            Product.find({categoryId: categoryId, subCategoryId: subCategoryId}).sort({createdAt: -1}).skip(skip).limit(limit),
            Product.countDocuments({categoryId: categoryId, subCategoryId: subCategoryId})
        ])
        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: data,
            totalPages: Math.ceil(totalCount / limit),
        })
    } catch (error) {
        console.error('Error in getProductByCategoryAndSubCategoryId:', error);
        return res.status(500).json({
            message: "Error in getting product by category id and sub category id",
            success: false,
        });
    }
}

module.exports = { createProduct, getAllProducts, getProductById, getProductByCategoryId, getProductByCategoryAndSubCategoryId};