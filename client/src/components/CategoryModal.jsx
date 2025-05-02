import React, { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {createCategoryApi} from "../services/operations/categoryApi";

const CategoryModal = ({onClose}) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const dispatch = useDispatch()
  const {accessToken} = useSelector((state) => state.auth)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageFile(file);
    setPreviewUrl(url);
  };

  const removeImage = () => {
    URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !imageFile) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);

    // Call the API to create the category here
    dispatch(createCategoryApi(formData, accessToken))
    onClose(false);

  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden">
        {/* header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add Category</h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* form */}
        <form className="px-6 py-5 space-y-5" onSubmit={handleSubmit}>
          {/* name */}
          <div>
            <label
              htmlFor="cat-name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              id="cat-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-400 focus:border-green-400"
            />
          </div>

          {/* image box */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <div className="relative">
              <label
                htmlFor="cat-image"
                className="w-full h-40 border-2 border-gray-300 rounded-lg flex items-center justify-center transition-colors focus-within:border-green-400"
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
                  id="cat-image"
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
                  className="absolute top-2 right-2 bg-white rounded-full p-2 text-green-500 hover:text-green-700 shadow"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50"
            disabled={!name.trim() || !imageFile}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default CategoryModal;
