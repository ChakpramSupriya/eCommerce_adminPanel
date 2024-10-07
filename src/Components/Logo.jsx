import React from "react";
import { PiDressLight } from "react-icons/pi";

function Logo() {
  return (
    <div className="sidebar-brand flex items-center space-x-5">
      <PiDressLight className="icon_header" color="white" />
      <p className="text-slate-200">Handloom</p>
    </div>
  );
}

export default Logo;
