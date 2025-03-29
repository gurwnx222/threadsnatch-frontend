import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Importing menu and close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white font-montserrat absolute top-4 left-0 w-full z-50">
      <div className="container mx-auto flex justify-around items-center font-medium text-2xl p-4">
        <h1 className="z-49">threadSnatch</h1>

        {/* Hamburger Button */}
        <button
          className="md:hidden bg-white w-14 text-black rounded-3xl flex justify-center p-2 shadow-lg focus:outline-none transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Navbar Links for Desktop */}
        <ul className="hidden md:flex md:space-x-6 cursor-pointer">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5 text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <FiX />
        </button>
        <ul className="flex flex-col items-center mt-20 space-y-6 text-xl">
          <li>
            <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
