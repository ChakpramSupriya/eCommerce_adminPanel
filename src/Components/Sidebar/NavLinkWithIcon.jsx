// @ts-check

import React from "react";
import { NavLink } from "react-router-dom";

function NavLinkWithIcon({ to, icon, label }) {
  return (
    <NavLink to={to} className={"flex gap-2 items-center"}>
      {icon}
      <p className="text-lg">{label}</p>
    </NavLink>
  );
}

export default NavLinkWithIcon;
