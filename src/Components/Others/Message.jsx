import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const messagesData = [
  {
    id: 1,
    sender: "John Doe",
    email: "john@example.com",
    subject: "Account Assistance",
    message: "Hello, I need help with my account login issue.",
    date: "2024-11-21",
  },
  {
    id: 2,
    sender: "Jane Smith",
    email: "jane@example.com",
    subject: "Feature Request",
    message: "Can you add a dark mode to the admin panel?",
    date: "2024-11-20",
  },
  {
    id: 3,
    sender: "Alice ",
    email: "alice@example.com",
    subject: "Bug Report",
    message: "The dashboard is not loading properly on mobile.",
    date: "2024-11-19",
  },
  {
    id: 4,
    sender: "Brown",
    email: "brown@example.com",
    subject: "Bug Report",
    message: "The dashboard is not loading properly on mobile.",
    date: "2024-11-19",
  },
  {
    id: 5,
    sender: "Lan",
    email: "lan@example.com",
    subject: "Bug Report",
    message: "The dashboard is not loading properly on mobile.",
    date: "2024-11-19",
  },
  {
    id: 6,
    sender: "Tom",
    email: "tom@example.com",
    subject: "Bug Report",
    message: "The dashboard is not loading properly on mobile.",
    date: "2024-11-19",
  },
  {
    id: 7,
    sender: "Bon",
    email: "bon@example.com",
    subject: "Bug Report",
    message: "The dashboard is not loading properly on mobile.",
    date: "2024-11-19",
  },
  {
    id: 8,
    sender: "Ally",
    email: "ally@example.com",
    subject: "Bug Report",
    message: "The dashboard is not loading properly on mobile.",
    date: "2024-11-19",
  },
];
const Message = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };
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
      <div className="w-full bg-gray-100 m-8 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Messages</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Message List */}
            <div className="col-span-1  bg-gray-50 rounded-lg p-4 border h-96 overflow-y-auto">
              <h2 className="text-lg font-medium text-gray-600 mb-4">
                Message List
              </h2>
              <ul className="space-y-4">
                {messagesData.map((message) => (
                  <li
                    key={message.id}
                    className={`p-4 rounded-lg shadow-sm cursor-pointer ${
                      selectedMessage?.id === message.id
                        ? "bg-blue-100 border border-blue-300"
                        : "bg-white border border-gray-200"
                    } hover:bg-blue-50`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <h3 className="font-medium text-gray-800">
                      {message.subject}
                    </h3>
                    <p className="text-sm text-gray-500">{message.sender}</p>
                    <p className="text-xs text-gray-400">{message.date}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Message Details */}
            <div className="col-span-2 bg-white rounded-lg p-6 border h-96 overflow-y-auto">
              {selectedMessage ? (
                <>
                  <h2 className="text-lg font-medium text-gray-600 mb-4">
                    Message Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Sender:
                      </span>
                      <p className="text-gray-800">{selectedMessage.sender}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Email:
                      </span>
                      <p className="text-gray-800">{selectedMessage.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Subject:
                      </span>
                      <p className="text-gray-800">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Message:
                      </span>
                      <p className="text-gray-800">{selectedMessage.message}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Date:
                      </span>
                      <p className="text-gray-800">{selectedMessage.date}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">
                  Select a message to view details.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
