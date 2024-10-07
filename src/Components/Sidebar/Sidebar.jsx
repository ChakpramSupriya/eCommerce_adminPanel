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
import NavLinkWithIcon from "./NavLinkWithIcon";
import Logo from "../Logo";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <Logo />
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLinkWithIcon
            to={"/"}
            icon={<BsGrid1X2Fill className="icon" />}
            label={"Dashboard"}
          />
        </li>
        <li className="sidebar-list-item">
          <NavLinkWithIcon
            to={"/products"}
            icon={<BsFillArchiveFill className="icon" />}
            label={"Products"}
          />
        </li>
        <li className="sidebar-list-item">
          <NavLinkWithIcon
            to={"/categories"}
            icon={<BsFillGrid3X3GapFill className="icon" />}
            label={"Categories"}
          />
        </li>
        <li className="sidebar-list-item">
          <NavLinkWithIcon
            to={"/customers"}
            icon={<BsPeopleFill className="icon" />}
            label={"Customers"}
          />
        </li>
        <li className="sidebar-list-item">
          <NavLinkWithIcon
            to={"/inventory"}
            icon={<BsListCheck className="icon" />}
            label={"Inventory"}
          />
        </li>
        <li className="sidebar-list-item">
          <NavLinkWithIcon
            to={"/addproduct"}
            icon={<BsListCheck className="icon" />}
            label={"AddProducts"}
          />
        </li>
        <li className="sidebar-list-item">
          <NavLinkWithIcon
            to={"/setting"}
            icon={<BsFillGearFill className="icon" />}
            label={"Settings"}
          />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
