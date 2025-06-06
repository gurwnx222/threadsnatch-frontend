import React, { useState, useEffect, useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { GoX } from "react-icons/go";
import axios from "axios";

// Configuration constants
const CONFIG = {
  PROXY_BASE_URL: import.meta.env.VITE_PROXY_CAROUSEL_ENDPOINT,
  CAROUSEL_API_URL: import.meta.env.VITE_RAPID_API_ENDPOINT_CAROUSEL,
  REQUEST_TIMEOUT: 30000,
  MAX_CONCURRENT_LOADS: 3,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_DURATION: 10 * 60 * 1000, //60 min in milliseconds
};

// In-memory cache for images with timestamp-based expiration
class ImageCache {
  constructor() {
    this.cache = new Map();
    this.blobCache = new Map();
  }

  // Generate cache key from URL
  getCacheKey(url) {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, "");
  }

  // Check if cache entry is still valid
  isValid(timestamp) {
    return Date.now() - timestamp < CONFIG.CACHE_DURATION;
  }

  // Get cached image data
  get(url) {
    const key = this.getCacheKey(url);
    const entry = this.cache.get(key);

    if (entry && this.isValid(entry.timestamp)) {
      //  console.log(`Cache hit for: ${url}`);
      return entry.data;
    }

    if (entry) {
      // Cache expired, remove it
      this.remove(url);
    }

    return null;
  }

  // Store image data in cache
  set(url, data) {
    const key = this.getCacheKey(url);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      url,
    });
    // console.log(`Cached image: ${url}`);
  }

  // Get cached blob URL
  getBlobUrl(url) {
    const key = this.getCacheKey(url);
    const entry = this.blobCache.get(key);

    if (entry && this.isValid(entry.timestamp)) {
      console.log(`Blob cache hit for: ${url}`);
      return entry.blobUrl;
    }

    if (entry) {
      // Revoke old blob URL and remove from cache
      URL.revokeObjectURL(entry.blobUrl);
      this.blobCache.delete(key);
    }

    return null;
  }

  // Store blob URL in cache
  setBlobUrl(url, blobUrl) {
    const key = this.getCacheKey(url);
    this.blobCache.set(key, {
      blobUrl,
      timestamp: Date.now(),
      url,
    });
    // console.log(`Cached blob URL: ${url}`);
  }

  // Remove from cache
  remove(url) {
    const key = this.getCacheKey(url);
    this.cache.delete(key);

    const blobEntry = this.blobCache.get(key);
    if (blobEntry) {
      URL.revokeObjectURL(blobEntry.blobUrl);
      this.blobCache.delete(key);
    }
  }

  // Clear expired entries
  clearExpired() {
    const now = Date.now();

    // Clear regular cache
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= CONFIG.CACHE_DURATION) {
        this.cache.delete(key);
      }
    }

    // Clear blob cache
    for (const [key, entry] of this.blobCache.entries()) {
      if (now - entry.timestamp >= CONFIG.CACHE_DURATION) {
        URL.revokeObjectURL(entry.blobUrl);
        this.blobCache.delete(key);
      }
    }
  }

  // Get cache stats
  getStats() {
    return {
      cacheSize: this.cache.size,
      blobCacheSize: this.blobCache.size,
      cacheEntries: Array.from(this.cache.values()).map((entry) => ({
        url: entry.url,
        age: Date.now() - entry.timestamp,
        valid: this.isValid(entry.timestamp),
      })),
    };
  }
}

// Global cache instance
const imageCache = new ImageCache();

// Clean up expired cache entries every 10 minutes
setInterval(() => {
  imageCache.clearExpired();
}, 10 * 60 * 1000);

// Headers for rapid api
const headers = {
  "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
  "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
};

