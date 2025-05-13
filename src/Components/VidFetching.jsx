import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
const VidFetching = ({input2}) => {

  const [closeModal, setCloseModal] = useState(false);

  const handleClose = () => {
    setCloseModal(true);
  };

  if (closeModal) return null;

  return (
    <>
      {/* Input with close button */}
      <div className="flex w-full max-w-md text-white bg-[#2C2C2E] h-[47px] mx-auto border rounded-full border-[#FFFFFF33]">
        <input
          type="text"
          value={input2}
          readOnly
          className="bg-transparent w-[85%] outline-none px-5"
        />
        <button onClick={handleClose} aria-label="Close modal">
          <GoX size={35} className="cursor-pointer" />
        </button>
      </div>

      {/* Scrollable vertical image list */}
      <div className="max-w-md mx-auto mt-4 h-[500px] overflow-y-auto space-y-6 pr-2">
        {images.map((img, index) => (
          <div
            key={index}
            className="rounded-3xl border border-[#EBEBF5] bg-[#2C2C2E] w-full p-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p>{img.title}</p>
                <p className="text-[#FFFFFFCC]">{img.subtitle}</p>
              </div>
              <button
                className="h-10 bg-blue-500 rounded-full p-2 text-white hover:bg-blue-600 transition"
                aria-label="Download image"
              >
                <FiDownload className="w-5 h-5" />
              </button>
            </div>
            <img
              src={img.imageUrl}
              alt={img.title}
              className="rounded-lg w-full"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VidFetching;