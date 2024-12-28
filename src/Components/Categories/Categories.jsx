import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  createCategoryPost,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "@/api/Category";
import { Button, Modal, NativeSelect, ScrollArea } from "@mantine/core";
import FormItem from "../form/FormItem";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const Categories = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isPending, setIsPending] = useState();
  const [name, setName] = useState("");
  const [isProductForKids, setIsProductForKids] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const queryClient = useQueryClient();

  const [categories, setCategories] = useState([]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { data: categoryList } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });
  // console.log("category", categoryList);

  //create
  const { mutate: handleSubmitCategoryPost } = useMutation({
    mutationKey: ["postcategory"],
    mutationFn: createCategoryPost,
    onSuccess: () => {
      toast.success("Category added successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
      toast.error(`Failed to add category: ${error.message}`);
    },
  });

  const handleAddCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("isProductForKids", isProductForKids);
    formData.append("gender", gender);
    console.log("FormData Contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    handleSubmitCategoryPost(formData);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setName("");
    setIsProductForKids("");
    setGender("");
    close();
  };

  //edit or update
  const { mutate: updateCategoryMutate } = useMutation({
    mutationFn: ({ id, formData }) => updateCategory(id, formData),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      close();
    },
    onError: (error) => {
      console.error(
        "Error updating category:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update category: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setIsProductForKids(category.isProductForKids);
    setGender(category.gender);
    open();
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("isProductForKids", isProductForKids);
    formData.append("gender", gender);
    updateCategoryMutate({ id: editingCategory._id, formData });
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
          deleteCategoryMutation(id);

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

  const { mutate: deleteCategoryMutation } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
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
      <div className="flex flex-col flex-grow p-4 pb-8 ">
        <div className="flex-grow  rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Manage Categories
          </h2>
          <div className="flex justify-center">
            <Button
              onClick={open}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Category
            </Button>
          </div>

          <Modal
            opened={opened}
            onClose={closeModal}
            title={editingCategory ? "Update Category" : "Add Category"}
            size="lg"
          >
            <form
              className="shadow-lg rounded-lg p-4  text-sm"
              onSubmit={
                editingCategory ? handleUpdateCategory : handleAddCategory
              }
            >
              <div className="space-y-6">
                <FormItem>
                  <label
                    className="block text-gray-800 font-medium mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter name "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormItem>

                <FormItem>
                  <label
                    className="block text-gray-800 font-medium mb-2"
                    htmlFor="isProductForKids"
                  >
                    IsProductForKids
                  </label>
                  <NativeSelect
                    value={isProductForKids ? "true" : "false"}
                    onChange={(e) =>
                      setIsProductForKids(e.target.value === "true")
                    }
                    data={[
                      { value: "false", label: "No" },
                      { value: "true", label: "Yes" },
                    ]}
                  />
                </FormItem>

                <FormItem>
                  <label
                    className="block text-gray-800 font-medium mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <NativeSelect
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    data={["", "Male", "Female", "Neutral"]}
                    placeholder="Select Gender"
                  />
                </FormItem>

                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 ease-in-out"
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </Button>
              </div>
            </form>
          </Modal>

          <ScrollArea
            className="p-3 pb-3"
            style={{
              height: "calc(100vh - 200px)",
            }}
            type="always"
          >
            <div className="space-y-4">
              {(categoryList?.categories || []).length > 0 ? (
                categoryList.categories
                  ?.slice()
                  .reverse()
                  .map((category, index) => (
                    <div
                      key={category._id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition"
                    >
                      {isEditing === index ? (
                        ""
                      ) : (
                        // <div className="flex gap-4 w-full">
                        //   <input
                        //     type="text"
                        //     value={editCategory}
                        //     onChange={(e) => setEditCategory(e.target.value)}
                        //     className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                        //   />
                        //   <button
                        //     type="button"
                        //     onClick={() => handleSaveEdit(category._id)}
                        //     className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        //   >
                        //     Save
                        //   </button>
                        //   <button
                        //     type="button"
                        //     onClick={() => setIsEditing(null)}
                        //     className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        //   >
                        //     Cancel
                        //   </button>
                        // </div>
                        <div className="flex items-center gap-4 w-full">
                          <span className="flex-grow text-gray-700 text-base font-medium">
                            {category.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              localStorage.setItem(
                                "cId",
                                JSON.stringify(category._id)
                              );
                              navigate(`/categories/${category.name}`);
                            }}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditClick(category)}
                            className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(category._id)}
                            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-center">
                  No categories available. Add a new category.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Categories;
