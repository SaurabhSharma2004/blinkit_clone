import React, { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import {useDispatch, useSelector} from 'react-redux'
import { FiUploadCloud } from "react-icons/fi";
import {createSubCategoryApi} from "../services/operations/subCategoryApi.js"; // Import an upload icon

export default function SubCategoryModal({ onClose}) {
    const { categories } = useSelector((state) => state.category)
    const { accessToken } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [selectedCats, setSelectedCats] = useState([])

    useEffect(() => {
        // Clean up the object URL
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview)
        }
    }, [imagePreview])

    const handleNameChange = (e) => setName(e.target.value)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const url = URL.createObjectURL(file)
            setImagePreview(url)
        }
    }


    const handleRemoveImage = () => {
        setImageFile(null)
        setImagePreview('')
    }

    const handleCategorySelect = (e) => {
        const catId = e.target.value
        if (!catId) return
        if (selectedCats.some((c) => c._id === catId)) return
        const cat = categories.find((c) => c._id === catId)
        if (cat) setSelectedCats((prev) => [...prev, cat])
    }

    const handleRemoveCat = (id) => {
        setSelectedCats((prev) => prev.filter((c) => c._id !== id))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !imageFile || selectedCats.length === 0) {
            alert("Please fill all fields, upload an image, and select at least one category.");
            return;
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("image", imageFile)
        selectedCats.forEach(cat => formData.append("category", cat._id))

        dispatch(createSubCategoryApi(formData, accessToken))
        onClose()

    }

    return (
        // Modal backdrop
        <section className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 transition-opacity duration-300">
            {/* Modal container */}
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"> {/* Increased max-w slightly */}
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-900">Add New Subcategory</h2> {/* Updated text style */}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 -mr-2" /* Improved button styling */
                        aria-label="Close modal"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Form area with scrolling */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5 overflow-y-auto flex-grow"> {/* Adjusted spacing and padding */}
                    {/* Subcategory Name */}
                    <div> {/* Wrapped in div for spacing consistency */}
                        <label htmlFor="subcat-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Subcategory Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="subcat-name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="e.g., Smartphones, Laptops"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 focus:border-green-500 transition"
                            required
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Subcategory Image <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1"> {/* Added relative container */}
                            {/* Clickable Label Area */}
                            <label
                                htmlFor="subcat-image" // Links label to the hidden input
                                className={`w-full aspect-video border-2 ${imagePreview ? 'border-gray-300' : 'border-dashed border-gray-300'} rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:border-green-400 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 bg-gray-50 overflow-hidden p-4`}
                            >
                                {imagePreview ? (
                                    // Image Preview
                                    <img
                                        src={imagePreview}
                                        alt="Subcategory preview"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    // Upload Placeholder
                                    <>
                                        <FiUploadCloud size={36} className="mb-2 text-gray-400"/>
                                        <span className="text-sm font-medium text-gray-600">Click to upload image</span>
                                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP recommended</span>
                                    </>
                                )}
                            </label>

                            {/* Hidden File Input */}
                            <input
                                id="subcat-image"
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={handleImageChange}
                                className="hidden" // Input is visually hidden, triggered by label
                            />

                            {/* Remove Image Button (visible when preview exists) */}
                            {imagePreview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5 text-gray-700 hover:text-red-600 hover:bg-opacity-100 shadow-md transition-all duration-200 ease-in-out" // Adjusted styling: background, padding, hover
                                    title="Remove image"
                                    aria-label="Remove image"
                                >
                                    <IoClose size={18} /> {/* Adjusted size slightly */}
                                </button>
                            )}
                        </div>
                    </div>


                    {/* Selected Categories Display */}
                    {selectedCats.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Associated Categories
                            </label>
                            <div className="flex flex-wrap gap-2 border border-gray-200 p-3 rounded-lg bg-gray-50 min-h-[40px]"> {/* Added min-h */}
                                {selectedCats.map((c) => (
                                    <span
                                        key={c._id}
                                        className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium shadow-sm" /* Adjusted size/style */
                                    >
                                        {c.name}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCat(c._id)}
                                            className="ml-1.5 -mr-1 p-0.5 text-green-600 hover:text-green-800 hover:bg-green-200 rounded-full transition-colors"
                                            aria-label={`Remove ${c.name} category`}
                                        >
                                            <IoClose size={14} /> {/* Adjusted size */}
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Category Dropdown */}
                    <div>
                        <label htmlFor="cat-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Add Category Association <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="cat-select"
                            onChange={handleCategorySelect}
                            value="" // Keep resetting selection
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 focus:border-green-500 bg-white transition" /* Consistent styling */
                            aria-label="Select a category to add"
                        >
                            <option value="" disabled>-- Select a Category --</option>
                            {categories
                                .filter(cat => !selectedCats.some(sel => sel._id === cat._id))
                                .map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                        {categories.filter(cat => !selectedCats.some(sel => sel._id === cat._id)).length === 0 && selectedCats.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">All available categories added.</p>
                        )}
                    </div>
                </form>

                {/* Footer/Actions */}
                <div className="flex justify-end items-center space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0 rounded-b-xl"> {/* Added bg color */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 font-medium transition-colors text-sm" /* Improved styling */
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit} // Can trigger submit directly
                        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm" /* Improved styling */
                        disabled={!name || !imageFile || selectedCats.length === 0}
                    >
                        Save Subcategory
                    </button>
                </div>
            </div>
        </section>
    )
}