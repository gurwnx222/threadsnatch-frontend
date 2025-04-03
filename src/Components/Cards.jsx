import React from 'react';

const PhilosophyCard = ({name, description}) => {
  return (
    <div className="relative text-white max-w-md overflow-hidden font-montserrat top-28 mb-8">
      {/* Title Bar */}
      <div className="rounded-t-xl px-5 py-3 bg-gradient-to-b from-[#000000] to-[#2B2019]">
        <h2 className="text-lg font-semibold text-white text-center tracking-wide">
          {name}
        </h2>
      </div>
        {/* Divider */}
        <div className=" border-gray-700 my-2"></div>
      {/* Content */}
      <div className="bg-[#1E1E1E] px-10 p-4 text-gray-300 text-base leading-relaxed rounded-b-xl bg-gradient-to-b from-[#000000] to-[#2B2019]">
        <p>
          {description} 
        </p>
      </div>
    </div>
  );
};

export default PhilosophyCard;
