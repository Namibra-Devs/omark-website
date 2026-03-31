// components/AboutImage.jsx
import React from 'react';

const AboutImage = () => {
  return (
    <div className="relative">
      <img 
        src="/public/images/about-team.jpg" 
        alt="Omark Team" 
        className="rounded-2xl shadow-xl w-full object-cover h-96"
        onError={(e) => { e.target.src = 'https://placehold.co/600x400/2c3e50/white?text=Omark+Team'; }}
      />
      <div className="absolute -bottom-5 -right-5 bg-amber-600 p-4 rounded-xl shadow-lg hidden md:block">
        <i className="fas fa-hard-hat text-white text-3xl"></i>
      </div>
    </div>
  );
};

export default AboutImage;