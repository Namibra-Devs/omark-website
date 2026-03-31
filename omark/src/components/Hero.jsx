// components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen max-h-[800px] min-h-[600px] flex items-center justify-center overflow-hidden pt-16">
      {/* Video Background */}
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="/public/video/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 text-center text-white px-5 max-w-5xl mx-auto animate-fadeInUp">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Redefining <span className="text-amber-400">Homeownership</span> in Ghana
        </h1>
        <p className="text-lg md:text-xl mt-5 max-w-2xl mx-auto">
          Premium Real Estate & Construction — From Kumasi to the nation, we build dignity, security, and prosperity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/projects" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition shadow-lg">
            Explore Projects
          </Link>
          <Link to="/contact" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition">
            Get Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;