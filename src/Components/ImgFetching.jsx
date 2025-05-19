import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
import axios from "axios";
const ImgFetching = ({ input2 }) => {
  console.log("Input two from ImgFetching component:", input2);

  //rapid api credentials and threads url
  /*const RAPIDAPI_HOST = 'threadsnatch-api.p.rapidapi.com';
   const RAPIDAPI_KEY  = '8fb18cbf20msh216a409ae60b527p127585jsn3753b79679e9';
   const threadsUrl    = 'https://www.threads.com/@julianaihacker/post/DJg5Afbs4CZ?xmt=AQF0ymFSALsI-5O6x8QcMa-C_Ob07JkDapTZl4hz92gyJQ'; */

  const [imageUrl, setImageUrl] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const handleClose = () => {
    setCloseModal(true);
  };

  // closes the model when Click on cross Button  <igone this mesage only of git hub change purpose.>
  if (closeModal) {
    return null;
  }

  useEffect(() => {
    if (!input2) return undefined;
    axios
      .get(
        "https://9eb67802-ba40-410d-a837-7440fbf92fb2-00-sgsg6z9l1bwr.sisko.replit.dev/proxy-image",
        {
          params: { q: input2 },
          responseType: "blob", // :contentReference[oaicite:9]{index=9}
        }
      )
      .then((response) => {
        const objectUrl = URL.createObjectURL(response.data);
        setImageUrl(objectUrl);
      })
      .catch(console.error);
  }, [input2]);
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
          <div className="flex flex-col ">
            <p>{imageAuthor}</p>
            <p className="text-[#FFFFFFCC]">{imageDescription}</p>
          </div>
          <button className="ml-2  h-12 bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 transition">
            <FiDownload className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6">
          <img
            src={imageUrl}
            className="w-full md:h-full object-contain shadow-custom rounded-lg h-[300px]"
          />
        </div>
      </div>
    </>
  );
};

export default ImgFetching;
