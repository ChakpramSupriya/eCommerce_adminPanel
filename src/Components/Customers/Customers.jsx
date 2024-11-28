import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { BASE_URL } from "@/constants/apiDetails";

const Customers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [customers, setCustomers] = useState([]);

  // Function to toggle the sidebar visibility
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch customer data from API
  const getCustomers = async () => {
    const response = await fetch(`${BASE_URL}/customers`);
    const data = await response.json();
    setCustomers(data.customers); // Assume `customers` is the key containing the array
  };

  // Fetch customers when the component mounts
  useEffect(() => {
    getCustomers();
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers); // Update state after deletion (you can add API call to delete on the backend)
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <div className="flex flex-col flex-grow p-6">
        <div className="w-full rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-4 border-b">
            Customer List
          </h2>

          {/* Customer Table */}
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold text-sm text-gray-700 border-b">
                  ID
                </th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-700 border-b">
                  Name
                </th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-700 border-b">
                  Email
                </th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-700 border-b">
                  Phone
                </th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-700 border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{customer.name}</td>
                    <td className="py-3 px-4">{customer.email}</td>
                    <td className="py-3 px-4">{customer.phone}</td>
                    <td className="py-3 px-4 flex gap-2 justify-center">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-600">
                    No customers available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
