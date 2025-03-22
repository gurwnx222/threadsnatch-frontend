import React from 'react'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <div className='font-montserrat h-auto'>
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center animate-moveBg" 
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}>
      </div>
        <Navbar />
        
        {/* Main Content - First screen */}
        <div className="relative flex flex-col items-center justify-center min-h-screen text-white">
          <div className='w-auto h-[54px] mt-36 text-3xl'>
              Snatch Every <span className='bg-[linear-gradient(94.89deg,#62CFF4_58.98%,#2C67F2_83.06%)] text-transparent bg-clip-text'>Detail</span> From Threads
          </div>
          
          <div className='text-2xl w-auto mt-6'>Instantly extract videos, images, and carousels <br /> with our  API— fueling your app with real-time <br /> insights and a competitive edge.</div>

          <div className='flex mt-20 gap-8'>
            <button className='bg-[linear-gradient(103.2deg,#4624C2_31.08%,#7F5BFF_92.12%)] hover:opacity-90 transition-all text-white py-2 px-4 rounded-xl'>Get API</button>
            <button className='bg-white hover:bg-gray-300 text-black py-2 px-4 rounded-xl flex gap-2'><img  src='/Vector.svg'/>  Docs</button>
          </div>


        </div>

      {/* Down page content - second */}
      <div className='relative min-h-screen flex flex-col justify-center items-center bg-white'>Down Page content</div>

    </div>
  )
}

export default Home