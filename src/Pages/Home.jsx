import React, { useState, useEffect } from "react";
import Navbar from '../Components/Navbar'
import Carousel from "../Components/Carousel";


const Home = () => {

  return (
    <div className='font-montserrat h-auto'>
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center animate-moveBg" 
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}>
      </div>
        <Navbar />
        
        {/* Main Content - First screen */}
        <div className="relative flex flex-col items-center justify-center min-h-screen text-white">
          <div className='w-auto h-[54px] mt-36 text-3xl'>
              Snatch Every <span className='bg-[linear-gradient(94.89deg,#62CFF4_58.98%,#2C67F2_83.06%)] text-transparent bg-clip-text'>Detail</span> From Threads
          </div>
          
          <div className='text-2xl w-auto mt-6'>Instantly extract videos, images, and carousels <br /> with our  API— fueling your app with real-time <br /> insights and a competitive edge.</div>

          <div className='flex mt-20 gap-8'>
            <button className='bg-[linear-gradient(103.2deg,#4624C2_31.08%,#7F5BFF_92.12%)] hover:opacity-90 transition-all text-white py-2 px-4 rounded-xl'>Get API</button>
            <button className='bg-white hover:bg-gray-300 text-black py-2 px-4 rounded-xl flex gap-2'><img  src='/Vector.svg'/>  Docs</button>
          </div>


        </div>

      {/* Down page content - second */}
      <div className='relative min-h-screen flex flex-col justify-center items-center bg-white'>
        
        <div className='flex flex-col absolute top-10 gap-4 text-center'>
          <div className='font-medium text-2xl'>Seamless Integration</div>
          <div className='w-[500px] h-[300px] bg-[#D9D9D9] rounded-lg'></div>
        </div>

        <div className="flex flex-col items-center relative top-52 gap-4">
          <div className="font-medium text-2xl">Fetch Img</div>
          <div className="felx items-center justify-center w-[500px] h-[300px] rounded-lg">
            <Carousel />
          </div>
        </div>

      </div>

      {/* Down page content - third */}
      {/* BAckground */}
      <div 
        className="bg-cover bg-center animate-moveBg h-auto" 
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}>
      </div>

      {/* content */}
      <div className="relative top-24 gap-3 min-h flex flex-col items-center text-white">
        <div className="font-medium text-2xl">Empower Your Journey</div>
        <div className="text-xl">Explore the Features That Transform Ideas into Impact</div>

        {/* Box content */}
        <div className="w-3/5 h-auto border-2 border-dashed border-[rgba(151,71,255,1)]">
          <div className="w-[55rem] h-2/5 m-3 p-5 flex flex-col gap-2 justify-center border-4 border-[#605e6337] bg-[rgba(77,77,77,0.1)] rounded-lg transition-transform duration-300 hover:scale-80 hover:-translate-y-1 hover:bg-[rgba(77,77,77,0.2)] hover:shadow-lg">
            <div className="text-lg">Lightning Fast Performance</div>
            <div className="pl-4">Extract all post links in seconds—experience rapid results that keep your workflow moving.</div>
          </div>

          <div className="w-[55rem] h-2/5 m-3 p-5 flex flex-col gap-2 justify-center border-4 border-[#605e6337] bg-[rgba(77,77,77,0.1)] rounded-lg transition-transform duration-300 hover:scale-80 hover:-translate-y-1 hover:bg-[rgba(77,77,77,0.2)] hover:shadow-lg">
            <div className="text-lg">Effortless Integration</div>
            <div className="pl-4">Simply paste a meta threads post link and start scraping—our API fits right into your existing setup with zero hassle.</div>
          </div>

          <div className="w-[55rem] h-2/5 m-3 p-5 flex flex-col gap-2 justify-center border-4 border-[#605e6337] bg-[rgba(77,77,77,0.1)] rounded-lg transition-transform duration-300 hover:scale-80 hover:-translate-y-1 hover:bg-[rgba(77,77,77,0.2)] hover:shadow-lg">
            <div className="text-lg">Unmatched Reliability:</div>
            <div className="pl-4">Trust our high success rate to consistently deliver every desired link, so you never miss a beat.</div>
          </div>
          
          <div className="w-[55rem] h-2/5 m-3 p-5 flex flex-col  justify-center border-4 border-[#605e6337] bg-[rgba(77,77,77,0.1)] rounded-lg transition-transform duration-300 hover:scale-80 hover:-translate-y-1 hover:bg-[rgba(77,77,77,0.2)] hover:shadow-lg">
            <div className="text-lg">Precision Accuracy</div>
            <div className="pl-4">Capture every link with pinpoint accuracy, ensuring you always have complete and reliable data.</div>
          </div>
        </div>

      {/* Bottom */}
      <div
        className="relative w-full h-[300px] p-6 text-white rounded-tr-[150px] bg-gradient-to-b from-black to-[#2B2019] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold transition-translation duration-75 hover:text-gray-300"><a href="/">DOCS ↗</a></h2>
        <h2 className="text-3xl font-bold mt-4  hover:text-gray-300"><a href="/">ABOUT ↗</a></h2>
        <h2 className="text-3xl font-bold mt-4  hover:text-gray-300"><a href="/">T&C ↗</a></h2>
        <p className="absolute bottom-4 left-6 text-gray-400 text-sm">
          2025 © all rights reserved
        </p>
      </div>


      </div>


    </div>
  )
}

export default Home