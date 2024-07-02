import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const elements = [
  //   { id: 6, price: 12.011, category: "C", name: "Carbon", quantity: 10 },
  //   {
  //     id: 7,
  //     price: 14.007,
  //     category: "N",
  //     name: "Nitrogen",
  //     quantity: 10,
  //   },
  //   {
  //     id: 39,
  //     price: 88.906,
  //     category: "Y",
  //     name: "Yttrium",
  //     quantity: 10,
  //   },
  //   {
  //     id: 56,
  //     price: 137.33,
  //     category: "Ba",
  //     name: "Barium",
  //     quantity: 10,
  //   },
  //   {
  //     id: 58,
  //     price: 140.12,
  //     category: "Ce",
  //     name: "Cerium",
  //     quantity: 10,
  //   },
  // ];
  const rows = products.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element._id}</Table.Td>
      <Table.Td style={{ display: "flex", alignItem: "center", gap: "10px" }}>
        <img
          src={`http://drive.google.com/thumbnail?id=${element?.image_id[0]?.replace(
            /"/g,
            ""
          )}`}
          width={"40px"}
          height={"40px"}
          style={{ borderRadius: "50%" }}
        />
        <p>{element.name}</p>
      </Table.Td>
      <Table.Td>{element.category.name}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
      <Table.Td>₹ {element.price}</Table.Td>
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
                  Product name
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Category</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Quantity</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Price</Table.Th>
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
