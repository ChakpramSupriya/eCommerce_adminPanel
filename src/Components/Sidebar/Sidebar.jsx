import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsFillGearFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";

import { PiDressLight } from "react-icons/pi";
const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <PiDressLight className="icon_header" />
          Handloom
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to="/">
            <BsGrid1X2Fill className="icon" />
            Dashboard
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/products">
            <BsFillArchiveFill className="icon" />
            Products
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/categories">
            <BsFillGrid3X3GapFill className="icon" />
            Categories
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/customers">
            <BsPeopleFill className="icon" />
            Customers
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/inventory">
            <BsListCheck className="icon" />
            Inventory
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/addproduct">
            <BsListCheck className="icon" />
            AddProducts
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/setting">
            <BsFillGearFill className="icon" />
            Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
