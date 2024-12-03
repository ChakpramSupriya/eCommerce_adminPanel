import React from "react";
import { PiDressLight } from "react-icons/pi";

function Logo() {
  return (
    <div className="sidebar-brand flex items-center space-x-5">
      <img
        className=" object-contain w-[100px] sm:h-[50px] h-[50px]"
        src="/logo.png"
        alt=""
      />
    </div>
  );
}

export default Logo;
