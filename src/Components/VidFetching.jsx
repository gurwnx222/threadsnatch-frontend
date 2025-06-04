import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
import axios from "axios";

const VidFetching = ({ input2 }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoAuthor, setVideoAuthor] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const url = import.meta.env.VITE_RAPID_API_ENDPOINT_VIDEO;
  const params = {
    q: input2,
  };
  const headers = {
    "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
    "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
  };

  useEffect(() => {
    if (!input2) return undefined;

    // Reset state and hide modal when new URL is being processed
    setIsLoading(true);
    setShowModal(false);
    setVideoUrl("");
    setVideoAuthor("");
    setVideoDescription("");

    axios
      .get(url, { params, headers })
      .then((response) => {
        const videoDescription = response?.data?.metaTags?.postDescription;
        const videoAuthor = response?.data?.metaTags?.postTitle;
        const proxyVideoUrl = response?.data?.data?.videoUrlURIEncoded;
        console.log("Response from API:", response?.data);

        if (videoDescription && videoAuthor) {
          setVideoAuthor(videoAuthor);
          setVideoDescription(videoDescription);

          return axios.get(
            "https://ur5cbwcl5e.execute-api.us-east-1.amazonaws.com/proxy-video",
            {
              params: { q: proxyVideoUrl },
              responseType: "json",
            }
          );
        } else {
          throw new Error("Failed to retrieve video metadata");
        }
      })
      .then((response) => {
        const objectUrl = response?.data?.videoUrl;
        console.log("Object URL created:", objectUrl);
        setVideoUrl(objectUrl);
        setIsLoading(false);
        // Show modal only after data is completely loaded
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
        setIsLoading(false);
        // Optionally show modal even on error, or handle error state differently
        setShowModal(true);
      });

    // Cleanup function to revoke object URL when component unmounts
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
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

      {/* video fetching section */}
      <div className="rounded-3xl border border-[#EBEBF5] bg-[#2C2C2E] max-w-md flex flex-col w-full p-3 mx-auto">
        <div className="flex m-4">
          <div className="flex flex-col ">
            <p>{videoAuthor}</p>
            <p className="text-[#EBEBF5CC]">{videoDescription}</p>
          </div>
          <a
            href={videoUrl}
            className="ml-2  h-12 bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 transition"
            target="_blank"
            rel="noopener noreferrer"
            download="threadsnatch_video_saved.mp4"
          >
            <FiDownload className="w-5 h-5" />
          </a>
        </div>

        <div className="px-6">
          <video
            key={videoUrl}
            className="w-full h-auto rounded-3xl"
            controls
            src={videoUrl}
          ></video>
        </div>
      </div>
    </>
  );
};

export default VidFetching;
