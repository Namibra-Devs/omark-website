// components/Navbar.jsx - With consistent colors
import React, { useState, useEffect } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Logo from './Logo';

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white shadow-xl border-b border-gray-100' 
            : 'bg-white shadow-md'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Logo scrolled={scrolled} />

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Mobile Menu Button - Chocolate Themed */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 group"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              type="button"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300"></div>
              <div className="relative z-10 flex flex-col items-center justify-center w-6 h-6">
                <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
                <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out my-1 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <MobileNav isOpen={isOpen} closeMenu={closeMenu} />
    </>
  );
};

export default Navbar;