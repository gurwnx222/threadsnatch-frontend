import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import TNC from "./Pages/terms";
import ImageSaver from "./Pages/ImageSaver";
import HomePage from "./Pages/HomePage";
import VideoSaver from "./Pages/VideoSaver";

export default function App() {
  return (
    <div className="h-auto">
      <Analytics />
      <SpeedInsights />
      <div className='className="relative  w-full"'>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TNC />} />
            <Route path="/video" element={<VideoSaver />} />
            <Route path="/image" element={<ImageSaver />} />
            <Route path="/newHome" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
