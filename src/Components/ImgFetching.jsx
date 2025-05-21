import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
import axios from "axios";

const ImgFetching = ({ input2 }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = import.meta.env.RAPID_API_ENDPOINT;
  const params = {
    q: input2,
  };
  const headers = {
    "x-rapidapi-key": import.meta.env.X_RAPID_API_KEY,
    "x-rapidapi-host": import.meta.env.X_RAPID_API_HOST,
  };

  useEffect(() => {
    if (!input2) return;

    // Reset states when attempting a new fetch
    setError(null);
    setIsLoading(true);

    axios
      .get(url, { params, headers })
      .then((response) => {
        const imageDescription =
          response?.data?.data?.postData?.postDescription;
        const imageAuthor = response?.data?.data?.postData?.postTitle;

        if (imageDescription && imageAuthor) {
          setImageAuthor(imageAuthor);
          setImageDescription(imageDescription);

          return axios.get(
            "https://9eb67802-ba40-410d-a837-7440fbf92fb2-00-sgsg6z9l1bwr.sisko.replit.dev/proxy-image",
            {
              params: { q: input2 },
              responseType: "blob",
            }
          );
        } else {
          throw new Error("Failed to retrieve image metadata");
        }
      })
      .then((response) => {
        const objectUrl = URL.createObjectURL(response.data);
        setImageUrl(objectUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setError(
          error.message || "Failed to load image. Please try again later."
        );
        setIsLoading(false);
      });

    // Cleanup function to revoke object URL when component unmounts
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [input2]);

  const handleClose = () => {
    setShowModal(false);
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
          className="bg-transparent w-[85%] outline-none px-5"
        />
        <button onClick={handleClose}>
          <GoX size={35} className="cursor-pointer" />
        </button>
      </div>

      {/* Image fetching section */}
      <div className="rounded-3xl border border-[#EBEBF5] bg-[#2C2C2E] max-w-md flex flex-col w-full p-3 mx-auto">
        <div className="flex m-4">
          <div className="flex flex-col">
            <p>{imageAuthor}</p>
            <p className="text-[#FFFFFFCC]">{imageDescription}</p>
          </div>
          {imageUrl && (
            <button className="ml-2 h-12 bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 transition">
              <FiDownload className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="px-6 relative">
          {isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-white">Loading image...</div>
            </div>
          ) : error ? (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-red-400 text-center px-4">
                <p className="font-medium text-lg mb-2">
                  Image could not be loaded
                </p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-2">
                  Please check your internet connection and try again
                </p>
              </div>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Thread content"
              className="w-full md:h-full object-contain shadow-custom rounded-lg h-[300px]"
              onError={(e) => {
                setError("Failed to display image");
                setImageUrl("");
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
