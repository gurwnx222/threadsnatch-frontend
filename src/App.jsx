import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';



export default function App() {
  return (
    
<div className="relative h-screen w-full overflow-hidden">
  <div 
    className="absolute inset-0 bg-cover bg-center animate-moveBg" 
    style={{ backgroundImage: "url('/BG-img1.jpg')" }}>
  </div>
  
  {/* Navbar */}
  <nav className="relative top-0 left-0 w-full p-4 text-white">
  <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </nav>


</div>

  )
}
