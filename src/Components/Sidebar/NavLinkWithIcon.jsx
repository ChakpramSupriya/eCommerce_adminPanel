import React from "react";
import { NavLink } from "react-router-dom";

function NavLinkWithIcon({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center space-x-2 p-2 rounded-md ${
          isActive ? "bg-green-300 text-white" : "hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <p className="text-lg">{label}</p>
    </NavLink>
  );
}

export default NavLinkWithIcon;
