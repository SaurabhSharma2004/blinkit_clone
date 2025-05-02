import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    getSubCategoryDetailById, updateSubCategoryApi,
} from "../services/operations/subCategoryApi.js";
import { setLoading } from "../slices/categorySlice.js"; // or your subcategory slice

const EditSubCategoryModal = ({ id, onClose }) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((s) => s.auth);
    const { categories } = useSelector((s) => s.category);

    const [name, setName] = useState("");
    const [selectedCats, setSelectedCats] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // fetch detail
    useEffect(() => {
        if (!id) return;
        (async () => {
            dispatch(setLoading(true));
            const data = await getSubCategoryDetailById(id, accessToken);
            if (data) {
                setName(data.name || "");
                setSelectedCats(data.categoryId?.map((c) => c._id) || []);
                setPreviewUrl(data.image || "");
            }
            dispatch(setLoading(false));
        })();
    }, [id, accessToken]);

    const handleCatToggle = (catId) => {
        setSelectedCats((prev) =>
            prev.includes(catId)
                ? prev.filter((x) => x !== catId)
                : [...prev, catId]
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const removeImage = () => {
        URL.revokeObjectURL(previewUrl);
        setImageFile(null);
        setPreviewUrl("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || selectedCats.length === 0) return;

        const formData = new FormData();
        formData.append("name", name.trim());
        selectedCats.forEach((c) => formData.append("category", c));
        if (imageFile) formData.append("image", imageFile);

        dispatch(updateSubCategoryApi(id, formData, accessToken));
        onClose();
    };

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <header className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Subcategory
                    </h2>
                    <button
                        onClick={() => onClose()}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes size={20} />
                    </button>
                </header>

                {/* Form */}
                <form
                    className="px-6 py-5 space-y-5 overflow-y-auto max-h-[80vh]"
                    onSubmit={handleSubmit}
                >
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="subcat-name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Subcategory Name
                        </label>
                        <input
                            id="subcat-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:border-green-400"
                        />
                    </div>

                    {/* Categories */}
                    <div>
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          Parent Categories
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 border rounded">
                            {categories.map((cat) => (
                                <label
                                    key={cat._id}
                                    className="inline-flex items-center space-x-2 text-gray-700"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCats.includes(cat._id)}
                                        onChange={() => handleCatToggle(cat._id)}
                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                    />
                                    <span className="truncate">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subcategory Image
                        </label>
                        <div className="relative">
                            <label
                                htmlFor="subcat-image"
                                className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:border-green-400 focus-within:border-green-400"
                            >
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="preview"
                                        className="max-h-full max-w-full object-contain rounded-md"
                                    />
                                ) : (
                                    <span className="text-gray-500">Click to upload image</span>
                                )}
                                <input
                                    id="subcat-image"
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                            </label>
                            {previewUrl && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700 shadow"
                                >
                                    <FaTrash size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="px-6 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim() || selectedCats.length === 0}
                            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditSubCategoryModal;