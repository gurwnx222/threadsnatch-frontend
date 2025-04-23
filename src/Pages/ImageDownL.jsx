import React from "react";
import { useState } from "react";
import { FaPlus, FaPaperPlane } from "react-icons/fa";
import SubscribeModal from "../Components/SubscribeModal";
import Navbar from "../Components/Navbar";

const ImageDownL = () => {
  const [DRemains, setDRemains] = useState(3);
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="font-montserrat min-h-screen bg-[#1D1D1E] relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-[#1D1D1E] bg-blend-overlay opacity-50 z-0"
        style={{
          backgroundImage: "url('/bg-ImageDownl-removebg-preview.png')",
        }}
      ></div>

      <Navbar />

      {/* Content */}
      <div className="relative z-10 text-white top-80">
        <div className="flex flex-col items-center justify-center text-center px-12">
          <h2 className="text-3xl font-medium">Image Downloader</h2>
          <p className="text-[#FFFFFF99] mt-2 ">
            Fetch and Download Images from Meta Threads
          </p>
        </div>

        {showModal && <SubscribeModal onClose={() => setShowModal(false)} />}

        {/* Bottom content */}
        <div className="relative flex flex-col items-center justify-center lg:top-64 top-72 gap-1">
          <p className="relative lg:right-28 right-24">{DRemains} - download remains</p>

          {/* Input Field is HEre */}
          <div className="flex items-center bg-[#3A3A3C] text-white px-4 py-2 rounded-full w-full max-w-md">
            {/* Plus Icon */}
            <FaPlus className="mr-2 text-white" />

            {/* Input Field */}
            <input
              type="text"
              placeholder="Paste Your Threads URL"
              className="bg-transparent outline-none flex-1 placeholder-gray-400"
            />

            {/* Send Button */}
            <button className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition">
              <FaPaperPlane className="text-white" />
            </button>
          </div>
          <div className="text-[#FFFFFFDE] text-xs mt-6">
            2025©ThreadSnatch.online
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDownL;
