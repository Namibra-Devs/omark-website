// components/Hero.jsx - Simple version with video
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Video Background */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
        {/* Fallback image if video fails to load */}
        <img 
          src="/images/hero-fallback.jpg" 
          alt="Omark Real Estate Properties" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>
      
     
   
    </section>
  );
};

export default Hero;