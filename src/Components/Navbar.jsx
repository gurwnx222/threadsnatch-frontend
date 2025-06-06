import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Docs_LINK } from "../utils/contants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (productsDropdownOpen) setProductsDropdownOpen(false);
  };

  const toggleProductsDropdown = (e) => {
    // Prevent the click from propagating to parent elements
    e.stopPropagation();
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  // Handle mobile product link clicks with navigate
  const handleMobileLinkClick = (path, e) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop propagation
    setIsOpen(false); // Close mobile menu
    setProductsDropdownOpen(false); // Close dropdown

    // Use setTimeout to ensure state updates complete before navigation
    setTimeout(() => {
      navigate(path);
    }, 10);
  };

  return (
    <nav className="bg-transparent py-4 px-4 md:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            ThreadSnatch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors cursor-pointer"
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleProductsDropdown}
              className="text-white hover:text-gray-300 transition-colors flex items-center cursor-pointer"
            >
              Products <ChevronDown size={16} className="ml-1" />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#2A2A2C] rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/carousel"
                  className="block px-4 py-2 text-white hover:bg-[#3A3A3C] cursor-pointer"
                >
                  Carousel Saver
                </Link>
                {/*  <Link
                  to="/video"
                  className="block px-4 py-2 text-white hover:bg-[#3A3A3C] cursor-pointer"
                >
                  Video Saver
                </Link> */}
                <Link
                  to="/image"
                  className="block px-4 py-2 text-white hover:bg-[#3A3A3C] cursor-pointer"
                >
                  Image Saver
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="text-white hover:text-gray-300 transition-colors cursor-pointer"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 transition-colors cursor-pointer"
          >
            Contact
          </Link>

          {/* Docs Button */}
          <a
            href={Docs_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <img src="/Vector.svg" alt="Docs Icon" className="w-4 h-4" /> Docs
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2A2A2C] rounded-lg mt-4 p-4 absolute left-4 right-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={(e) => handleMobileLinkClick("/", e)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={(e) => handleMobileLinkClick("/about", e)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={(e) => handleMobileLinkClick("/contact", e)}
            >
              Contact
            </Link>
            {/* Mobile Products Dropdown */}
            <div>
              <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
              <p className="text-[#f4f4f8] mt-2 text-lg w-full text-left flex items-center justify-between cursor-pointer">
                Savers
              </p>
              <div className="flex flex-col flex-start gap-2 mt-3 ml-3">
                <Link
                  to="/carousel"
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                  onClick={(e) => handleMobileLinkClick("/carousel", e)}
                >
                  Carousel Saver
                </Link>
                {/* <Link
                  to="/video"
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                  onClick={(e) => handleMobileLinkClick("/video", e)}
                >
                  Video Saver
                </Link> */}
                <Link
                  to="/image"
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                  onClick={(e) => handleMobileLinkClick("/image", e)}
                >
                  Image Saver
                </Link>
              </div>
            </div>

            {/* Mobile Docs Button */}
            <a
              href={Docs_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <img src="/Vector.svg" alt="Docs Icon" className="w-4 h-4" /> Docs
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
