import React from "react";
import { RxTwitterLogo } from "react-icons/rx";
import { FaThreads } from "react-icons/fa6";

const UnderWorkingPage = () => {
  return (
    <div className="bg-black h-screen w-full px-6 sm:px-10 py-6 sm:py-10 flex flex-col justify-between items-center font-montserrat overflow-hidden">
      
      {/* Logo Section */}
      <div className="flex justify-center items-center gap-2">
        <img src="favicon.svg" alt="favicon" className="w-5 h-5 sm:w-6 sm:h-6" />
        <p className="text-white text-sm sm:text-base">ThreadSnatch</p>
      </div>

      {/* Main Text Section */}
      <div className="flex flex-col items-center text-center text-white text-xl sm:text-3xl font-semibold leading-tight">
        <h1>This site is currently</h1>
        <h1>down for maintenance</h1>
      </div>

      {/* Sub Text */}
      <div className="text-gray-400 text-xs sm:text-sm text-center">
        <p>We apologize for any inconveniences caused.</p>
        <p>We're almost done.</p>
      </div>

      {/* Image */}
      <div className="w-[80%] sm:w-[60%] max-h-[35vh]">
        <img
          src="underWorkingImg.png"
          alt="processing"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Separator Line */}
      <div className="w-full h-[1px] bg-gray-600"></div>

      {/* Contact Info */}
      <div className="text-center text-gray-400 text-[10px] sm:text-xs">
        <p>You can contact us:</p>
        <p>gurwinx369@gmail.com or yashparaschandan4@gmail.com</p>
      </div>

      {/* Social Links */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-12 mt-1">
        {/* Gurwin */}
        <div className="flex gap-2 justify-center">
          <a
            href="https://x.com/gurwinx369?t=zceQjtsS4I-NLw-qGVbZcw&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RxTwitterLogo color="gray" className="w-6 h-5" />
          </a>
          <a
            href="https://www.threads.com/@gurwinx369"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaThreads color="gray" className="w-6 h-5" />
          </a>
        </div>

        {/* Yash */}
        <div className="flex gap-2 justify-center">
          <a
            href="https://x.com/YashChandan_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RxTwitterLogo color="gray" className="w-6 h-5" />
          </a>
          <a
            href="https://www.threads.com/@yash.chandan_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaThreads color="gray" className="w-6 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnderWorkingPage;
