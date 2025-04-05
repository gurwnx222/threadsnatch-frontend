import React from 'react'
import Navbar from '../Components/Navbar'
import { FaTwitter, FaEnvelope } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className='font-montserrat h-screen relative'>
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center animate-moveBg" 
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}>
      </div>
      <Navbar />
      
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-xl w-full max-w-md mx-4 mt-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Get In Touch</h1>
          
          <div className="space-y-8">
            {/* Email Contact */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-gray-900 bg-opacity-60 rounded-lg hover:bg-opacity-80 transition-all">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-white p-3 rounded-full mr-6">
                  <FaEnvelope className="text-black text-xl" />
                </div>
                <span className="text-white text-lg">Email</span>
              </div>
              <a 
                href="mailto:threader.corp@gmail.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-[16px] sm:ml-8"
              >
                threader.corp@gmail.com
              </a>
            </div>
            
            {/* Twitter Contact */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-gray-900 bg-opacity-60 rounded-lg hover:bg-opacity-80 transition-all">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-white p-3 rounded-full mr-6">
                  <FaTwitter className="text-black text-xl" />
                </div>
                <span className="text-white text-lg">Twitter</span>
              </div>
              <a 
                href="https://twitter.com/GurwinderSingh" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-lg sm:ml-8"
              >
                @Gurwinder Singh
              </a>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-white text-opacity-80">
              Feel free to reach out for collaborations, questions, or just to say hello!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact