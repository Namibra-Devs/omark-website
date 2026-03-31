// components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition">
        <i className={`fas ${icon} text-2xl text-amber-600 group-hover:text-white transition`}></i>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
};

export default ServiceCard;