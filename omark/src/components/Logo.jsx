// components/Logo.jsx - Updated with correct colors
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ scrolled }) => {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 focus:outline-none rounded-xl transition-all duration-300"
      aria-label="Omark Real Estate & Construction - Home"
    >
      <img
        src="/images/logo1.png"
        alt="Omark Real Estate & Construction Logo"
        className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
        onError={(e) => {
          e.target.style.display = "none";
          if (e.target.nextSibling) {
            e.target.nextSibling.style.display = "flex";
          }
        }}
      />
      <div
        className="hidden bg-[#7B170F] p-2.5 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 items-center justify-center"
      >
        <span className="text-white font-bold text-xl">O</span>
      </div>

      <div className="flex flex-col">
        <span className="font-serif font-bold text-xl tracking-tight text-dark">
          Omark
        </span>
        <span className="text-[10px] font-medium tracking-wider uppercase text-dark">
          Real Estate & Construction
        </span>
      </div>
    </Link>
  );
};

export default Logo;
