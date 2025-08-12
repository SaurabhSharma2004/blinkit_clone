import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaTrash, FaUpload } from "react-icons/fa";
// import { getAllSubCategories } from "../services/operations/subCategoryApi.js";
import {createProductApi} from "../services/operations/productApi.js";

const UploadProducts = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((s) => s.auth);
  const { categories } = useSelector((s) => s.category);
  const { subCategories } = useSelector((s) => s.subCategory);
  const [isUploading, setIsUploading] = useState(false);

  console.log("Printing SubCategories: ", subCategories)
    console.log("Printing Categories: ", categories)

  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    unit: "",
    stock: "",
    description: "",
    categoryIds: [],
    subCategoryIds: [],
  });
  const [details, setDetails] = useState([{ key: "", value: "" }]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleCheck = (e) => {
    const { name, value } = e.target;
    setForm((f) => {
      const arr = f[name];
      return {
        ...f,
        [name]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (i) => {
    setImages((imgs) => imgs.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const addDetail = () => setDetails((d) => [...d, { key: "", value: "" }]);
  const updateDetail = (i, field, val) =>
    setDetails((d) =>
      d.map((item, idx) => (idx === i ? { ...item, [field]: val } : item))
    );
  const removeDetail = (i) =>
    setDetails((d) => d.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.price ||
      !form.unit ||
      !form.stock ||
      form.categoryIds.length === 0 ||
      form.subCategoryIds.length === 0 ||
      images.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }


    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("discount", form.discount);
    formData.append("unit", form.unit);
    formData.append("stock", form.stock);
    formData.append("description", form.description);
    formData.append("categoryIds", JSON.stringify(form.categoryIds));
    formData.append("subCategoryIds", JSON.stringify(form.subCategoryIds));
    formData.append("details", JSON.stringify(details));
    images.forEach((img) => formData.append("images", img));

    console.log("Printing Product Data: ", formData)

     dispatch(createProductApi(formData, accessToken));

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Product uploaded successfully!");
      setForm({
        name: "",
        price: "",
        discount: "",
        unit: "",
        stock: "",
        description: "",
        categoryIds: [],
        subCategoryIds: [],
      });
      setDetails([{ key: "", value: "" }]);
      setImages([]);
      setPreviews([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen  py-8 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Add New Product</h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to add a new product to your inventory
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8"
        >
          {/* Basic Information */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4 border-b pb-2">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Discount (%)
                  </label>
                  <input
                    id="discount"
                    name="discount"
                    value={form.discount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Unit <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="unit"
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    placeholder="e.g. kg, piece, dozen"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4 border-b pb-2">
              Categories
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Categories <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-50 border rounded-lg p-3 max-h-40 overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <label
                        key={cat._id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          name="categoryIds"
                          value={cat._id}
                          checked={form.categoryIds.includes(cat._id)}
                          onChange={handleCheck}
                          className="accent-green-500"
                        />
                        {cat.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Subcategories <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-50 border rounded-lg p-3 max-h-40 overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {subCategories.map((sub) => (
                      <label
                        key={sub._id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          name="subCategoryIds"
                          value={sub._id}
                          checked={form.subCategoryIds.includes(sub._id)}
                          onChange={handleCheck}
                          className="accent-green-500"
                        />
                        {sub.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Details */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-semibold text-green-700">
                Additional Details
              </h2>
              <button
                type="button"
                onClick={addDetail}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition"
              >
                Add Detail
              </button>
            </div>
            <div className="space-y-2">
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    placeholder="Property (e.g. Color)"
                    value={detail.key}
                    onChange={(e) => updateDetail(idx, "key", e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  />
                  <input
                    placeholder="Value (e.g. Red)"
                    value={detail.value}
                    onChange={(e) => updateDetail(idx, "value", e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => removeDetail(idx)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Product Images */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4 border-b pb-2">
              Product Images <span className="text-red-500">*</span>
            </h2>
            <div className="space-y-4">
              <div
                onClick={() =>
                  document.getElementById("product-images").click()
                }
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                  previews.length
                    ? "border-green-300 bg-green-50"
                    : "hover:border-green-400 hover:bg-green-50"
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <FaUpload size={24} className="text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    {previews.length
                      ? "Click to add more images"
                      : "Click to upload product images"}
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or JPEG (Max 5MB each)
                  </p>
                </div>
                <input
                  id="product-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
              {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {previews.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden shadow"
                    >
                      <img
                        src={url}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(idx);
                        }}
                        className="absolute top-1 right-1 p-1 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
                        title="Remove"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white shadow transition-all ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                "Upload Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;