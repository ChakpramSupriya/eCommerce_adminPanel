import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryMutationKeys } from "@/constants/queryMutationKeys";
import { ScrollArea } from "@mantine/core";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Header from "../Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import {
  createFooterLink,
  deleteFooterLink,
  updateFooterLink,
} from "@/api/footerLink";
import { BASE_URL } from "@/constants/apiDetails";

const FooterLink = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [footerLinkName, setNewFooterLink] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editFooterLink, setEditFooterLink] = useState("");
  const [footerLink, setFooterLink] = useState([]);
  const queryClient = useQueryClient();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const getFooterLink = async () => {
    const footerSubHeadingId = JSON.parse(localStorage.getItem("footerId"));
    const response = await fetch(
      `${BASE_URL}/footerlink/${footerSubHeadingId}/getfooterlink`
    );
    const data = await response.json();
    setFooterLink(data.footerLink);
    return data;
  };
  //get
  const { data } = useQuery({
    queryKey: ["footerlink"],
    queryFn: getFooterLink,
  });

  //create
  const { mutate, isPending } = useMutation({
    mutationKey: queryMutationKeys.createFooterLink,
    mutationFn: createFooterLink,
    onSuccess: () => {
      queryClient.invalidateQueries(["footerlink"]);
      toast.success("FooterLink added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add FooterLink: ${error.message}`);
    },
  });
  //add
  const handleAddFooterLink = () => {
    const footerSubHeading = JSON.parse(localStorage.getItem("footerId"));

    if (footerLinkName.trim()) {
      setFooterLink([...footerLink, { name: footerLinkName }]);
      setNewFooterLink("");

      mutate({
        name: footerLinkName,
        footerSubHeading,
      });
    }
  };
  //update
  const { mutate: updateFooterLinkMutate } = useMutation({
    mutationFn: ({ id, updatedData }) => updateFooterLink(id, updatedData),
    onSuccess: () => {
      toast.success("Footer link updated successfully");
      queryClient.invalidateQueries({ queryKey: ["footerlink"] });
    },
    onError: (error) => {
      console.error(
        "Error updating footerlink:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update footerlink: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const handleUpdateFooterLink = (id, updatedData) => {
    updateFooterLinkMutate({ id, updatedData });
  };

  //edit
  const handleEditFooterLink = (index) => {
    setIsEditing(index);
    setEditFooterLink(footerLink[index].footerLinkName);
  };

  const handleSaveEdit = (footerlinkIndex) => {
    const updatedFooterLink = [...footerLink];
    updatedFooterLink[footerlinkIndex] = {
      ...footerLink[footerlinkIndex],
      footerLinkName: editFooterLink,
    };
    setFooterLink(updatedFooterLink);
    setIsEditing(null);
    setEditFooterLink("");

    const footerLinkToUpdate = footerLink[footerlinkIndex];
    handleUpdateFooterLink(footerLinkToUpdate._id, {
      footerLinkName: editFooterLink,
    });
  };

  //   //delete
  const handleDeleteFooterLink = (id) => {
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
          deleteFooterLinkMutation(id);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The footer link has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your footer link is safe ",
            icon: "error",
          });
        }
      });
  };

  const { mutate: deleteFooterLinkMutation } = useMutation({
    mutationFn: deleteFooterLink,
    onSuccess: () => {
      toast.success("Footer Link deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["footerlink"] });
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
        <div className="flex-grow  rounded-lg shadow-lg p-10 mb-6 bg-blue-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Footer Link
          </h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={footerLinkName}
              onChange={(e) => setNewFooterLink(e.target.value)}
              placeholder="Enter footer link"
              className="flex-grow p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              disabled={isPending}
              type="submit"
              onClick={handleAddFooterLink}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
            >
              {isPending ? "Please wait..." : "Add Footer Link"}
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
              {footerLink
                ?.slice()
                .reverse()
                ?.map((footerlink, id) => (
                  <div
                    key={footerlink._id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition"
                  >
                    {isEditing === id ? (
                      <div className="flex gap-2 w-full">
                        <input
                          type="text"
                          value={editFooterLink}
                          onChange={(e) => setEditFooterLink(e.target.value)}
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
                          {footerlink.name}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleEditFooterLink(id)}
                          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFooterLink(footerlink._id)}
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

export default FooterLink;
