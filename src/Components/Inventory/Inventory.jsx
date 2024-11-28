import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// Sample data for the table (you can replace this with data fetched from an API)
const inventoryData = [
  {
    id: 1,
    product: "Rani phi",
    title: "Rani phi border",
    price: "Rs 1200",
    rating: "***",
    category: "Rani phi",
  },
  {
    id: 2,
    product: "Manipur Shawl",
    title: "Manipur Silk Shawl",
    price: "Rs 1500",
    rating: "****",
    category: "Shawls",
  },
  {
    id: 3,
    product: "Khadi Top",
    title: "Khadi Cotton Top",
    price: "Rs 800",
    rating: "***",
    category: "Topwear",
  },
  // Add more data as needed
];

const Inventory = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <div className="flex-grow p-6">
        <div className="w-full rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-4 border-b">
            Inventory
          </h2>

          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                  #
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                  Products
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                  Title
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                  Price
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                  Rating
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.product}</td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="py-3 px-4">{item.rating}</td>
                  <td className="py-3 px-4">{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
