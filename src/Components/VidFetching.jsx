import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
import axios from "axios";

const VidFetching = ({ input2 }) => {
  //rapid api credentials and threads url
  /*const RAPIDAPI_HOST = 'threadsnatch-api.p.rapidapi.com';
     const RAPIDAPI_KEY  = '8fb18cbf20msh216a409ae60b527p127585jsn3753b79679e9';
     */
  const [videoUrl, setVideoUrl] = useState("");
  const [videoAuthor, setVideoAuthor] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const url = import.meta.env.RAPID_API_ENDPOINT_VIDEO;
  const params = {
    q: "https://www.threads.net/@xtraai7/post/DIhLAPGoHjW?xmt=AQGzw8TOGPDHdqfEiv9J3PVu2rhbh3A2-sSPAB0LwTzRMQ",
  };
  const headers = {
    "x-rapidapi-key": import.meta.env.X_RAPID_API_KEY,
    "x-rapidapi-host": import.meta.env.X_RAPID_API_HOST,
  };
  useEffect(() => {
    if (!input2) return undefined;
    axios
      .get(url, { params, headers })
      .then((response) => {
        const videoDescription =
          response?.data?.data?.postData?.postDescription;
        const videoAuthor = response?.data?.data?.postData?.postTitle;

        if (videoDescription && videoAuthor) {
          setVideoAuthor(videoAuthor);
          setVideoDescription(videoDescription);

          return axios.get(
            "https://9eb67802-ba40-410d-a837-7440fbf92fb2-00-sgsg6z9l1bwr.sisko.replit.dev/proxy-video",
            {
              params: { q: input2 },
              responseType: "blob",
            }
          );
        } else {
          throw new Error("Failed to retrieve video metadata");
        }
      })
      .then((response) => {
        const objectUrl = URL.createObjectURL(response.data);
        setVideoUrl(objectUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
        setIsLoading(false);
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
            <p className="text-[#FFFFFFCC]">{videoDescription}</p>
          </div>
          <button className="ml-2  h-12 bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 transition">
            <FiDownload className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6">
          <video
            key={videoUrl}
            className="w-full h-auto"
            controls
            src={videoUrl}
          ></video>
        </div>
      </div>
    </>
  );
};

export default VidFetching;
