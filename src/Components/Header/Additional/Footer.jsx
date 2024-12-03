import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, ScrollArea } from "@mantine/core";
import FormItem from "@/Components/form/FormItem";
import { Input } from "@/Components/ui/input";
import {
  createFooter,
  deleteFooter,
  fetchFooter,
  updateFooter,
} from "@/api/footer";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Footer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingFooter, setEditingFooter] = useState(null);

  const queryClient = useQueryClient();

  const { data: footerList } = useQuery({
    queryKey: ["footerdata"],
    queryFn: fetchFooter,
  });
  //   console.log("footer", footerList);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const { mutate: handleSubmitFooter } = useMutation({
    mutationKey: ["footerpost"],
    mutationFn: createFooter,
    onSuccess: () => {
      toast.success("Footer added successfully");
      queryClient.invalidateQueries({ queryKey: ["footerdata"] });
    },
    onError: (error) => {
      toast.error(`Failed to add footer: ${error.message}`);
    },
  });

  //add
  const handleAddFooter = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    console.log("FormData Contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    handleSubmitFooter(formData);
  };

  const closeModal = () => {
    setEditingFooter(null);
    setTitle("");
    setDescription("");
    close();
  };

  //delete
  const handleDeleteFooter = (id) => {
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
          deleteFooterMutation(id);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The footer has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your footer is safe ",
            icon: "error",
          });
        }
      });
  };

  const { mutate: deleteFooterMutation } = useMutation({
    mutationFn: deleteFooter,
    onSuccess: () => {
      toast.success("Footer deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["footerdata"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });
  //update
  const { mutate: updateFooterMutate } = useMutation({
    mutationFn: ({ id, formData }) => updateFooter(id, formData),
    onSuccess: () => {
      toast.success("Footer updated successfully");
      queryClient.invalidateQueries({ queryKey: ["footerdata"] });
      close();
    },
    onError: (error) => {
      console.error(
        "Error updating footer:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update footer: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const handleEditClick = (footer) => {
    setEditingFooter(footer);
    setTitle(footer.title);
    setDescription(footer.description);
    open();
  };

  const handleUpdateFooter = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    updateFooterMutate({ id: editingFooter._id, formData });
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={toggleSidebar} />
      <Sidebar
        className="fixed"
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={toggleSidebar}
      />
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <Button
            onClick={open}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add Footer
          </Button>
        </div>
        <Modal
          opened={opened}
          onClose={closeModal}
          title={editingFooter ? "Update Footer" : "Add Footer"}
          size="lg"
        >
          <form
            className="shadow-lg rounded-lg p-4  text-sm"
            onSubmit={editingFooter ? handleUpdateFooter : handleAddFooter}
          >
            <div className="space-y-6">
              <FormItem>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter footer title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormItem>

              <FormItem>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <Input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormItem>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 ease-in-out"
              >
                {editingFooter ? "Update Footer" : "Add Footer"}
              </Button>
            </div>
          </form>
        </Modal>

        <ScrollArea className="p-4" style={{ height: "500px" }} type="always">
          <div className="overflow-x-auto">
            {footerList?.footer?.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2  text-left">
                      Title
                    </th>
                    <th className="border border-gray-200 p-2  text-left">
                      Description
                    </th>
                    <th className="border border-gray-200 p-2 pl-20 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {footerList?.footer
                    ?.slice()
                    .reverse()
                    .map((footer, id) => (
                      <tr key={footer._id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-2">
                          {footer.title}
                        </td>
                        <td className="border border-gray-200 flex text-left p-2">
                          {footer.description}
                        </td>

                        <td className="p-4 text-center border-b border-gray-200">
                          <div className="flex justify-center gap-2">
                            <Button
                              color="blue"
                              size="xs"
                              onClick={() => handleEditClick(footer)}
                            >
                              Update
                            </Button>
                            <Button
                              color="red"
                              size="xs"
                              onClick={() => handleDeleteFooter(footer._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 mt-4">No footer added yet.</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Footer;
