import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
import axios from "axios";

const ImgFetching = ({ input2, onFetchComplete, onModalClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  // Fixed environment variable access with proper naming convention
  const url = import.meta.env.VITE_RAPID_API_ENDPOINT_IMAGE;
  const proxyImageEndpoint = import.meta.env.VITE_PROXY_IMAGE_ENDPOINT;
  const params = {
    q: input2,
  };
  const headers = {
    "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
    "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
  };

  useEffect(() => {
    // Reset all states when input2 changes (new URL)
    setImageUrl("");
    setImageAuthor("");
    setImageDescription("");
    setError(null);
    setImageBlob(null);
    setShowModal(true); // Always show modal for new requests

    if (!input2) {
      const errorMsg =
        "Missing input. Please provide a valid input to fetch the image.";
      setError(errorMsg);
      setIsLoading(false);
      // Notify parent component about the error
      if (onFetchComplete) {
        onFetchComplete(false, errorMsg);
      }
      return;
    }

    // Check if required environment variables are available
    if (!url) {
      const errorMsg =
        "Missing required environment variables for Proxy Image Fetch. Please check your .env file.";
      setError(errorMsg);
      setIsLoading(false);
      // Notify parent component about the error
      if (onFetchComplete) {
        onFetchComplete(false, errorMsg);
      }
      return;
    }

    // Reset states when attempting a new fetch
    setError(null);
    setIsLoading(true);

    axios
      .get(url, { params, headers })
      .then(async (response) => {
        const encodedImageUrl =
          (await response?.data?.data?.imageData?.encodededURI) || "";
        const imageDescription =
          (await response?.data?.data?.postData?.postDescription) || "";
        const imageAuthor =
          (await response?.data?.data?.postData?.postTitle) || "";

        setImageDescription(imageDescription);
        setImageAuthor(imageAuthor);

        console.log("Encoded Image URL:", encodedImageUrl);
        console.log("Image Description:", imageDescription);
        console.log("Image Author:", imageAuthor);

        // SOLUTION: Decode the URL before sending to proxy
        const decodedImageUrl = decodeURIComponent(encodedImageUrl);
        console.log("Decoded Image URL:", decodedImageUrl);

        return axios
          .get(proxyImageEndpoint, {
            params: { url: decodedImageUrl }, // Use decoded URL
            responseType: "arraybuffer", // Explicitly set response type for binary data
          })
          .then((response) => {
            const blob = new Blob([response.data], { type: "image/jpeg" });
            const objectUrl = URL.createObjectURL(blob);
            console.log("Object URL created:", objectUrl);
            setImageUrl(objectUrl);
            setImageBlob(blob); // Store the blob for download
            setIsLoading(false);

            // Notify parent component about successful fetch
            if (onFetchComplete) {
              onFetchComplete(true);
            }
          });
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        // Log request config to see what was sent
        console.error("Request config:", error.config);
        // Log response data if available
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }

        const errorMsg = `Failed to fetch image: ${error.message}`;
        setError(errorMsg);
        setIsLoading(false);

        // Notify parent component about the error
        if (onFetchComplete) {
          onFetchComplete(false, errorMsg);
        }
      });

    // Cleanup function to revoke object URL when component unmounts or input changes
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [input2]); // Only depend on input2 to trigger re-fetch

  const handleClose = () => {
    setShowModal(false);
    // NEW: Notify parent component that modal was closed
    if (onModalClose) {
      onModalClose();
    }
  };

  // Function to handle image download
  const handleDownload = () => {
    if (!imageBlob) {
      console.error("No image blob available for download");
      return;
    }

    try {
      // Create a temporary anchor element for download
      const link = document.createElement("a");
      const url = URL.createObjectURL(imageBlob);

      // Generate filename with title and description
      const sanitizeFileName = (str) => {
        return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      };

      const titlePart = imageAuthor
        ? sanitizeFileName(imageAuthor.substring(0, 30))
        : "threads_image";
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:-]/g, "");
      const filename = `${titlePart}_${timestamp}.jpg`;

      link.href = url;
      link.download = filename;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the temporary URL
      URL.revokeObjectURL(url);

      console.log("Download initiated successfully:", filename);
    } catch (error) {
      console.error("Error during download:", error);
      setError("Failed to download image");
    }
  };

  // If modal is closed, don't render anything
  if (!showModal) return null;

  return (
    <>
      <div className="flex w-full max-w-md text-white bg-[#2C2C2E] h-[47px] mx-auto border rounded-full border-[#FFFFFF33]">
        <input
          type="text"
          value={input2}
          readOnly
          className="bg-transparent w-[85%] outline-none px-5 text-sm"
          placeholder="Thread URL will appear here..."
        />
        <button
          onClick={handleClose}
          className="hover:bg-red-500/20 rounded-full p-1 transition-colors duration-200"
          title="Close"
        >
          <GoX size={35} className="cursor-pointer" />
        </button>
      </div>

      {/* Image fetching section */}
      <div className="rounded-3xl border border-[#EBEBF5] bg-[#2C2C2E] max-w-md flex flex-col w-full p-3 mx-auto mt-4">
        <div className="flex m-4 justify-between items-start">
          <div className="flex flex-col flex-1 mr-3">
            <p className="text-white font-medium">
              {imageAuthor || "Loading title..."}
            </p>
            <p className="text-[#FFFFFFCC] text-sm mt-1">
              {imageDescription || "Loading description..."}
            </p>
          </div>
          {imageUrl && imageBlob && (
            <button
              onClick={handleDownload}
              className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
              title="Download image"
            >
              <FiDownload className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="px-6 relative">
          {isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-white flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
                <p>Loading image...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-red-400 text-center px-4">
                <p className="font-medium text-lg mb-2">
                  Image could not be loaded
                </p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-2 text-gray-400">
                  You can try with a different Threads URL
                </p>
              </div>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Thread content"
              className="w-full md:h-full object-contain shadow-custom rounded-lg h-[300px]"
              onError={(e) => {
                const errorMsg = "Failed to display image";
                setError(errorMsg);
                setImageUrl("");
                if (onFetchComplete) {
                  onFetchComplete(false, errorMsg);
                }
              }}
            />
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-500 rounded-lg">
              <div className="text-white">No image available</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImgFetching;
