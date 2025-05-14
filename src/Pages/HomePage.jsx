import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { FaLink } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { CgCircleci } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


import Footer from "../Components/Footer";

const contentSlides = [
  {
    icon: <AiFillThunderbolt className="inline-block text-blue-500 mr-2" />,
    title: "Lightning-Fast Performance",
    description:
      "4-Second Scraping (Slower Than Your Morning Coffee Sip) Outpace competitors stuck waiting on rate-limited APIs.",
  },
  {
    icon: <CgCircleci className="inline-block text-blue-500 mr-2" />,
    title: "Precision Accuracy",
    description:
      "Every. Single. Link. Scraped with high precision so when you Miss data? We’ll scrape it again",
  },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = contentSlides.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
const prevSlide = () =>
  setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);


  return (
    <div className="font-montserrat relative min-h-screen w-full overflow-x-hidden">
      {/* Background Image - moved to a lower z-index */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center animate-moveBg sm:bg-cover z-0"
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}
      ></div>

      {/* Navbar - highest z-index */}
      <header className="relative z-50 w-full">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="text-center text-white flex flex-col relative z-10 mx-auto mt-40 max-w-2xl">
        <h1 className="font-bold text-2xl tracking-wide text-left ml-5">
          Developers & Marketers
          <br /> Tired of Meta Threads Data Blackouts?
        </h1>
        <div className="w-9 h-9 bg-white text-black text-4xl mt-10 mx-auto">
          +
        </div>
        <h1 className="font-bold mt-10 text-2xl tracking-wide text-right ml-12 mr-5">
          Our API Scrapes Threads and Downloads Carousels,Images & Videos
        </h1>

        <p className="text-sm text-[#F5F5F5] mt-14">
          Finally, a ‘Set-and-Forget’ Scraper + Downloader for Teams Who Want
          100% Meta Threads Data & Never Waste Time Reverse-Engineering APIs
          Again
        </p>

        {/* APi BButton */}
        <button className="w-60 h-10 rounded-2xl mt-20 bg-gradient-to-r from-[#4624C2] to-[#7F5BFF] mx-auto">
          Get API
        </button>

        {/* Animated scroll indicator */}
        <div className="flex flex-col items-center text-white relative top-10 animate-pulse">
          <span className="text-sm mb-2">&#123; scroll &#125;</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </section>

      {/* Down page 2 */}
      <section className="relative bg-[#1D1D1D] w-full px-6 mt-28 py-20 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            See It Live: Download Any Meta Threads Post in Seconds
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-20">
            Test our live tools: Extract carousels, videos & images—see how fast
            it works.
          </p>

          {/* box-1carousel saver */}
          <div className="flex flex-row justify-center items-center text-2xl border rounded-xl lg:mx-20 py-16 ">
            <img src="/1000111462 1.svg" />
            <h2>Carousel Saver</h2>
          </div>

          <p className=" lg:text-center text-justify mt-5">
            1-Click Carousel PostDownload entire carousels—preserve slide order,
            captions, and CTAs
          </p>

          {/* Link for carousel saver */}
          <a
            href="/image"
            className="flex items-center mt-2  cursor-pointer lg:ml-24"
          >
            <FaLink />
            <h3 className="font-semibold">Go to Carousel Saver</h3>
          </a>

          {/* box-2 video saver */}
          <div className="flex flex-row justify-center items-center mt-20 text-2xl border rounded-xl lg:mx-20 py-16 ">
            <img src="/1000111462 1.svg" />
            <h2>Video Saver</h2>
          </div>

          <p className=" lg:text-center text-justify mt-5">
            Bulk Download Threads Videos in 4 Seconds. Grab HD videos in their
            original quality.
          </p>

          {/* Link for Video saver */}
          <a
            href="/image"
            className="flex items-center mt-2  cursor-pointer lg:ml-24"
          >
            <FaLink />
            <h3 className="font-semibold">Go to Video Saver</h3>
          </a>

          {/* box-3 image saver */}
          <div className="flex flex-row justify-center items-center mt-20 text-2xl border rounded-xl lg:mx-20 py-16 ">
            <img src="/1000111462 1.svg" />
            <h2>Image Saver</h2>
          </div>

          <p className=" lg:text-center text-justify mt-5">
            Get Threads Images in a 4 Seconds. Grab HD images in their original
            quality.
          </p>

          {/* Link for carousel saver */}
          <a
            href="/image"
            className="flex items-center mt-2  cursor-pointer lg:ml-24"
          >
            <FaLink />
            <h3 className="font-semibold">Go to Image Saver</h3>
          </a>
        </div>
      </section>

      {/* Down page 3 */}
      <section className="relative bg-[#F5F5F5] w-full px-6  py-20 text-black -mt-2">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col gap-2 lg:text-center text-left">
            <h1 className="text-5xl font-bold">9+</h1>
            <p className="text-lg">API Subscibers</p>
          </div>

          <div className="flex flex-col gap-2 mt-20 lg:text-center text-left">
            <h1 className="text-5xl font-bold">270+</h1>
            <p className="text-lg">Website Users in 3 weeks</p>
          </div>

          <div className="flex flex-col gap-2 mt-20 lg:text-center text-left">
            <h1 className="text-5xl font-bold">100%</h1>
            <p className="text-lg">Website User Experience </p>
          </div>

          <h2 className="text-2xl font-semibold mt-32 text-left">
            How We Guarantee 100% Threads Data (While Others Get Blocked)
          </h2>
          <p className="text-left mt-2">
            Speed, Accuracy & 99.99% Uptime Here’s How -
          </p>

          {/* carousel post */}
          <div className="bg-[#E6E3E0] flex flex-col justify-center text-left rounded-2xl py-6 px-8 gap-3 mt-10">
            <div className="text-4xl">{contentSlides[currentSlide].icon}</div>

            <h2 className="text-3xl font-medium">
              {contentSlides[currentSlide].title}
            </h2>
            <p>{contentSlides[currentSlide].description}</p>
            <span className="flex flex-row text-center relative lg:-top-16 -top-24">
              <button
                onClick={prevSlide}
                className="bg-[#7F5BFF] w-fit relative right-14  text-white p-2 rounded-full hover:bg-gray-700"
              >
                <IoIosArrowBack size={40} />
              </button>
              <button
                onClick={nextSlide}
                className="relative bg-[#7F5BFF] w-fit lg:left-[92%]  left-56   text-white p-2 rounded-full hover:bg-gray-700"
              >
                <IoIosArrowForward size={40} />
              </button>
            </span>
          </div>
        </div>

        
      </section>
      
        <div className="m-0 p-0 w-full bg-white ">
          <Footer />
        </div>
      
    </div>
  );
};

export default HomePage;
