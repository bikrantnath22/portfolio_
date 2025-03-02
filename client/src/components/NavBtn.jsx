import React from "react";

function NavBtns({ icon, title, isActive }) {
  return (
    <div className={`group flex flex-row mr-5 items-center transition-all duration-300
      ${isActive ? "text-green-400  scale-105" : "text-white opacity-50"}
    `}>
      <span 
        className={`mr-2 transition-transform duration-300 
          ${isActive ? "animate-bounce text-white" : "group-hover:text-green-400"}
        `}
      >
        {icon}
      </span>
      <p className={`${isActive ? "text-green-400" : "group-hover:text-green-400"} transition-opacity duration-300`}>
        {title}
      </p>
    </div>
  );
}

export default NavBtns;
