import React from 'react';
import { Button } from "@mui/material";
import { RiDashboardFill, RiUserFill, RiShoppingCartFill, RiLogoutBoxFill, RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init( { duration: 800, once: true, offset: 300} );

const Sidebar: React.FC = () => {
  return (
    <div className=" h-screen bg-gray-800 text-white flex flex-col py-12 px-8 rounded-lg">
      {/* Dashboard Header */}
      <div className="flex items-center justify-center mb-8">
        <RiDashboardFill className="text-2xl mr-2" data-aos="fade-up"/>
        <span className="font-semibold text-3xl text-white" data-aos="fade-up">Dashboard</span>
      </div>

      {/* Menu Buttons */}
      <ul className="flex flex-col space-y-2 flex-grow" data-aos="fade-up" data-aos-delay="300">
        <Button
          className="flex items-center justify-start w-full text-left text-white hover:bg-gray-700 rounded-md p-2 pl-3 normal-case"
          startIcon={<RiUserFill className="text-white" />}
          style={{ justifyContent: 'flex-start', color: 'white', fontSize: '1.2rem' }}
        >
          <Link to="profile">Profile</Link>
        </Button>
        <Button
          className="flex items-center justify-start w-full text-left text-white hover:bg-gray-700 rounded-md p-2 pl-3 normal-case"
          startIcon={<RiDashboardFill className="text-white" />}
          style={{ justifyContent: 'flex-start', color: 'white', fontSize: '1.2rem' }}
        >
          <Link to="user/data">Dashboard</Link>
        </Button>
        <Button
          className="flex items-center justify-start w-full text-left text-white hover:bg-gray-700 rounded-md p-2 pl-3 normal-case"
          startIcon={<RiShoppingCartFill className="text-white" />}
          style={{ justifyContent: 'flex-start', color: 'white', fontSize: '1.2rem' }}
        >
          <Link to="purchased">Purchased Items</Link>
        </Button>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
        <Button
          className="flex items-center justify-between w-full text-left text-white hover:bg-gray-700 rounded-md p-2"
          startIcon={<RiLogoutBoxFill />}
          endIcon={<RiArrowRightSLine className="ml-end" />}
          style={{ color: 'white', fontSize: '1.2rem' }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;