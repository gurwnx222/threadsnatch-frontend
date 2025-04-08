import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import TNC from './Pages/TNC';

export default function App() {
  return (
<div className='h-auto'>
  <div className='className="relative  w-full"'>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tnc" element={<TNC />} />
        </Routes>
      </Router>
  </div>
</div>
  )
}
