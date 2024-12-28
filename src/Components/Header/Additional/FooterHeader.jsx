import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@mantine/core";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Header from "../Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import {
  createFooterHeader,
  deleteFooterHeader,
  fetchFooterHeader,
  updateFooterHeader,
} from "@/api/footerLink";
import { queryMutationKeys } from "@/constants/queryMutationKeys";
import { useNavigate } from "react-router-dom";

const FooterHeader = () => {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [footerHeaderName, setNewFooterHeader] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editFooterHeader, setEditFooterHeader] = useState("");
  const [footerHeader, setFooterHeader] = useState([]);
  const queryClient = useQueryClient();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  //get
  const { data: footerData } = useQuery({
    queryKey: ["footerheader"],
    queryFn: fetchFooterHeader,
  });
  // console.log("footer", footerData?.footerSubHeading);
  //create
  const { mutate, isPending } = useMutation({
    mutationKey: queryMutationKeys.createFooterHeader,
    mutationFn: createFooterHeader,
    onSuccess: () => {
      queryClient.invalidateQueries(["footerheader"]);
      toast.success("Footer header added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add footerheader: ${error.message}`);
    },
  });
  //add
  const handleAddFooterHeader = () => {
    const footerSubHeading = JSON.parse(localStorage.getItem("footerId"));
    if (footerHeaderName.trim()) {
      setFooterHeader([...footerHeader, { name: footerHeaderName }]);
      setNewFooterHeader("");
      mutate({
        name: footerHeaderName,
        footerSubHeading,
      });
    } else {
      toast.error("Footer header name cannot be empty");
    }
  };

  //update
  const { mutate: updateFooterHeaderMutate } = useMutation({
    mutationFn: ({ id, updatedData }) => updateFooterHeader(id, updatedData),
    onSuccess: () => {
      toast.success("Footer header updated successfully");
      queryClient.invalidateQueries({ queryKey: ["footerheader"] });
    },
    onError: (error) => {
      console.error(
        "Error updating footerheader:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update footerheader: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const handleUpdateFooterHeader = (id, updatedData) => {
    updateFooterHeaderMutate({ id, updatedData });
  };

  //edit
  const handleEditFooterHeader = (index) => {
    setIsEditing(index);
    setEditFooterHeader(footerHeader[index].footerHeaderName);
  };

  const handleSaveEdit = (categoryIndex) => {
    const updatedCategories = [...footerHeader];
    updatedCategories[categoryIndex] = {
      ...footerHeader[categoryIndex],
      footerHeaderName: editFooterHeader,
    };
    setFooterHeader(updatedCategories);
    setIsEditing(null);
    setEditFooterHeader("");

    const categoryToUpdate = footerHeader[categoryIndex];
    handleUpdateFooterHeader(categoryToUpdate._id, {
      footerHeaderName: editFooterHeader,
    });
  };

  //   //delete
  const handleDeleteFooterHeader = (id) => {
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
          deleteFooterHeaderMutation(id);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The footer header has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your footer header is safe ",
            icon: "error",
          });
        }
      });
  };
  const { mutate: deleteFooterHeaderMutation } = useMutation({
    mutationFn: deleteFooterHeader,
    onSuccess: () => {
      toast.success("Footer header deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["footerheader"] });
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
            Footer Header
          </h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={footerHeaderName}
              onChange={(e) => setNewFooterHeader(e.target.value)}
              placeholder="Enter footer header"
              className="flex-grow p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              disabled={isPending}
              type="submit"
              onClick={handleAddFooterHeader}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
            >
              {isPending ? "Please wait..." : "Add Footer Header"}
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
              {footerData?.footerSubHeading
                ?.slice()
                .reverse()
                ?.map((footersub, id) => (
                  <div
                    key={footersub._id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition"
                  >
                    {isEditing === id ? (
                      <div className="flex gap-2 w-full">
                        <input
                          type="text"
                          value={editFooterHeader}
                          onChange={(e) => setEditFooterHeader(e.target.value)}
                          className="flex-grow p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(id)}
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
                          {footersub.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.setItem(
                              "footerId",
                              JSON.stringify(footersub._id)
                            );
                            navigate(`/footerheader/${footersub.name}`);
                          }}
                          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditFooterHeader(id)}
                          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFooterHeader(id)}
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

export default FooterHeader;
