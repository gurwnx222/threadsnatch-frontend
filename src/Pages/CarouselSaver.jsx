import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import SubscribeModal from "../Components/SubscribeModal";
import CrselFetching from "../Components/CarouselFetching";

//Note: Remeber to remove the comment from the credits from conditional statement';
// Add email database
const CarouselSaver = () => {
  const images = [
    { src: "/sample_image.jpg", alt: "One" },
    { src: "/sample_image2.jpg", alt: "Two" },
    { src: "/sample_image3.jpg", alt: "Three" },
  ];

  const [credits, setCredits] = useState(() => {
    // load credits from local storage or default to 3
    const savedCredits = localStorage.getItem("userCredits");
    return savedCredits ? parseInt(savedCredits, 10) : 3;
  });

  useEffect(() => {
    // save credits to local storage
    localStorage.setItem("userCredits", credits);
  }, [credits]);

  // use this true of want to show pop up
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // for input fields
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  // for fetching image container showing
  const [showContainer, setShowContainer] = useState(false);

  const handleSubmit = () => {
    handleFetchCrsel();
    setShowContainer(true);
  };

  // for credits limits
  const handleFetchCrsel = () => {
    setInput2(input1);

    if (credits > 0) {
      // fetch the image from API - GR add Backend
      setCredits((prev) => prev - 1);
      localStorage.clear();
    } else {
      // temperary
      // alert("You have no credits left. Please subscribe to get more credits.");
      setShowModal(true);
    }
  };

  return (
    <div className="font-montserrat min-h-screen bg-[#1D1D1E] relative flex flex-col">
      {/* Background overlay with confetti */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-[#1D1D1E] bg-blend-overlay opacity-50 z-0"
        style={{
          backgroundImage: "url('/background-confetti.png')",
        }}
      ></div>

      <Navbar />

      {/* Main content container with better positioning */}
      <div className="relative z-10 text-white flex-1 flex flex-col items-center justify-center mt-12">
        <div className="flex flex-col items-center justify-center text-center px-12 z-10 mb-12">
          <h2 className="text-3xl font-medium">Carousel Downloader</h2>
          <p className="text-[#FFFFFF99] mt-2">
            Fetch and Download Carousel from Meta Threads
          </p>
        </div>

        {/* Image fetching container with adjusted positioning */}
        {showContainer && (
          <div className="z-20 w-full mx-auto mb-8">
            <CrselFetching
              input2={input2}
              images={[
                {
                  title: "Ghibli Archives (@ghibliarchives)",
                  subtitle: "Porco Rosso (1992)",
                  imageUrl: "sample_image.jpg",
                },
                {
                  title: "Ghibli Archives (@ghibliarchives)",
                  subtitle: "My Neighbor Totoro (1988)",
                  imageUrl: "sample_image2.jpg",
                },
                {
                  title: "Ghibli Archives (@ghibliarchives)",
                  subtitle: "Spirited Away (2001)",
                  imageUrl: "sample_image3.jpg",
                },
              ]}
            />
          </div>
        )}

        {showModal && <SubscribeModal onClose={() => setShowModal(false)} />}

        {/* Input field and credits section with better positioning */}
        <div className="flex flex-col items-center justify-center w-full px-4 mb-3">
          <p className="mr-60 mt-9 mb-2 text-sm text-[#FFFFFF99]">
            {credits} - download remains
          </p>

          {/* Input Field with dark background */}
          <div className="flex items-center bg-[#3A3A3C] text-white px-4 py-2 rounded-full w-full max-w-md border border-[#FFFFFF33]">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Paste Your Threads URL"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              className="bg-transparent outline-none flex-1 placeholder-gray-400"
            />

            {/* Send Button */}
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </div>
        </div>

        {/* Copyright text at bottom with fixed positioning */}
        <div className="text-[#FFFFFFDE] text-xs mb-6">
          2025©ThreadSnatch.online
        </div>
      </div>
    </div>
  );
};

export default CarouselSaver;
