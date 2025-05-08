import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { ChevronDown, Menu, X } from "lucide-react";
import { API_LINK, Docs_LINK } from "../utils/contants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleProductsDropdown = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  return (
    <nav className="bg-transparent py-4 px-4 md:px-8">
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
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            Home
          </Link>
          
          {/* Products Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleProductsDropdown}
              className="text-white hover:text-gray-300 transition-colors flex items-center"
            >
              Products <ChevronDown size={16} className="ml-1" />
            </button>
            
            {productsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/carousel"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Carousel Saver
                </Link>
                <Link
                  to="/video"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Video Saver
                </Link>
                <Link
                  to="/image"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Image Saver
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/about" className="text-white hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300 transition-colors">
            Contact
          </Link>
          
          {/* Docs Button */}
          <a
            href={Docs_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <img src="/Vector.svg" alt="Docs Icon" className="w-4 h-4" /> Docs
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 rounded-lg mt-4 p-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={toggleProductsDropdown}
                className="text-white hover:text-gray-300 transition-colors w-full text-left flex items-center justify-between"
              >
                Products <ChevronDown size={16} />
              </button>
              
              {productsDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/carousel-saver"
                    className="block text-white hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Carousel Saver
                  </Link>
                  <Link
                    to="/video"
                    className="block text-white hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Video Saver
                  </Link>
                  <Link
                    to="/image"
                    className="block text-white hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Image Saver
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              to="/about"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile Docs Button */}
            <a
              href={Docs_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
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