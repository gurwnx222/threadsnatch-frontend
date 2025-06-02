import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import VidFetching from "../Components/VidFetching";

const VideoSaver = () => {
  // for input fields
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  // for fetching video container showing
  const [showContainer, setShowContainer] = useState(false);
  // for error handling
  const [invalidErrorURL, setInvalidErrorURL] = useState("");
  // for loading state
  const [isLoading, setIsLoading] = useState(false);

  const validateThreadsUrl = (url) => {
    // Basic validation - checks if URL is from threads.com
    return url && url.includes("threads.com");
  };

  const handleSubmit = () => {
    // Reset error message
    setInvalidErrorURL("");
    setIsLoading(false);
    if (!input1) {
      setInvalidErrorURL("Please enter a URL");
      return;
    }

    if (!validateThreadsUrl(input1)) {
      setInvalidErrorURL(
        "Please enter a valid URL from Meta Threads Video post."
      );
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Update input2 with the validated URL
    setInput2(input1);

    // Show the container
    setShowContainer(true);
  };

  // Reset loading state when input2 changes (new URL is being processed)
  useEffect(() => {
    if (input2) {
      // Reset loading after a short delay to allow the VidFetching component to initialize
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [input2]);

  // This function can be passed to VidFetching to signal when loading is complete
  const handleVideoFetchComplete = (success) => {
    setIsLoading(false);
    // You could also handle failed video fetches here if needed
  };

  return (
    <div className="font-montserrat min-h-screen bg-[#1D1D1E] relative flex flex-col">
      {/* Background overlay with confetti */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-[#1D1D1E] bg-blend-overlay opacity-50 z-0"
        style={{
          backgroundImage: "url('/background-confetti.png')",
          backgroundPosition: "center",
        }}
      ></div>

      <Navbar />

      {/* Main content container with better positioning */}
      <div className="relative z-10 text-white flex-1 flex flex-col items-center justify-center mt-12">
        <div className="flex flex-col items-center justify-center text-center px-4 md:px-12 z-10 mb-12">
          <h2 className="text-3xl font-medium">Video Downloader</h2>
          <p className="text-[#FFFFFF99] mt-2">
            Fetch and Download HD Videos in few seconds without ADs from Meta
            Threads
          </p>
        </div>

        {/* Video fetching container */}
        {showContainer && (
          <div className="z-20 w-full mx-auto mb-8 transition-opacity duration-500 ease-in-out">
            <VidFetching
              input2={input2}
              onFetchComplete={handleVideoFetchComplete}
            />
          </div>
        )}

        {/* Input field section */}
        <div className="flex flex-col items-center justify-center w-full px-4 mb-3">
          {invalidErrorURL && (
            <p className="text-sm text-[#FF5252] mb-2 self-start max-w-md mx-auto">
              {invalidErrorURL}
            </p>
          )}

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
              onClick={handleSubmit}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } p-2 rounded-full transition`}
              aria-label="Submit URL"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </div>
        </div>

        {/* Copyright text at bottom */}
        <div className="text-[#FFFFFFDE] text-xs mb-6">
          2025©ThreadSnatch.online
        </div>
      </div>
    </div>
  );
};

export default VideoSaver;
