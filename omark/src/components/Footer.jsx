// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-building text-2xl text-amber-500"></i>
              <span className="font-serif font-bold text-xl text-white">Omark<span className="text-amber-500">RE</span></span>
            </div>
            <p className="text-sm leading-relaxed">Redefining homeownership in Ghana through quality construction and innovative real estate solutions.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-500 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-amber-500 transition">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-amber-500 mt-1"></i> Pankrono & Atimatim, Kumasi, Ghana</li>
              <li className="flex items-center gap-3"><i className="fas fa-phone text-amber-500"></i> +233 24 123 4567</li>
              <li className="flex items-center gap-3"><i className="fas fa-envelope text-amber-500"></i> info@omarkrealestate.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Omark Real Estate & Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;