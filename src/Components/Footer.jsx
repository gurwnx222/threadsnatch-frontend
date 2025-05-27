import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative w-auto h-auto min-h-[300px] p-6 text-white overflow-hidden rounded-tr-[100px] sm:rounded-tr-[150px]">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-[#2B2019]"></div>

      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Diagonal Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12 origin-left"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-12 origin-right"></div>
      </div>

      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-tr-[100px] sm:rounded-tr-[150px] border border-white/10 shadow-inner"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full">
        {/* Navigation Links */}
        <nav className="font-montserrat space-y-9 mt-8">
          <h2 className="text-5xl font-bold hover:text-gray-300 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Link to="/" className="relative">
              HOME ↗
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </h2>
          <h2 className="text-5xl font-bold hover:text-gray-300 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <a
              href="https://docs.threadsnatch.online/"
              target="_blank"
              className="relative"
            >
              DOCS ↗
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </h2>
          <h2 className="text-5xl font-bold hover:text-gray-300 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Link to="/about" className="relative">
              ABOUT ↗
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </h2>
          <h2 className="text-5xl font-bold hover:text-gray-300 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Link to="/terms" className="relative">
              T&C ↗
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </h2>
        </nav>

        {/* Copyright Notice */}
        <p className="mt-6 sm:mt-10 text-gray-400 text-sm sm:text-base relative">
          <span className="relative z-10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
            2025 © All rights reserved
          </span>
        </p>
      </div>

      {/* Subtle Shimmer Effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(12deg);
          }
          100% {
            transform: translateX(200vw) skewX(12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Footer;
