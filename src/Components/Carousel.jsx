import React, { useState, useEffect } from "react";

const slides = ["Slide 1", "Slide 2", "Slide 3"];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Slide */}
      <div className="h-64 flex items-center justify-center text-2xl font-bold text-white bg-gray-300 rounded-lg transition-all duration-700">
        {slides[currentIndex]}
      </div>

      {/* Controls */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
