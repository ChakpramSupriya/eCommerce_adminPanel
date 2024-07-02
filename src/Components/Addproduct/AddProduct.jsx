import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import axios from "axios";
const AddProduct = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sizelength, setSizelength] = useState("");
  const [sizewidth, setSizewidth] = useState("");
  const [image, setImage] = useState("");

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

  // const handleFileChange = (e) => {
  //   setSelectedFiles(e.target.files);
  // };

  // const handleUpload = () => {
  //   const formData = new FormData();

  //   for (let file of selectedFiles) {
  //     formData.append("files", file);
  //   }

  //   // Example: send formData to server using Axios or fetch
  //   // Replace with your API endpoint
  //   // axios.post('/api/upload', formData)
  //   //   .then(response => {
  //   //     console.log(response.data);
  //   //   })
  //   //   .catch(error => {
  //   //     console.error(error);
  //   //   });

  //   // Reset selectedFiles state after upload
  //   setSelectedFiles([]);
  // };
  // console.log(selectedFiles);

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div style={{ marginLeft: "20px" }}>
          <h1>Add Product</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <input type="file" multiple />
            <input
              type="text"
              placeholder="Enter product name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="quantity"
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="text"
              placeholder="sizelength"
              onChange={(e) => setSizelength(e.target.value)}
            />
            <input
              type="text"
              placeholder="sizewidth"
              onChange={(e) => setSizewidth(e.target.value)}
            />
            <div style={{ display: "flex" }}>
              <p>Category</p>
              <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
            </div>
          </div>
          <textarea
            name=""
            id=""
            cols={50}
            rows={4}
            placeholder="About Product"
          ></textarea>
          <br />
          <button>Add Product</button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
