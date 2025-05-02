import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaTrash } from "react-icons/fa";
import {
  getCategoryDetailById,
  updateCategoryApi,
} from "../services/operations/categoryApi.js";

const EditCategoryModal = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Fetch existing category
  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getCategoryDetailById(id, accessToken);
      if (data) {
        setName(data.name || "");
        setPreviewUrl(data.image || "");
        // leave imageFile null so we only upload if changed
      }
    })();
  }, [id, accessToken]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    dispatch(updateCategoryApi(id, formData, accessToken));
    onClose();
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Edit Category</h2>
          <button
            onClick={() => onClose()}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="px-6 py-5 space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-green-400 focus:border-green-400"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <div className="relative">
              <label
                htmlFor="cat-image"
                className="w-full h-40 border-2 border-gray-300 rounded-lg
                           flex items-center justify-center cursor-pointer transition-colors
                           hover:border-green-400 focus-within:border-green-400"
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
                  className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700 shadow"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold
                       rounded-md transition-colors disabled:opacity-50"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategoryModal;
