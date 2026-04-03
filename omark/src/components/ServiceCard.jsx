// components/ServiceCard.jsx - With actual images
import React from 'react';

// Map titles to image paths from public folder
const imageMap = {
  'Residential Development': '/images/img1.png',
  'Commercial Construction': '/images/img2.webp',
  'Flexible Payment Plans': '/images/img3.webp',
  'Sustainable Building': '/images/img4.webp',
  // Fallback mapping for any other titles
  'Painting': '/images/img1.png',
  'Interior Design': '/images/img2.webp',
  'Renovation': '/images/img3.webp',
  'Real Estate': '/images/img4.webp',
};

const ServiceCard = ({ title, desc }) => {
  const icon = imageMap[title] || '/images/fallback.png';

  return (
    <div className="bg-[#14141D] p-6 rounded-md shadow-md hover:shadow-xl transition-all duration-300 text-center group">
      {/* Image Container */}
      <div className="w-40 h-40 rounded-md flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br from-amber-500 to-amber-600 transition-all duration-300 shadow-sm group-hover:shadow-lg">
        <img
          src={icon}
          alt={title}
          className="w-20 h-20 rounded-lg object-fill transition-all duration-300 group-hover:scale-110 group-hover:brightness-70 "
          onError={(e) => {
            // Fallback if image doesn't exist
            e.target.src = '/images/fallback.png';
            e.target.onerror = null;
          }}
        />
      </div>
      <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

export default ServiceCard;