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

  // const query = useQuery({ queryKey: ['category'], queryFn: getCategory })
  const getCategory = async () => {
    const response = await fetch(`${BASE_URL}/category/allcategory`);
    const data = await response.json();
    console.log(data);

    setCategories(data.category);

    // console.log("data json");

    // console.log(data.catego.map((category) => category.category.name));
    // return data.map((category) => category.name);
    return data;
  };

  const [categories, setCategories] = useState([]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
    onSuccess: (data) => {
      console.log(data);
    },
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
      1;
      setCategories([...categories, { name: newCategory }]);
      setNewCategory("");
    }
    console.log(newCategory);
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
    console.log(categoryId);
    handleUpdateCategory(categoryId, { name: editCategory });
  };

  const deleteMutation = useMutation({
    mutationKey: queryMutationKeys.deleteCategory,
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      toast.success("Category deleted successfully");
      console.log("object deleted successfully");
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
      console.log("Category updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });

  const handleUpdateCategory = (categoryId, updatedCategoryData) => {
    updateMutation.mutate({ categoryId, updatedCategoryData });
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        // className="w-64 bg-gray-800 text-white"
      />
      <div className="flex flex-col flex-grow">
        <Header OpenSidebar={OpenSidebar} />
        <div className="flex-grow p-6  bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Categories</h2>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add a new category"
                className="flex-grow p-2 border border-gray-300 rounded-lg"
              />
              <button
                disabled={isPending}
                type="submit"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {isPending ? "Please wait..." : "Add Category"}
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
                >
                  {isEditing === index ? (
                    <div className="flex-grow flex gap-2">
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(category._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-grow">{category.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            "cId",
                            JSON.stringify(category._id)
                          );
                          navigate(`/categories/${category.name}`);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditCategory(index)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(category._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
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
