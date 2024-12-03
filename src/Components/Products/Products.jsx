import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Table, Button, Notification } from "@mantine/core";
import Swal from "sweetalert2";
import { deleteProduct, fetchProducts } from "@/api/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudinaryConfig } from "@/lib/cloudinary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: allProduct,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productlist"],
    queryFn: fetchProducts,
  });

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  // const updateDiscount = async (productId, discount) => {
  //   try {
  //     await axios.patch(`${BASE_URL}/product/${productId}/updateDiscount`, {
  //       discount,
  //     });
  //     refetch();
  //   } catch (err) {
  //     console.error("Error updating discount:", err);
  //   }
  // };

  //update
  const handleUpdateProduct = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  //delete
  const handleDeleteProduct = (id) => {
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
          deleteProductMutation(id);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The Product has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product is safe ",
            icon: "error",
          });
        }
      });
  };

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productlist"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });

  const rows = allProduct?.products?.map((element, index) => (
    <Table.Tr
      key={element._id}
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-gray-100`}
    >
      {/* <Table.Td className="p-4 text-center border-b border-gray-200">
        {element._id}
      </Table.Td> */}
      <Table.Td className="p-4 text-center border-b border-gray-200">
        <img
          src={`${
            CloudinaryConfig.CLOUDINARY_URL
          }/image/upload/${element?.image_id[0]?.replace(/"/g, "")}`}
          alt="Product"
          className="w-16 h-16 border border-gray-300 rounded-md shadow-sm"
        />
      </Table.Td>
      <Table.Td className="pt-8 w-36  text-center border-gray-200 flex items-center ">
        {element?.name}
      </Table.Td>
      <Table.Td className="p-4 text-center border-b border-gray-200">
        {element?.category?.name}
      </Table.Td>
      <Table.Td className="p-4 text-center border-b border-gray-200">
        {element.productquantity}
      </Table.Td>
      <Table.Td className="p-4 text-center border-b border-gray-200">
        {element.averageRating} ({element.totalReviews})
      </Table.Td>
      <Table.Td className="p-4 text-center border-b border-gray-200">
        ₹{element.price}
      </Table.Td>
      <Table.Td className="p-4 text-center border-b border-gray-200">
        <input
          type="number"
          value={element.discount || 0}
          onChange={(e) =>
            updateDiscount(element._id, Number.parseFloat(e.target.value))
          }
          className="w-16 p-1 border border-gray-300 rounded"
        />
      </Table.Td>
      <Table.Td className="p-4 text-center border-b border-gray-200">
        ₹
        {calculateDiscountedPrice(element.price, element.discount || 0).toFixed(
          2
        )}
      </Table.Td>
      <Table.Td className="p-4 text-center border-b border-gray-200">
        <div className="flex justify-center gap-2">
          <Button
            color="blue"
            size="xs"
            onClick={() => handleUpdateProduct(element._id)}
          >
            Update
          </Button>
          <Button
            color="red"
            size="xs"
            onClick={() => handleDeleteProduct(element._id)}
          >
            Delete
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <Loader />
  //     </div>
  //   );
  // }

  if (isError) {
    return (
      <div className="m-8">
        <Notification title="Error" color="red">
          Failed to load products: {error.message}
        </Notification>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="m-4 shadow-md rounded-md">
        <div
          className="overflow-auto"
          style={{ maxHeight: "80vh", maxWidth: "100%" }}
        >
          <Table className="w-full border-collapse border border-gray-300">
            <Table.Thead>
              <Table.Tr className="bg-gray-200 text-gray-700 uppercase text-sm sticky top-0 z-10">
                {/* <Table.Th className="p-4 text-center border-b border-gray-300">
                  ID
                </Table.Th> */}
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Image
                </Table.Th>
                <Table.Th className=" text-center border-b border-gray-300">
                  Product Name
                </Table.Th>
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Category
                </Table.Th>
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Quantity
                </Table.Th>
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Rating (Total Reviews)
                </Table.Th>
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Price
                </Table.Th>
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Discount (%)
                </Table.Th>
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Discounted Price
                </Table.Th>
                <Table.Th className="p-4 text-center border-b border-gray-300">
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Products;
