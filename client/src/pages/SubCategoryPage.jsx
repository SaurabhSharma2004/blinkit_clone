import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllSubCategories } from "../services/operations/subCategoryApi.js";
import { createColumnHelper } from "@tanstack/react-table";
import DisplayTable from "../components/DisplayTable.jsx";
import SubCategoryModal from "../components/SubCategoryModal.jsx";
import EditSubCategoryModal from "../components/EditSubCategoryModal.jsx";
import DeleteSubCategoryModal from "../components/DeleteSubCategoryModal.jsx";
import { BiEdit, BiTrash } from "react-icons/bi";

const SubCategoryPage = () => {
  const { accessToken } = useSelector((s) => s.auth);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllSubCategories(accessToken);
      setData(res || []);
    })();
  }, [accessToken]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
          <div className="flex justify-center">
            <img
                src={info.getValue()}
                alt="subcat"
                className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
      ),
    }),
    columnHelper.accessor((row) => row.categoryId, {
      id: "categories",
      header: "Categories",
      cell: (info) => {
        const cats = info.getValue() || [];
        return (
            <div className="flex flex-wrap gap-1 justify-center lg:justify-start">
              {cats.map((c) => (
                  <span
                      key={c._id}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full truncate"
                      style={{ maxWidth: "6rem" }}
                  >
                {c.name}
              </span>
              ))}
            </div>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
                onClick={() => setEditModal(row.original._id)}
                aria-label="Edit Subcategory"
                className="flex items-center justify-center p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition"
            >
              <BiEdit size={20} />
            </button>
            <button
                onClick={() => setDeleteModal(row.original._id)}
                aria-label="Delete Subcategory"
                className="flex items-center justify-center p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition"
            >
              <BiTrash size={20} />
            </button>
          </div>
      ),
    }),
  ];

  return (
      <section className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">
              Subcategories
            </h2>
            <button
                onClick={() => setAddModal(true)}
                className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
            >
              Add Subcategory
            </button>
          </div>

          {/* Table */}
          <DisplayTable data={data} columns={columns} />

          {/* Modals */}
          {addModal && <SubCategoryModal onClose={() => setAddModal(false)} />}
          {editModal && (
              <EditSubCategoryModal
                  id={editModal}
                  onClose={() => setEditModal(null)}
              />
          )}
          {deleteModal && (
              <DeleteSubCategoryModal
                  id={deleteModal}
                  onClose={() => setDeleteModal(null)}
              />
          )}
        </div>
      </section>
  );
};

export default SubCategoryPage;