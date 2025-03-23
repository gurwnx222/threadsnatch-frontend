import React from 'react'
import Navbar from '../Components/Navbar'

const About = () => {
  return (
    <div className='font-montserrat h-auto'>
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center animate-moveBg" 
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}>
      </div>
      <Navbar />
    </div>
  )
}

export default About