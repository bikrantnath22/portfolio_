import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React from 'react';
import {
  HomeOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { FaProjectDiagram } from "react-icons/fa"; // Project icon
import NavBtns from "./NavBtn";



const BottomNavBar = () => {
    const location = useLocation();
  return (
    <>
      <div className=" z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 flex justify-around items-center w-[90%] max-w-md p-3 rounded-full shadow-lg md:hidden">
        
      <Link to="/" className="flex items-center">
      <NavBtns
        icon={<HomeOutlined />}
        title="Home"
        isActive={location.pathname === "/"}
      />
    </Link>
          <Link
            to="/project"
            className="flex items-center "
          >
            <NavBtns icon={<FaProjectDiagram />} title={"Projects"} isActive={location.pathname === "/project"}/>
          </Link>
          <Link
            to="/abouts"
            className="flex items-center "
          >
            <NavBtns icon={<InfoCircleOutlined />} title={"Abouts"} isActive={location.pathname === "/abouts"}/>
          </Link>
        
      </div>
    </>
  );
};

export default React.memo(BottomNavBar);;
