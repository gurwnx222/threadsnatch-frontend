import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
const ImgFetching = ({input2}) => {

  const [closeModal, setCloseModal] = useState(false);

  const handleClose = () =>{
    setCloseModal(true);
  }

  // closes the model when Click on cross Button  <igone this mesage only of git hub change purposes..>
  if(closeModal){
    return null;
  }

  return (
    <>
      <div className="flex w-full max-w-md text-white bg-[#2C2C2E] h-[47px] mx-auto border rounded-full border-[#FFFFFF33]">
        <input
          type="text"
          value={input2}
          readOnly
          className="bg-transparent w-[85%] outline-none px-5"
        />

        <button onClick={handleClose} ><GoX size={35}  className="cursor-pointer" /></button>
      </div>

      {/* Image fetching section */}
      <div className="rounded-3xl border border-[#EBEBF5] bg-[#2C2C2E] max-w-md flex flex-col w-full p-3 mx-auto">
        <div className="flex m-4">
          <div className="flex flex-col ">
            <p>Ghibli Archives (@ghibliarchives) on Threads</p>
            <p className="text-[#FFFFFFCC]">Porco Rosso (1992)</p>
          </div>
          <button className="ml-2  h-12 bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 transition">
            <FiDownload className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6">
          <img
            src="sample_image.jpg"
            alt="Image Loading"
            className="rounded-lg "
          />
        </div>
      </div>
    </>
  );
};

export default ImgFetching;