// Enhanced utility functions
const createProxyUrl = (originalUrl) => {
  if (!originalUrl || typeof originalUrl !== "string") {
    //  console.error("Invalid URL provided to createProxyUrl:", originalUrl);
    return `Invalid URL provided to createProxyUrl: ${originalUrl}`;
  }

  let cleanUrl = originalUrl.trim();

  const indexPrefixMatch = cleanUrl.match(/^\d+:\s*/);
  if (indexPrefixMatch) {
    cleanUrl = cleanUrl.substring(indexPrefixMatch[0].length);
  }

  if (cleanUrl.startsWith("/proxy/image")) {
    return cleanUrl.startsWith("http")
      ? cleanUrl
      : `${CONFIG.PROXY_BASE_URL}${cleanUrl}`;
  }

  try {
    new URL(cleanUrl);
  } catch (error) {
    console.error("Invalid URL format:", cleanUrl, error);
    return null;
  }

  const encodedUrl = encodeURIComponent(cleanUrl);
  return `${CONFIG.PROXY_BASE_URL}?url=${encodedUrl}`;
};

// Enhanced image loading with cache support
const loadImageWithCache = async (src, retries = CONFIG.RETRY_ATTEMPTS) => {
  // Check cache first
  const cachedBlobUrl = imageCache.getBlobUrl(src);
  if (cachedBlobUrl) {
    return cachedBlobUrl;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";

    img.onload = async () => {
      try {
        // Convert to blob and cache it
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const blobUrl = URL.createObjectURL(blob);
              imageCache.setBlobUrl(src, blobUrl);
              //    console.log(`Successfully loaded and cached: ${src}`);
              resolve(blobUrl);
            } else {
              resolve(src); // Fallback to original URL
            }
          },
          "image/jpeg",
          0.9
        );
      } catch (error) {
        console.warn(`Failed to cache image ${src}:`, error);
        resolve(src); // Fallback to original URL
      }
    };

    img.onerror = (error) => {
      console.warn(`Failed to load ${src}, retries left: ${retries - 1}`);

      if (retries > 1) {
        setTimeout(() => {
          loadImageWithCache(src, retries - 1)
            .then(resolve)
            .catch(reject);
        }, CONFIG.RETRY_DELAY * (CONFIG.RETRY_ATTEMPTS - retries + 1));
      } else {
        reject(
          new Error(
            `Failed to load image after ${CONFIG.RETRY_ATTEMPTS} attempts: ${src}`
          )
        );
      }
    };

    img.src = src;
  });
};

