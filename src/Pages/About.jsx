import React from 'react';
import Navbar from '../Components/Navbar';
import PhilosophyCard from '../Components/Cards';
import Footer from '../Components/Footer';

const About = () => {
  return (
    <div className="relative font-montserrat min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center animate-moveBg z-[-1]" 
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-5">
        <PhilosophyCard name="Our Philosophy" description="At its core, this project is all about empowering users—especially small and mid-sized organizations—with access to powerful, yet affordable, data extraction tools. I started this project to learn web scraping, and quickly realized that existing commercial solutions were prohibitively expensive, creating bottlenecks for many businesses. So, while still in 12th grade at just 18 years old, I built the backend from scratch over three months and deployed it on AWS to offer a cost-effective alternative. And This Design of the website is made by my new developer friend so special thanks to him." />
        
        <PhilosophyCard   name="Meet Yash – Our Frontend Maestro" 
          description={
            <>
              While I was juggling exam preparations and backend development, my talented friend Yash Chandan stepped in to create an exceptional frontend experience for our project. At 21 and in his final year of college, Yash brings a wealth of knowledge in React and the full MERN stack, blending modern design with robust functionality. Connect to him at{" "}
              <a 
                href="https://twitter.com/YashChandan_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:underline"
              >
                Twitter @X
              </a>.
            </>
          }
        />

        <PhilosophyCard name="Meet  Gurwinder  –  It’s ME" description="As a full stack developer with a strong foundation in the MERN stack, I bring together the best of both frontend and backend development with the blend of UI/UX designing.  For our backend, I engineered a robust solution using Express and Puppeteer Core—leveraging stealth technologies to stay ahead of the curve. I then deployed our services with a production-ready serverless framework, ensuring scalability and reliability without compromising performance." 
          className="mb-10"
        />
      </div>

      {/* Footer */}
      <div className='mt-20'>
      <Footer className="w-[99vw]" />
      </div>

    </div>
  );
};

export default About;
