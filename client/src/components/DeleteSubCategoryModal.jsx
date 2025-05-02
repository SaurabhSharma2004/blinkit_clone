import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteSubCategoryById} from "../services/operations/subCategoryApi.js";

const DeleteSubCategoryModal = ({id, onClose}) => {

    const {accessToken} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleDeleteSubCategory = () => {
        dispatch(deleteSubCategoryById(id, accessToken))
        onClose()
    }

    return (
        <section className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white rounded-xl shadow-lg w-[90vw] max-w-md p-6 sm:p-8 transition-transform duration-300 animate-modalAppear'>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Delete SubCategory
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                    Are you sure you want to delete this sub category? This action cannot be undone.
                </p>
                <div className="flex gap-4 flex-col sm:flex-row justify-center">
                    <button
                        className="flex-1 px-6 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                        onClick={handleDeleteSubCategory}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <button
                className="absolute inset-0 w-full h-full cursor-default"
                style={{ zIndex: -1 }}
                tabIndex={-1}
                aria-label="Close Modal Overlay"
                onClick={onClose}
            />
        </section>
    )
}

export default DeleteSubCategoryModal