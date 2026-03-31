// components/ProjectCard.jsx
import React from 'react';

const ProjectCard = ({ title, desc, image, status }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          onError={(e) => { e.target.src = 'https://placehold.co/600x400/2c3e50/white?text=Project'; }}
        />
        <span className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{status}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
        <button className="mt-4 text-amber-600 font-semibold hover:text-amber-700 transition">Learn More →</button>
      </div>
    </div>
  );
};

export default ProjectCard;