import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=' text-white font-montserrat absolute top-4 left-0 w-full bg-white shadow-md z-50'>
      <div className='container mx-auto flex justify-around items-center font-medium text-xl absolute top-6'>
        <h1>threadSnatch</h1>
        <ul className='flex space-x-6 cursor-pointer'>
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>
      </div>
      </nav>
  )
}

export default Navbar