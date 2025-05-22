import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";
import { Zap, Plug, Shield, Target, Plus, Download } from "lucide-react";
import Pricing from "../Components/Pricing";
import { API_LINK, Docs_LINK } from "../utils/contants";
import ThreeDCardDemo from "../Components/3d-card-demo";

const Home = () => {
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

      {/* Content wrapper - starts after navbar */}
      <main className="relative z-10 w-full" id="home">
        {/* Hero Section - Redesigned according to screenshot */}
        <section className="flex flex-col items-center justify-center min-h-screen text-white px-4 md:px-8 pt-16">
          {/* Main headline container */}
          <div className="flex flex-col md:flex-row sm:items-center sm:justify-center w-full max-w-4xl mt-12 md:mt-20">
            {/* First headline */}
            <div className="font-montserrat font-bold text-2xl md:text-3xl md:text-left  lg:text-4xl text-center md:w-5/12">
              Developers & Marketers Tired of Meta Threads Data Blackouts?
            </div>

            {/* Plus icon - centered between headlines */}
            <div className="flex items-center justify-center m-10 md:mx-20 md:my-20 md:my-0">
              <div className="bg-white rounded-lg p-2">
                <Plus size={18} className="text-blue-600" />
              </div>
            </div>

            {/* Second headline */}
            <div className="font-montserrat font-bold text-2xl md:text-3xl lg:text-4xl text-center md:text-right md:w-5/12">
              Our API Scrapes Threads and Downloads Carousels, Images & Videos
            </div>
          </div>

          {/* Subheadline - positioned on left with proper margin */}
          <div className="mt-8 md:mt-12 w-full max-w-4xl px-4 md:px-8">
            <p className="text-base md:text-lg leading-relaxed text-left md:ml-8">
              Finally, a 'Set-and-Forget' Scraper + Downloader for Teams Who
              Want 100% Meta Threads Data & Never Waste Time Reverse-Engineering
              APIs Again
            </p>
          </div>

          {/* CTA Button - Centered with proper gradient */}
          <div className="flex justify-center w-full mt-8 md:mt-12">
            <a
              href={API_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[260px] h-[55px] flex items-center justify-center
                bg-gradient-to-r from-[#4624C2] via-[#6642E0] to-[#7F5BFF] text-white font-medium text-lg rounded-[10px]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_3px_1px_15px_rgba(255,255,255,0.5),inset_0px_-3px_10px_rgba(0,0,0,0.37)]
                hover:opacity-90 transition-all"
            >
              Get API
            </a>
          </div>

          {/* Animated scroll indicator */}
          <div className="flex flex-col items-center text-white mt-16 md:mt-16 animate-pulse">
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

        {/* Product Section */}
        <section
          id="product-section"
          className="relative z-10 w-full py-16 md:py-24 px-4 md:px-8 rounded-t-3xl"
          style={{ backgroundColor: "#1D1D1D" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="text-white space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  See It Live: Download Any Meta Threads Post in Seconds
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Test our live tools: Extract carousels, videos & images—see
                  how fast it works.
                </p>
              </div>

              {/* Right Side - Multiple Cards */}
              <div className="space-y-8">
                <ThreeDCardDemo
                  title="Carousel Saver"
                  description="1-Click Carousel Post Download entire carousels—preserve slide order, captions, and CTAs"
                  imageSrc="/carousel-page-for-product-section.png"
                  imageAlt="Carousel Saver Tool"
                  ctaText="Go to Carousel Saver"
                />
                <ThreeDCardDemo
                  title="Video Saver"
                  description="Bulk Download Threads Videos in 4 Seconds. Grab HD videos in their 
original quality."
                  imageSrc="/video-page-for-product-section.png"
                  imageAlt="Video Downloader Tool"
                  ctaText="Go to Video Saver"
                />
                <ThreeDCardDemo
                  title="Image Extractor"
                  description="Get Threads Images in a 4 Seconds. Grab HD images in their 
original quality."
                  imageSrc="/image-page-for-product-section.png"
                  imageAlt="Image Extractor Tool"
                  ctaText="Go to Image Saver"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Third section - features */}
        <section
          className="relative z-10 w-full bg-cover bg-center py-24 px-4"
          style={{ backgroundImage: "url('/BG-img1.jpg')" }}
        >
          {/* Added Section - Pricing */}
          <div className="text-white font-montserrat flex items-center justify-center text-3xl leading-snug font-medium">
            Supercharge Your Projects: <br /> Unlock the Ultimate Meta Threads
            API Plan Today!
          </div>
          <Pricing />

          <div className="flex flex-col items-center gap-3 text-white">
            <h2 className="font-medium text-2xl sm:text-3xl text-center">
              Empower Your Journey
            </h2>
            <p className="text-xl text-center">
              Explore the Features That Transform Ideas into Impact
            </p>

            {/* Feature Boxes */}
            <div className="w-full max-w-4xl mx-auto">
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
                  className="w-full lg:w-[51rem] h-auto m-3 p-5 flex flex-col gap-2 justify-center border-4 border-[#605e6337] 
                  bg-[rgba(77,77,77,0.1)] rounded-lg transition-transform duration-300 
                  hover:scale-[1.02] hover:-translate-y-1 hover:bg-[rgba(77,77,77,0.2)] hover:shadow-lg mx-auto"
                >
                  <div className="flex items-center gap-3">
                    <feature.icon size={24} className="text-white" />
                    <h3 className="text-lg">{feature.title}</h3>
                  </div>
                  <p className="pl-4">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
