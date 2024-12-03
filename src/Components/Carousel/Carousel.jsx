import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, ScrollArea } from "@mantine/core";
import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import {
  createCarouselPost,
  deleteCarousel,
  fetchCarousel,
  updateCarousel,
} from "@/api/carousel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudinaryConfig } from "@/lib/cloudinary";
import FormItem from "../form/FormItem";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Carousel = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isPending, setIsPending] = useState();
  const [subtitle, setSubtitle] = useState("");
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const [image, setImage] = useState(null);
  const [editingCarousel, setEditingCarousel] = useState(null);

  const queryClient = useQueryClient();

  const { data: carouselList } = useQuery({
    queryKey: ["carousel"],
    queryFn: fetchCarousel,
  });
  // console.log("carousel", carouselList?.list);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const { mutate: handleSubmitCarouselPost } = useMutation({
    mutationKey: ["postcarousel"],
    mutationFn: createCarouselPost,
    onSuccess: () => {
      toast.success("Carousel added successfully");
      queryClient.invalidateQueries({ queryKey: ["carousel"] });
    },
    onError: (error) => {
      toast.error(`Failed to add carousel: ${error.message}`);
    },
  });
  //add
  const handleAddCarousel = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("subtitle", subtitle);
    formData.append("title", title);
    formData.append("title2", title2);
    if (image) formData.append("img_id", image);
    console.log("FormData Contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    handleSubmitCarouselPost(formData);
  };

  const closeModal = () => {
    setEditingCarousel(null);
    setSubtitle("");
    setTitle("");
    setTitle2("");
    setImage(null);
    close();
  };

  //update
  const { mutate: updateCarouselMutate } = useMutation({
    mutationFn: ({ id, formData }) => updateCarousel(id, formData),
    onSuccess: () => {
      toast.success("Carousel updated successfully");
      queryClient.invalidateQueries({ queryKey: ["carousel"] });
      close();
    },
    onError: (error) => {
      console.error(
        "Error updating carousel:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update carousel: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const handleEditClick = (carousel) => {
    setEditingCarousel(carousel);
    setSubtitle(carousel.subtitle);
    setTitle(carousel.title);
    setTitle2(carousel.title2);
    setImage(null);
    open();
  };

  const handleUpdateCarousel = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("subtitle", subtitle);
    formData.append("title", title);
    formData.append("title2", title2);
    if (image) formData.append("img_id", image);

    updateCarouselMutate({ id: editingCarousel._id, formData });
  };

  //delete
  const handleDeleteCarousel = (id) => {
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
          deleteCarouselMutation(id);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The carousel has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your carousel is safe ",
            icon: "error",
          });
        }
      });
  };

  const { mutate: deleteCarouselMutation } = useMutation({
    mutationFn: deleteCarousel,
    onSuccess: () => {
      toast.success("Carousel deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["carousel"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });

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
            Add Carousel
          </Button>
        </div>
        <Modal
          opened={opened}
          onClose={closeModal}
          title={editingCarousel ? "Update Carousel" : "Add Carousel"}
          size="lg"
        >
          <form
            className="shadow-lg rounded-lg p-4  text-sm"
            // onSubmit={handleAddCarousel}
            onSubmit={
              editingCarousel ? handleUpdateCarousel : handleAddCarousel
            }
          >
            <div className="space-y-6">
              <FormItem>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="carouselImage"
                >
                  Carousel Image
                </label>
                <Input
                  id="carouselImage"
                  name="carouselImage"
                  type="file"
                  onChange={handleFileChange}
                  className="border-gray-300 focus:ring-2 focus:ring-black w-full p-3 rounded-md"
                />
              </FormItem>

              <FormItem>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="carouselName"
                >
                  Subtitle
                </label>
                <Input
                  id="carouselName"
                  type="text"
                  name="carouselName"
                  placeholder="Enter product subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </FormItem>

              <FormItem>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="title"
                >
                  State
                </label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter state"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormItem>

              <FormItem>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="title2Name"
                >
                  Ethnic Wear and Crafts Name
                </label>
                <Input
                  id="title2Name"
                  type="text"
                  name="title2Name"
                  placeholder="Enter Ethnic Wear and Crafts Name"
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                />
              </FormItem>

              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 ease-in-out"
              >
                {editingCarousel ? "Update Carousel" : "Add Carousel"}
              </Button>
            </div>
          </form>
        </Modal>

        <ScrollArea className="p-4" style={{ height: "500px" }} type="always">
          <div className="overflow-x-auto">
            {carouselList?.list?.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 pl-6 text-left">
                      Image
                    </th>
                    <th className="border border-gray-200 p-2 pl-16  text-left">
                      Subtitle
                    </th>
                    <th className="border border-gray-200 p-2 pl-8  text-left">
                      State
                    </th>
                    <th className="border border-gray-200 p-2 pl-14  text-left">
                      Ethnic Wear & Crafts
                    </th>
                    <th className="border border-gray-200 p-2 pl-20 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carouselList?.list
                    ?.slice()
                    .reverse()
                    .map((product, id) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-2">
                          <img
                            src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${product.img_id}`}
                            alt=""
                            className="w-16 h-16 border border-gray-300 rounded-md shadow-sm"
                          />
                        </td>
                        <td className="border border-gray-200 p-2">
                          {product.subtitle}
                        </td>
                        <td className="border border-gray-200 p-2">
                          {product.title}
                        </td>
                        <td className="border border-gray-200 p-2">
                          {product.title2}
                        </td>
                        <td className="p-4 text-center border-b border-gray-200">
                          <div className="flex justify-center gap-2">
                            <Button
                              color="blue"
                              size="xs"
                              onClick={() => handleEditClick(product)}
                            >
                              Update
                            </Button>
                            <Button
                              color="red"
                              size="xs"
                              onClick={() => handleDeleteCarousel(product._id)}
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
              <p className="text-gray-500 mt-4">
                No carousel products added yet.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Carousel;
