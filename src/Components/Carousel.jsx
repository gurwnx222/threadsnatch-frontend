import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
// replace icons with your own if needed
import { FiVideo, FiFileText, FiLayers } from "react-icons/fi";
import fetchCrselVideo from "/fetch-crsel.mp4";
import fetchVidVideo from "/fetch-vid.mp4";
import fetchImgVideo from "/fetch-img.mp4";
const DEFAULT_ITEMS = [
  {
    title: "Fetch Image",
    description: "Get all The Related Details of Image in few secs.",
    id: 1,
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
    videoSrc: fetchImgVideo,
  },
  {
    title: "Fetch Video",
    description: "Get All the Video Details in and HD Download Link",
    id: 2,
    icon: <FiVideo className="h-[16px] w-[16px] text-white" />,
    videoSrc: fetchVidVideo,
  },
  {
    title: "Fetch Carousel",
    description: "Get All The Download Links Of Carousel.",
    id: 3,
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />,
    videoSrc: fetchCrselVideo,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  className = "",
}) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(baseWidth);
  const containerPadding = 16;
  const itemWidth = containerWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement.clientWidth;
        const newWidth = Math.min(parentWidth - 32, baseWidth); // 32px for parent padding
        setContainerWidth(newWidth);
      }
    };

    // Initial size calculation
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [baseWidth]);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone.
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  // Calculate aspect ratio for item height (16:9 for videos)
  const itemHeight = round ? itemWidth : Math.floor(itemWidth * 0.6);

  // Add extra height for pagination dots
  const containerHeight = round
    ? containerWidth
    : itemHeight + containerPadding * 2 + 28; // 28px for dots

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 mx-auto ${
        round
          ? "rounded-full border border-white"
          : "rounded-[24px] border border-[#222]"
      } ${className}`}
      style={{
        width: `${containerWidth}px`,
        maxWidth: "100%",
        height: `${containerHeight}px`,
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${
                round
                  ? "items-center justify-center text-center order-0"
                  : "items-start justify-between border border-[#222] rounded-[12px]"
              } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : itemHeight,
                rotateY: rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              {/* Video Background */}
              {item.videoSrc && (
                <div className="absolute inset-0 w-full h-full">
                  <video
                    src={item.videoSrc}
                    className="object-cover w-full h-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Semi-transparent overlay for better text visibility */}
                  <div className="absolute inset-0 bg-black bg-opacity-25" />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
                  <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060606]">
                    {item.icon}
                  </span>
                </div>
                <div className="p-5 mt-auto">
                  <div className="mt-5 md:mb-1 font-black text-lg text-white">
                    {item.title}
                  </div>
                  <p className="hidden md:block md:text-sm md:text-white">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Dots */}
      <div
        className={`flex w-full justify-center mt-4 ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="flex justify-center space-x-2 px-4">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                  ? "bg-[#555]"
                  : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
