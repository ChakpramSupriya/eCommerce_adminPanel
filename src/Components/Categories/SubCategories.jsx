import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryMutationKeys } from "@/constants/queryMutationKeys";
import { BASE_URL } from "@/constants/apiDetails";
import {
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "@/api/subcategory";
import { ScrollArea } from "@mantine/core";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SubCategories = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [subCategoryName, setNewSubCategory] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editSubCategory, setEditSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const queryClient = useQueryClient();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const getSubCategory = async () => {
    const categoryId = JSON.parse(localStorage.getItem("cId"));
    const response = await fetch(
      `${BASE_URL}/subCategory/${categoryId}/getSubCategory`
    );
    const data = await response.json();
    setSubCategories(data.subCategory);
    return data;
  };

  //get
  const { data } = useQuery({
    queryKey: ["subcategory"],
    queryFn: getSubCategory,
  });
  //create
  const { mutate, isPending } = useMutation({
    mutationKey: queryMutationKeys.createSubCategory,
    mutationFn: createSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["subcategory"]);
      toast.success("SubCategory added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add subcategory: ${error.message}`);
    },
  });
  //add
  const handleAddSubCategory = () => {
    const category = JSON.parse(localStorage.getItem("cId"));

    if (subCategoryName.trim()) {
      setSubCategories([...subCategories, { subCategoryName }]);
      setNewSubCategory("");

      mutate({
        subCategoryName,
        category,
      });
    }
  };

  //update
  const { mutate: updateCategoryMutate } = useMutation({
    mutationFn: ({ id, updatedData }) => updateSubCategory(id, updatedData),
    onSuccess: () => {
      toast.success("Subcategory updated successfully");
      queryClient.invalidateQueries({ queryKey: ["subcategory"] });
    },
    onError: (error) => {
      console.error(
        "Error updating subcategory:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update subcategory: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const handleUpdateCategory = (id, updatedData) => {
    updateCategoryMutate({ id, updatedData });
  };

  //edit
  const handleEditCategory = (index) => {
    setIsEditing(index);
    setEditSubCategory(subCategories[index].subCategoryName);
  };

  const handleSaveEdit = (categoryIndex) => {
    const updatedCategories = [...subCategories];
    updatedCategories[categoryIndex] = {
      ...subCategories[categoryIndex],
      subCategoryName: editSubCategory,
    };
    setSubCategories(updatedCategories);
    setIsEditing(null);
    setEditSubCategory("");

    const categoryToUpdate = subCategories[categoryIndex];
    handleUpdateCategory(categoryToUpdate._id, {
      subCategoryName: editSubCategory,
    });
  };

  //delete
  const handleDeleteCategory = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md",
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md",
        actions: "flex space-x-4",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteSubCategoryMutation(id);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The category has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your category is safe ",
            icon: "error",
          });
        }
      });
  };

  const { mutate: deleteSubCategoryMutation } = useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: () => {
      toast.success("SubCategory deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["subcategory"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="flex flex-col flex-grow p-4 pb-8  ">
        <div className="flex-grow  rounded-lg shadow-lg p-10 mb-6 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Subcategories
          </h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setNewSubCategory(e.target.value)}
              placeholder="Enter new subcategory"
              className="flex-grow p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              disabled={isPending}
              type="submit"
              onClick={handleAddSubCategory}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
            >
              {isPending ? "Please wait..." : "Add Subcategory"}
            </button>
          </div>
          <ScrollArea
            className="p-3 pb-3"
            style={{
              height: "calc(100vh - 200px)",
            }}
            type="always"
          >
            <div className="space-y-4 ">
              {subCategories
                ?.slice()
                .reverse()
                ?.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition"
                  >
                    {isEditing === index ? (
                      <div className="flex gap-2 w-full">
                        <input
                          type="text"
                          value={editSubCategory}
                          onChange={(e) => setEditSubCategory(e.target.value)}
                          className="flex-grow p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(index)}
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(null)}
                          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 w-full ">
                        <span className="flex-grow text-gray-700 text-sm">
                          {category.subCategoryName}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleEditCategory(index)}
                          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(category._id)}
                          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </ScrollArea>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
