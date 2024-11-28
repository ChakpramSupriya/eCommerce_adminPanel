import React, { useState } from "react";
import Header from "../Header/Header"; // Assuming Header is in the appropriate path
import Sidebar from "../Sidebar/Sidebar";
import { TextInput, Switch, Button, Divider } from "@mantine/core";

const Setting = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 bottom-0 z-10 bg-white">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <Header OpenSidebar={OpenSidebar} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="w-full rounded-lg shadow-md bg-white">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 p-4 border-b">
              E-Commerce Settings
            </h2>

            <div className="p-4">
              {/* General Settings Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">
                  General Settings
                </h3>
                <Divider my="sm" />
                <TextInput
                  label="Store Name"
                  placeholder="Enter your store name"
                  classNames={{ input: "w-full mt-2" }}
                />
                <TextInput
                  label="Store Description"
                  placeholder="Describe your store"
                  classNames={{ input: "w-full mt-4" }}
                />
              </div>

              {/* Payment Settings Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">
                  Payment Settings
                </h3>
                <Divider my="sm" />
                <TextInput
                  label="Payment Gateway API Key"
                  placeholder="Enter API key"
                  classNames={{ input: "w-full mt-2" }}
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">Enable Cash on Delivery</span>
                  <Switch color="green" />
                </div>
              </div>

              {/* Notification Settings Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">
                  Notification Settings
                </h3>
                <Divider my="sm" />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">
                    Enable Order Notifications
                  </span>
                  <Switch color="blue" />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">
                    Enable New Product Alerts
                  </span>
                  <Switch color="blue" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-6">
                <Button color="gray" variant="outline" className="mr-4">
                  Cancel
                </Button>
                <Button color="blue">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
