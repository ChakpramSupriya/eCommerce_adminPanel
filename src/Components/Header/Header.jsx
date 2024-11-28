import React from "react";
import {
  BsJustify,
  BsSearch,
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({ OpenSidebar, onSearch }) => {
  return (
    <header className="header bg-red-50 flex items-center justify-between px-4 sm:pl-8  shadow-md">
      <div className="menu-icon flex items-center">
        <BsJustify
          className="icon text-2xl cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={OpenSidebar}
        />
      </div>

      <div className="header-left flex items-center bg-white border border-gray-300 rounded-lg px-2 py-2 shadow-sm w-full sm:w-1/3">
        <BsSearch className="icon text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 flex-grow outline-none text-sm text-gray-700"
        />
      </div>

      <div className="header-right flex items-center gap-4 text-gray-700">
        <div className="relative">
          <Link to="/notification">
            <BsFillBellFill
              className="icon text-xl cursor-pointer hover:text-gray-900"
              title="Notifications"
            />
          </Link>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-white text-xs flex items-center justify-center shadow-md">
            3
          </span>
        </div>
        <Link to="/message">
          <BsFillEnvelopeFill
            className="icon text-xl cursor-pointer hover:text-gray-900"
            title="Messages"
          />
        </Link>
        <Link to="/signin">
          <BsPersonCircle
            className="icon text-2xl cursor-pointer hover:text-gray-900"
            title="Profile"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
