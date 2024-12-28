import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsFillGearFill,
} from "react-icons/bs";
import { MdOutlineViewCarousel } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import NavLinkWithIcon from "./NavLinkWithIcon";
import Logo from "../Logo";
import { Link, NavLink } from "react-router-dom";
import { BarChart2 } from "lucide-react";
const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <Link to="/">
          <Logo />
        </Link>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list ">
        <li className="sidebar-list-item p-2 ">
          <NavLinkWithIcon
            to={"/"}
            icon={<BsGrid1X2Fill className="icon " />}
            label={"Dashboard"}
          />
        </li>
        <li className="sidebar-list-item p-2">
          <NavLinkWithIcon
            to={"/products"}
            icon={<BsFillArchiveFill className="icon " />}
            label={"Products"}
          />
        </li>
        <li className="sidebar-list-item p-2">
          <NavLinkWithIcon
            to={"/addproduct"}
            icon={<FaCartArrowDown className="icon" />}
            label={"AddProducts"}
          />
        </li>
        <li className="sidebar-list-item p-2">
          <NavLinkWithIcon
            to={"/carousel"}
            icon={<MdOutlineViewCarousel className="icon " />}
            label={"Carousel"}
          />
        </li>
        <li className="sidebar-list-item p-2">
          <NavLinkWithIcon
            to={"/categories"}
            icon={<BsFillGrid3X3GapFill className="icon" />}
            label={"Categories"}
          />
        </li>
        <li className="sidebar-list-item p-2">
          <NavLinkWithIcon
            to={"/customers"}
            icon={<BsPeopleFill className="icon" />}
            label={"Customers"}
          />
        </li>
        <li className="sidebar-list-item p-2">
          <NavLinkWithIcon
            to={"/manageseller"}
            icon={<BarChart2 className="icon" />}
            label={"Manage Seller"}
          />
        </li>
        <li className="sidebar-list-item p-2">
          <NavLinkWithIcon
            to={"/inventory"}
            icon={<BsListCheck className="icon" />}
            label={"Inventory"}
          />
        </li>

        <li className="sidebar-list-item p-2">
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
