import React from "react";
import { PiDressLight } from "react-icons/pi";

function Logo() {
  return (
    <div className="sidebar-brand flex items-center space-x-5">
      {/* <PiDressLight className="icon_header" color="white" /> */}
      <img className="w-[50px] h-[40px] object-fit " src="./logo.jpg" alt="" />
      {/* <p className="text-slate-200">Handloom</p> */}
    </div>
  );
}

export default Logo;
