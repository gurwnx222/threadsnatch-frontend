import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";
import { Zap, Plug, Shield, Target } from "lucide-react";

const Home = () => {
  const apiLink =
    "https://rapidapi.com/threadertech/api/threadsnatch-api/playground/apiendpoint_02a7614b-8fcd-41cf-bc91-5de42d5dc5c9";

  return (
    <div className="font-montserrat h-auto w-auto">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center animate-moveBg sm:bg-cover"
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}
      ></div>
      <Navbar />
      {/* Main Content - First screen */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-white text-center px-6">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mt-10 lg:mt-36 w-full max-w-2xl">
          Snatch Every{" "}
          <span className="bg-[linear-gradient(94.89deg,#62CFF4_58.98%,#2C67F2_83.06%)] text-transparent bg-clip-text">
            Detail
          </span>
          <div>From Threads</div>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl mt-4 sm:mt-6 w-full max-w-2xl leading-relaxed">
          Instantly extract videos, images, and carousels{" "}
          <br className="hidden sm:block" />
          with our API—fueling your app with real-time{" "}
          <br className="hidden sm:block" />
          insights and a competitive edge.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center mt-10 sm:mt-16 gap-4 sm:gap-8">
          <a
            href={apiLink}
            target="__blank"
            className="bg-[linear-gradient(103.2deg,#4624C2_31.08%,#7F5BFF_92.12%)] hover:opacity-90 transition-all text-white py-3 px-6 rounded-xl text-lg"
          >
            Get API
          </a>
          <button className="bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl flex items-center gap-2 text-lg">
            <img src="/Vector.svg" alt="Docs Icon" className="w-5 h-5" /> Docs
          </button>
        </div>

        <div className="text-white relative top-10">&#123; scroll &#125;</div>
      </div>

      {/* Down page content - second */}
      <div className="relative min-h-screen flex flex-col justify-center items-center bg-white px-4 w-full">
        {/* Fetch Data */}
        <div className="flex flex-col items-center gap-4 mt-16 sm:mt-24 w-full max-w-4xl">
          <h2 className="font-medium text-2xl sm:text-3xl text-center">
            Elevate your digital narrative — effortlessly fetch carousel posts,
            videos, and images from Threads with our API and transform your user
            experience!
          </h2>

          {/* Updated carousel container */}
          <div className="w-full max-w-2xl px-4 sm:px-0">
            <Carousel
              baseWidth={670}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Rest of your component remains unchanged */}
      {/* Down page content - third */}
      {/* Background */}
      <div
        className="bg-cover bg-center animate-moveBg h-auto w-full"
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}
      ></div>

      {/* Content */}
      <div className="relative top-24 gap-3 min-h flex flex-col items-center text-white px-4 overflow-hidden">
        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          Empower Your Journey
        </h2>
        <p className="text-xl text-center">
          Explore the Features That Transform Ideas into Impact
        </p>
        {/* Feature Box */}
        {[
          {
            title: "Lightning Fast Performance",
            desc: "Extract all post links in seconds—experience rapid results that keep your workflow moving.",
            icon: Zap,
          },
          {
            title: "Effortless Integration",
            desc: "Simply paste a meta threads post link and start scraping—our API fits right into your existing setup with zero hassle.",
            icon: Plug,
          },
          {
            title: "Unmatched Reliability",
            desc: "Trust our high success rate to consistently deliver every desired link, so you never miss a beat.",
            icon: Shield,
          },
          {
            title: "Precision Accuracy",
            desc: "Capture every link with pinpoint accuracy, ensuring you always have complete and reliable data.",
            icon: Target,
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="w-auto lg:w-[51rem] h-auto m-3 p-5 flex flex-col gap-2 justify-center border-4 border-[#605e6337] 
        bg-[rgba(77,77,77,0.1)] rounded-lg transition-transform duration-300 
        hover:scale-[1.02] hover:-translate-y-1 hover:bg-[rgba(77,77,77,0.2)] hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <feature.icon size={24} className="text-white" />
              <h3 className="text-lg">{feature.title}</h3>
            </div>
            <p className="pl-4">{feature.desc}</p>
          </div>
        ))}

        {/* Footer */}
        <div className="w-[100vw]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
