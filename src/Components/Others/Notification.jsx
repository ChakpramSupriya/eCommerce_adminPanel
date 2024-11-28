import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const initialNotifications = [
  {
    id: 1,
    title: "New User Signup",
    message: "A new user, John Doe, has registered on the platform.",
    date: "2024-11-21",
    isRead: false,
  },
  {
    id: 2,
    title: "Server Update",
    message: "The server will undergo maintenance from 12:00 AM to 2:00 AM.",
    date: "2024-11-20",
    isRead: true,
  },
  {
    id: 3,
    title: "Bug Report Received",
    message: "A bug report has been submitted by Jane Smith.",
    date: "2024-11-19",
    isRead: false,
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
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
      <div className="w-full bg-gray-100 p-6 m-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Notifications
          </h1>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center">
                No notifications available.
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg shadow-sm border ${
                    notification.isRead
                      ? "bg-gray-50"
                      : "bg-blue-50 border-blue-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {notification.date}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-500 hover:underline text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