// Batch image loader with caching
const loadImagesInBatches = async (imageUrls) => {
  const results = [];
  const failures = [];

  for (let i = 0; i < imageUrls.length; i += CONFIG.MAX_CONCURRENT_LOADS) {
    const batch = imageUrls.slice(i, i + CONFIG.MAX_CONCURRENT_LOADS);

    const batchPromises = batch.map(async (url, index) => {
      try {
        const cachedUrl = await loadImageWithCache(url);
        return { success: true, url, cachedUrl, index: i + index };
      } catch (error) {
        console.error(`Batch load failed for ${url}:`, error);
        return { success: false, url, index: i + index, error };
      }
    });

    const batchResults = await Promise.allSettled(batchPromises);

    batchResults.forEach((result) => {
      if (result.status === "fulfilled") {
        if (result.value.success) {
          results.push(result.value);
        } else {
          failures.push(result.value);
        }
      }
    });

    // Small delay between batches
    if (i + CONFIG.MAX_CONCURRENT_LOADS < imageUrls.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  return { results, failures };
};

const downloadImage = async (imageUrl, filename = "threadsnatch.online_") => {
  try {
    // Check if we have a cached blob URL
    const cachedBlobUrl = imageCache.getBlobUrl(imageUrl);
    let downloadUrl = cachedBlobUrl || imageUrl;

    const response = await fetch(downloadUrl, {
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};

const CrselFetching = ({ input2 }) => {
  // State management
  const [showModal, setShowModal] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [cachedImageUrls, setCachedImageUrls] = useState({}); // Store cached URLs
  const [carouselData, setCarouselData] = useState({
    author: "",
    description: "",
  });

  // Fetch carousel data with enhanced caching
  const fetchCarouselData = useCallback(async () => {
    if (!input2) return;

    setLoading(true);
    setError(null);
    setImageLoadStates({});
    setCachedImageUrls({});

    try {
      console.log("Fetching carousel data for:", input2);

      const response = await axios.get(CONFIG.CAROUSEL_API_URL, {
        headers,
        params: { q: input2 },
        timeout: CONFIG.REQUEST_TIMEOUT,
      });

      const { data } = response;
      console.log("Carousel API response received");

      const crselDescription =
        data?.metaTags?.postDescription || "Carousel Description Not Found!!";
      const crselAuthor =
        data?.metaTags?.postTitle || "Carousel Author Not Found !!";

      if (
        !data ||
        !data.encodedURICrsel ||
        !Array.isArray(data.encodedURICrsel)
      ) {
        throw new Error("Invalid response structure: missing images array");
      }

      setCarouselData({
        author: crselAuthor,
        description: crselDescription,
      });

      const processedImages = data.encodedURICrsel
        .map((imageUrl, index) => {
          const proxyUrl = createProxyUrl(imageUrl);
          if (!proxyUrl) {
            console.warn(
              `Failed to create proxy URL for image ${index}:`,
              imageUrl
            );
            return null;
          }

          return {
            id: `image-${index}`,
            title: crselAuthor || "Image",
            subtitle: `${crselDescription || "Image"} ${index + 1}/${
              data.encodedURICrsel.length
            }`,
            originalUrl: imageUrl,
            proxyUrl: proxyUrl,
          };
        })
        .filter(Boolean);

      if (processedImages.length === 0) {
        throw new Error("No valid images found after processing");
      }

      console.log(`Processing ${processedImages.length} images...`);

      // Initialize image load states
      const initialLoadStates = {};
      processedImages.forEach((img, index) => {
        initialLoadStates[index] = {
          loaded: false,
          error: false,
          loading: true,
        };
      });
      setImageLoadStates(initialLoadStates);

      setImages(processedImages);
      setCurrentImageIndex(0);

      // Load and cache images
      const imageUrls = processedImages.map((img) => img.proxyUrl);
      loadImagesInBatches(imageUrls).then(({ results, failures }) => {
        // console.log(`Loaded and cached ${results.length} images successfully`);
        if (failures.length > 0) {
          console.warn(`Failed to load ${failures.length} images:`, failures);
        }

        // Update cached URLs
        const newCachedUrls = {};
        results.forEach(({ index, cachedUrl }) => {
          newCachedUrls[index] = cachedUrl;
        });
        setCachedImageUrls(newCachedUrls);

        // Update load states
        setImageLoadStates((prev) => {
          const updated = { ...prev };
          results.forEach(({ index }) => {
            updated[index] = { loaded: true, error: false, loading: false };
          });
          failures.forEach(({ index }) => {
            updated[index] = { loaded: false, error: true, loading: false };
          });
          return updated;
        });
      });
    } catch (error) {
      console.error("Error fetching carousel data:", error);
      setError(error.message || "Failed to fetch carousel data");
    } finally {
      setLoading(false);
    }
  }, [input2]);

  // Effect to fetch data when input changes
  useEffect(() => {
    fetchCarouselData();
  }, [fetchCarouselData]);

  // Navigation handlers
  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const handleImageSelect = useCallback(
    (index) => {
      if (index >= 0 && index < images.length) {
        setCurrentImageIndex(index);
      }
    },
    [images.length]
  );

  // Enhanced download handler with cache support
  const handleDownload = useCallback(async () => {
    if (!images[currentImageIndex]) return;

    try {
      const currentImage = images[currentImageIndex];
      const filename = `${"threadsnatch.online_image"}-${
        currentImageIndex + 1
      }.jpg`;

      // Use cached URL if available, otherwise use proxy URL
      const downloadUrl =
        cachedImageUrls[currentImageIndex] || currentImage.proxyUrl;
      await downloadImage(downloadUrl, filename);
    } catch (error) {
      console.error("Download failed:", error);
      setError(`Download failed: ${error.message}`);
    }
  }, [images, currentImageIndex, carouselData.author, cachedImageUrls]);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  // Handle individual image load errors
  const handleImageError = useCallback((index) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [index]: { loaded: false, error: true, loading: false },
    }));
  }, []);

  const handleImageLoad = useCallback((index) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [index]: { loaded: true, error: false, loading: false },
    }));
  }, []);

  // Render conditions
  if (!showModal) return null;

  const currentImage = images[currentImageIndex];
  const currentImageState = imageLoadStates[currentImageIndex] || {
    loaded: false,
    error: false,
    loading: true,
  };

  // Get the display URL (cached if available, otherwise proxy URL)
  const displayUrl = currentImage
    ? cachedImageUrls[currentImageIndex] || currentImage.proxyUrl
    : "";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header with input and close button */}
      <div className="flex items-center text-white bg-[#2C2C2E] h-[47px] border rounded-full border-[#FFFFFF33]">
        <input
          type="text"
          value={input2 || ""}
          readOnly
          className="bg-transparent flex-1 outline-none px-5 text-sm"
          placeholder="Loading..."
        />
        <button
          onClick={handleClose}
          className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
          aria-label="Close carousel"
        >
          <GoX size={24} />
        </button>
      </div>

      {/* Content area */}
      <div className="rounded-3xl border border-[#EBEBF5] bg-[#2C2C2E] flex flex-col p-3 mt-4">
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading carousel...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-400 text-center">
              <p className="mb-4">Error loading carousel</p>
              <p className="text-sm text-gray-400">{error}</p>
              <button
                onClick={fetchCarouselData}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Success state - show carousel */}
        {!loading && !error && images.length > 0 && currentImage && (
          <>
            {/* Header with title and download button */}
            <div className="flex justify-between items-center m-4">
              <div className="flex flex-col">
                <h3 className="text-white font-medium">{currentImage.title}</h3>
                <p className="text-[#FFFFFFCC] text-sm">
                  {currentImage.subtitle}
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="ml-2 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
                aria-label="Download image"
                disabled={!currentImageState.loaded}
              >
                <FiDownload className="w-5 h-5" />
              </button>
            </div>

            {/* Image container */}
            <div className="px-6 relative">
              <div className="relative overflow-hidden rounded-lg bg-gray-800">
                {/* Loading state for current image */}
                {currentImageState.loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}

                {/* Error state for current image */}
                {currentImageState.error && (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-700 text-white">
                    <div className="text-center">
                      <p className="mb-2">Failed to load image</p>
                      <button
                        onClick={() => {
                          setImageLoadStates((prev) => ({
                            ...prev,
                            [currentImageIndex]: {
                              loaded: false,
                              error: false,
                              loading: true,
                            },
                          }));
                          // Force reload
                          const img = document.querySelector(
                            `img[data-index="${currentImageIndex}"]`
                          );
                          if (img) {
                            img.src =
                              currentImage.proxyUrl + `?retry=${Date.now()}`;
                          }
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}

                {/* Actual image with cached URL */}
                <img
                  data-index={currentImageIndex}
                  src={displayUrl}
                  alt={`${currentImage.title} - Image ${currentImageIndex + 1}`}
                  className={`w-full h-auto object-cover transition-opacity duration-200 ${
                    currentImageState.loaded ? "opacity-100" : "opacity-0"
                  }`}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(currentImageIndex)}
                  onLoad={() => handleImageLoad(currentImageIndex)}
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all"
                      aria-label="Previous image"
                    >
                      <span className="text-lg">&#10094;</span>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all"
                      aria-label="Next image"
                    >
                      <span className="text-lg">&#10095;</span>
                    </button>
                  </>
                )}

                {/* Enhanced dots indicator with cache status */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => {
                      const imageState = imageLoadStates[index] || {
                        loaded: false,
                        error: false,
                        loading: true,
                      };
                      const isCached = !!cachedImageUrls[index];

                      return (
                        <button
                          key={index}
                          className={`h-2 w-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white"
                              : imageState.error
                              ? "bg-red-400 hover:bg-red-300"
                              : imageState.loaded && isCached
                              ? "bg-green-400 hover:bg-green-300"
                              : imageState.loaded
                              ? "bg-blue-400 hover:bg-blue-300"
                              : "bg-gray-400 hover:bg-gray-300"
                          }`}
                          onClick={() => handleImageSelect(index)}
                          aria-label={`Go to image ${index + 1} ${
                            isCached ? "(cached)" : ""
                          }`}
                          title={`Image ${index + 1} ${
                            isCached ? "(cached)" : ""
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Cache info (development only) */}
            {/*process.env.NODE_ENV === "development" && (
              <div className="mt-2 px-6 text-xs text-gray-400">
                Cache: {Object.keys(cachedImageUrls).length}/{images.length}{" "}
                images cached
              </div>
            )*/}
          </>
        )}

        {/* No images state */}
        {!loading && !error && images.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-center">
              <p>No images found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrselFetching;
