import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
const Inventory = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div className="box">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Products</th>
                <th>Title</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Rani phi</td>
                <td>Rani phi border</td>
                <td>Rs 1200</td>
                <td>***</td>
                <td>Rani phi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Inventory;
