import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import ImgFetching from "../Components/ImgFetching";

const ImageSaver = () => {
  // for input fields
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  // for fetching image container showing
  const [showContainer, setShowContainer] = useState(false);
  // for transition effect
  const [containerVisible, setContainerVisible] = useState(false);
  // for error handling
  const [invalidErrorURL, setInvalidErrorURL] = useState("");
  // for loading state
  const [isLoading, setIsLoading] = useState(false);
  // Track previous URLs to prevent duplicate fetches
  const [previousUrl, setPreviousUrl] = useState("");
  // Track fetch completion state
  const [fetchComplete, setFetchComplete] = useState(false);
  // Force refresh key for ImgFetching component
  const [refreshKey, setRefreshKey] = useState(0);

  // Effect to handle smooth transition
  useEffect(() => {
    let timeoutId;
    if (showContainer) {
      // Small delay before showing the container with opacity transition
      timeoutId = setTimeout(() => {
        setContainerVisible(true);
      }, 100);
    } else {
      setContainerVisible(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showContainer]);

  const validateThreadsUrl = (url) => {
    // Basic validation - checks if URL is from threads.com
    return url && url.includes("threads.com");
  };

  const normalizeUrl = (url) => {
    // Remove trailing slashes, query parameters, and fragments for comparison
    try {
      const urlObj = new URL(url);
      return urlObj.origin + urlObj.pathname.replace(/\/$/, "");
    } catch {
      return url.replace(/\/$/, "").split("?")[0].split("#")[0];
    }
  };

  const handleSubmit = () => {
    // Reset error message
    setInvalidErrorURL("");

    if (!input1) {
      setInvalidErrorURL("Please enter a URL.");
      return;
    }

    if (!validateThreadsUrl(input1)) {
      setInvalidErrorURL(
        "Please Enter a Valid URL, which should be from meta threads Image Post."
      );
      setShowContainer(false);
      return;
    }

    const normalizedCurrentUrl = normalizeUrl(input1);
    const normalizedPreviousUrl = normalizeUrl(previousUrl);

    // Check if the URL is the same as the previous one
    if (previousUrl && normalizedCurrentUrl === normalizedPreviousUrl) {
      setInvalidErrorURL(
        "This image has already been fetched. Please paste a different Threads URL to fetch a new image."
      );
      return;
    }

    // SOLUTION: Reset container state first, then show with new content
    setContainerVisible(false);
    setShowContainer(false);

    // Clear previous states and prepare for new fetch
    setIsLoading(true);
    setFetchComplete(false);
    setInput2(input1);
    setPreviousUrl(input1);

    // Force component refresh by updating key
    setRefreshKey((prev) => prev + 1);

    // Show container after a brief delay to ensure clean state reset
    setTimeout(() => {
      setShowContainer(true);
    }, 50);
  };

  // Handle when image fetch is complete (success or error)
  const handleImageFetchComplete = (success, error = null) => {
    setIsLoading(false);
    setFetchComplete(true);

    // If there was an error, you might want to handle it here
    if (!success && error) {
      console.log("Image fetch failed:", error);
      // You could set additional error states here if needed
    }
  };

  // NEW: Handle when modal is closed - reset container state
  const handleModalClose = () => {
    setShowContainer(false);
    setContainerVisible(false);
    setFetchComplete(false);
  };

  // Handle input change and clear errors
  const handleInputChange = (e) => {
    setInput1(e.target.value);
    // Clear errors when user starts typing new URL
    if (invalidErrorURL) {
      setInvalidErrorURL("");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
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
        <div className="flex flex-col items-center justify-center text-center px-12 z-10 mb-12">
          <h2 className="text-3xl font-medium">Image Downloader</h2>
          <p className="text-[#FFFFFF99] mt-2">
            Fetch and Download HD Images in 2 Clicks from Meta Threads
          </p>
        </div>

        {/* Image fetching container with transition */}
        {showContainer && (
          <div
            className={`z-20 w-full mx-auto mb-8 transition-opacity duration-300 ease-in-out ${
              containerVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <ImgFetching
              key={refreshKey} // Force re-mount when key changes
              input2={input2}
              onFetchComplete={handleImageFetchComplete}
              onModalClose={handleModalClose} // NEW: Pass close handler
            />
          </div>
        )}

        {/* Input field and credits section with better positioning */}
        <div className="flex flex-col items-center justify-center w-full px-4 mb-3">
          {invalidErrorURL && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 max-w-md mx-auto">
              <p className="text-sm text-red-400 text-center">
                {invalidErrorURL}
              </p>
            </div>
          )}

          {/* Input Field with dark background */}
          <div className="flex items-center bg-[#3A3A3C] text-white px-4 py-2 rounded-full w-full max-w-md border border-[#FFFFFF33]">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Paste Your Threads URL"
              value={input1}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="bg-transparent outline-none flex-1 placeholder-gray-400"
              disabled={isLoading}
            />

            {/* Send Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              } p-2 rounded-full transition duration-200`}
              title={isLoading ? "Loading..." : "Fetch Image"}
            >
              <FaPaperPlane
                className={`text-white ${isLoading ? "animate-pulse" : ""}`}
              />
            </button>
          </div>

          {/* Status indicator */}
          {isLoading && (
            <p className="text-blue-400 text-sm mt-2">Fetching image...</p>
          )}

          {fetchComplete && !isLoading && (
            <p className="text-green-400 text-sm mt-2">Ready for next URL</p>
          )}
        </div>

        {/* Copyright text at bottom with fixed positioning */}
        <div className="text-[#FFFFFFDE] text-xs mb-6">
          2025©ThreadSnatch.online
        </div>
      </div>
    </div>
  );
};

export default ImageSaver;
