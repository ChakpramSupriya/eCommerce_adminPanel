import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryMutationKeys } from "@/constants/queryMutationKeys";
import { BASE_URL } from "@/constants/apiDetails";
import { createCategory } from "@/api/createCategory";
import { deleteCategory } from "@/api/deleteCategory";
import { updateCategory } from "@/api/updateCategory";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const queryClient = new QueryClient();

  const getCategory = async () => {
    const response = await fetch(`${BASE_URL}/category/allcategory`);
    const data = await response.json();
    setCategories(data.category);
    return data;
  };

  const [categories, setCategories] = useState([]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: queryMutationKeys.createCategory,
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      toast.success("Category added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add category: ${error.message}`);
    },
  });

  const [newCategory, setNewCategory] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editCategory, setEditCategory] = useState("");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { name: newCategory }]);
      setNewCategory("");
    }
    mutate({
      name: newCategory,
    });
  };

  const handleEditCategory = (index) => {
    setIsEditing(index);
    setEditCategory(categories[index].name);
  };

  const handleSaveEdit = (categoryId) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryId] = editCategory;
    setCategories(updatedCategories);
    setIsEditing(null);
    setEditCategory("");
    handleUpdateCategory(categoryId, { name: editCategory });
  };

  const deleteMutation = useMutation({
    mutationKey: queryMutationKeys.deleteCategory,
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete category: ${error.message}`);
    },
  });

  const handleDeleteCategory = (categoryId) => {
    deleteMutation.mutate(categoryId);
    const updatedCategories = categories.filter(
      (item) => item._id !== categoryId
    );
    setCategories(updatedCategories);
  };

  const updateMutation = useMutation({
    mutationKey: queryMutationKeys.updateCategory,
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });

  const handleUpdateCategory = (categoryId, updatedCategoryData) => {
    updateMutation.mutate({ categoryId, updatedCategoryData });
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="flex flex-col flex-grow ">
        <div className="flex-grow p-6">
          <div className=" p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Categories
            </h2>

            <div className="flex gap-4 mb-6">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                disabled={isPending}
                onClick={handleAddCategory}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
              >
                {isPending ? "Adding..." : "Add Category"}
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
                >
                  {isEditing === index ? (
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button
                        onClick={() => handleSaveEdit(category._id)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 w-full">
                      <span className="flex-grow text-gray-700 text-sm">
                        {category.name}
                      </span>
                      <button
                        onClick={() => {
                          localStorage.setItem(
                            "cId",
                            JSON.stringify(category._id)
                          );
                          navigate(`/categories/${category.name}`);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditCategory(index)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
