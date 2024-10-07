import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Table, Button } from "@mantine/core";
import axios from "axios";

const Products = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [products, setProducts] = useState([]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "https://e-commerce-ten-rust.vercel.app/product/allproduct"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  const handleDiscountChange = (index, newDiscount) => {
    const updatedProducts = [...products];
    updatedProducts[index].discount = newDiscount;
    setProducts(updatedProducts);
  };

  const updateDiscount = async (productId, discount) => {
    try {
      await axios.patch(
        `https://e-commerce-ten-rust.vercel.app/product/${productId}/updateDiscount`,
        { discount }
      );
      getProduct(); // Fetch updated products after successful update
    } catch (error) {
      console.log(error);
    }
  };

  const rows = products.map((element, index) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element._id}</Table.Td>
      <Table.Td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={`http://drive.google.com/thumbnail?id=${element?.image_id[0]?.replace(
            /"/g,
            ""
          )}`}
          alt="data"
          width={"40px"}
          height={"40px"}
          style={{ borderRadius: "50%" }}
        />
        <p>{element.name}</p>
      </Table.Td>
      <Table.Td>{element.category.name}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
      <Table.Td>₹ {element.price}</Table.Td>
      <Table.Td>
        <input
          type="number"
          value={element.discount || 0}
          onChange={(e) => handleDiscountChange(index, e.target.value)}
          style={{ width: "60px" }}
        />
        <Button
          onClick={() => updateDiscount(element._id, element.discount || 0)}
          style={{ marginLeft: "10px" }}
        >
          Update
        </Button>
      </Table.Td>
      <Table.Td>
        ₹{" "}
        {calculateDiscountedPrice(element.price, element.discount || 0).toFixed(
          2
        )}
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  Product Name
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Category</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Quantity</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Price</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  Discount (%)
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  Discounted Price
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Products;
