const cloudinary = require("cloudinary").v2;

const uploadImageToCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

module.exports = uploadImageToCloudinary