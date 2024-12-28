import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Box, ScrollArea } from "@mantine/core";

const ManageSeller = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [pendingSellers, setPendingSellers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Cityville",
      businessName: "John's Shop",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, Townsville",
      businessName: "Jane's Boutique",
    },
  ]);

  const [approvedSellers, setApprovedSellers] = useState([]);
  const [viewSeller, setViewSeller] = useState(null);

  // Toggle sidebar
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Approve a seller
  const handleApproveSeller = (id) => {
    const sellerToApprove = pendingSellers.find((seller) => seller.id === id);
    if (sellerToApprove) {
      setApprovedSellers([...approvedSellers, sellerToApprove]);
      setPendingSellers(pendingSellers.filter((seller) => seller.id !== id));
    }
  };

  // Delete a seller
  const handleDeleteSeller = (id) => {
    setApprovedSellers(approvedSellers.filter((seller) => seller.id !== id));
  };

  // View a seller's details
  const handleViewSeller = (id) => {
    const seller =
      pendingSellers.find((seller) => seller.id === id) ||
      approvedSellers.find((seller) => seller.id === id);
    setViewSeller(seller);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <ScrollArea type="never">
        <Box>
          <div className="m-6">
            <div className="container mx-auto p-6">
              <h1 className="text-2xl font-bold mb-4">Manage Sellers</h1>

              {viewSeller && (
                <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
                  <h2 className="text-xl font-semibold mb-2">Seller Details</h2>
                  <p>
                    <strong>ID:</strong> {viewSeller.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {viewSeller.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {viewSeller.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {viewSeller.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {viewSeller.address}
                  </p>
                  <p>
                    <strong>Business Name:</strong> {viewSeller.businessName}
                  </p>
                  <button
                    onClick={() => setViewSeller(null)}
                    className="mt-4 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                  >
                    Close
                  </button>
                </div>
              )}

              {/* Pending Sellers Table */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Pending Seller Requests
                </h2>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">ID</th>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Email
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Phone
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingSellers.map((seller) => (
                      <tr key={seller.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {seller.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {seller.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {seller.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {seller.phone}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <button
                            onClick={() => handleViewSeller(seller.id)}
                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mr-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleApproveSeller(seller.id)}
                            className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Approved Sellers Table */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Approved Sellers</h2>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">ID</th>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Email
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Phone
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedSellers.map((seller) => (
                      <tr key={seller.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {seller.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {seller.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {seller.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {seller.phone}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <button
                            onClick={() => handleViewSeller(seller.id)}
                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mr-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteSeller(seller.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Box>
      </ScrollArea>
    </div>
  );
};

export default ManageSeller;
