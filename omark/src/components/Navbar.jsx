// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-building text-3xl text-amber-600"></i>
            <span className="font-serif font-bold text-2xl tracking-tight text-gray-800">Omark<span className="text-amber-600">RE</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-all duration-300 ${isActive ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-700 hover:text-amber-600'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <Link to="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition shadow-md">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-gray-700">
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-5 space-y-3 text-center bg-white rounded-b-2xl shadow-lg">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-amber-600 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block bg-amber-600 text-white px-6 py-2 rounded-full font-semibold mx-auto w-fit">
              Get a Quote
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;