import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";

const CrselFetching = ({ input2, images }) => {
  const [closeModal, setCloseModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClose = () => {
    setCloseModal(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // closes the modal when Click on cross Button
  if (closeModal) {
    return null;
  }

  // Safety check for images
  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentImageIndex];

  return (
    <>
      <div className="flex w-full max-w-md text-white bg-[#2C2C2E] h-[47px] mx-auto border rounded-full border-[#FFFFFF33]">
        <input
          type="text"
          value={input2}
          readOnly
          className="bg-transparent w-[85%] outline-none px-5"
        />

        <button onClick={handleClose}>
          <GoX size={35} className="cursor-pointer" />
        </button>
      </div>

      {/* Image fetching section */}
      <div className="rounded-3xl border border-[#EBEBF5] bg-[#2C2C2E] max-w-md flex flex-col w-full p-3 mx-auto mt-4">
        <div className="flex justify-between items-center m-4">
          <div className="flex flex-col">
            <p>{currentImage.title}</p>
            <p className="text-[#FFFFFFCC]">{currentImage.subtitle}</p>
          </div>
          <button className="ml-2 h-12 bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 transition">
            <FiDownload className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 relative">
          <img
            src={currentImage.imageUrl}
            alt="Image Loading"
            className="rounded-lg w-full"
          />

          {/* Carousel Navigation */}
          {images.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={handlePrevImage}
                className="bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition"
              >
                &#10094;
              </button>
              <button
                onClick={handleNextImage}
                className="bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition"
              >
                &#10095;
              </button>
            </div>
          )}

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-gray-400"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CrselFetching;
