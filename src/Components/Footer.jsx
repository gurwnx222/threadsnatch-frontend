import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="relative w-auto h-auto min-h-[300px] p-6 text-white  
    rounded-tr-[100px] sm:rounded-tr-[150px] bg-gradient-to-b from-black to-[#2B2019] 
    flex flex-col justify-center items-center text-center"
    >
      {/* Navigation Links */}
      <nav className="font-montserrat space-y-9 mt-8">
        <h2 className="text-5xl font-bold hover:text-gray-300 transition-all">
          <Link to="/">HOME ↗</Link>
        </h2>
        <h2 className="text-5xl font-bold hover:text-gray-300 transition-all">
          <a href="https://docs.threadsnatch.online/" target="__blank">
            DOCS ↗
          </a>
        </h2>
        <h2 className="text-5xl font-bold hover:text-gray-300 transition-all">
          <Link to="/about">ABOUT ↗</Link>
        </h2>
        <h2 className="text-5xl font-bold hover:text-gray-300 transition-all">
          <Link to="/terms">T&C ↗</Link>
        </h2>
      </nav>

      {/* Copyright Notice */}
      <p className="mt-6 sm:mt-10 text-gray-400 text-sm sm:text-base">
        2025 © All rights reserved
      </p>
    </div>
  );
};

export default Footer;
