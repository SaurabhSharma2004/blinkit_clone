import React, {useState} from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import CategoryModal from "../components/CategoryModal";
import { useSelector } from "react-redux";
import NoDataImage from "../assets/nothing here yet.webp"
import EditCategoryModal from "../components/EditCategoryModal.jsx";
import DeleteCategoryModal from "../components/DeleteCategoryModal.jsx";

const CategoryPage = () => {

  const {categories} = useSelector((state) => state.category)
  const [uploadCategoryModal, setUploadCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(null);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(null)

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Categories
          </h2>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              placeholder="Search categories..."
              className="flex-grow sm:flex-grow-0 w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition" onClick={() => setUploadCategoryModal(true)}>
              Add Category
            </button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories && categories.length > 0 ? (
              categories.map((cat) => (
                  <div
                      key={cat.id || cat._id}
                      className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col items-center p-3 hover:shadow-xl transition group"
                  >
                    <div className="w-32 h-48  overflow-hidden  mb-4 flex-shrink-0 ">
                      <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                          onClick={() => setEditCategoryModal(cat._id)}
                          title="Edit Category"
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-2 shadow transition"
                      >
                        <BiEdit size={22} />
                      </button>
                      <button
                          onClick={() => setDeleteCategoryModal(cat._id)}
                          title="Delete Category"
                          className="bg-red-100 hover:bg-red-200 text-red-700 rounded-full p-2 shadow transition"
                      >
                        <BiTrash size={22} />
                      </button>
                    </div>
                  </div>
              ))
          ) : (
              <div className="flex items-center justify-center flex-col ">
                <img src={NoDataImage} alt="Empty categories" className="w-48 h-48" />
                <h3 className="text-xl font-semibold text-gray-800">No categories found</h3>
                <p className="text-gray-500">
                  Add a new category to get started
                </p>
              </div>
          )}
        </div>

        {/* MODAL */}
        {
            uploadCategoryModal && (<CategoryModal onClose={setUploadCategoryModal}   />)
        }


        {
          editCategoryModal && (<EditCategoryModal onClose={() => setEditCategoryModal(null)} id={editCategoryModal}  />)
        }

        {/*  DeleteCategory Modal*/}

        {
          deleteCategoryModal && (<DeleteCategoryModal id={deleteCategoryModal} onClose={() => setDeleteCategoryModal(null)}  />)
        }

      </div>
    </section>
  );
};

export default CategoryPage;
