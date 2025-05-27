import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Navbar from "../Components/Navbar";
// import SubscribeModal from "../Components/SubscribeModal";
import ImgFetching from "../Components/ImgFetching";

const ImageSaver = () => {
  /* Commented out credits logic
  const [credits, setCredits] = useState(() => {
    // load credits from local storage or default to 3
    const savedCredits = localStorage.getItem("userCredits");
    return savedCredits ? parseInt(savedCredits, 10) : 3;
  });

  useEffect(() => {
    // save credits to local storage
    localStorage.setItem("userCredits", credits);
  }, [credits]);
  */
  /* for credits limits
  const handleFetchImage = () => {
    setInput2(input1);
  };
*/
  // use this true of want to show pop up
  // const [showModal, setShowModal] = useState(false); // Commented out modal state
  // const [isSubscribed, setIsSubscribed] = useState(false);

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

  // Effect to handle smooth transition
  useEffect(() => {
    let timeoutId;
    if (showContainer) {
      // Small delay before showing the container with opacity transition
      timeoutId = setTimeout(() => {
        setContainerVisible(true);
      }, 2500);
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

  const handleSubmit = () => {
    // Reset error message
    setInvalidErrorURL("");

    if (input1 && validateThreadsUrl(input1)) {
      setIsLoading(true);
      setInput2(input1);
      // First hide container if it was visible before
      if (showContainer) {
        setShowContainer(false);
        setTimeout(() => {
          setShowContainer(true);
        }, 2500); // Wait for fade out before showing new content
      } else {
        setShowContainer(true);
      }
    } else {
      setInvalidErrorURL(
        "Please Enter a Valid URL, which should be from meta threads Image Post."
      );
      setShowContainer(false);
    }
  };

  // This function can be passed to ImgFetching to signal when loading is complete
  const handleImageFetchComplete = (success) => {
    setIsLoading(false);
    // You could also handle failed image fetches here if needed
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
        <div
          className={`z-20 w-full mx-auto mb-8 transition-opacity duration-500 ease-in-out ${
            containerVisible ? "opacity-100" : "opacity-0"
          } ${showContainer ? "block" : "hidden"}`}
        >
          <ImgFetching
            input2={input2}
            onFetchComplete={handleImageFetchComplete}
          />
        </div>

        {/* Commented out modal component 
        {showModal && <SubscribeModal onClose={() => setShowModal(false)} />}
        */}

        {/* Input field and credits section with better positioning */}
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

export default ImageSaver;
