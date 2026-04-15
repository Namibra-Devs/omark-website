// components/DesktopNav.jsx - Updated with nested dropdown for News & Career
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Info, FolderGit2, Mail, Calendar, Image, Briefcase, Newspaper, ChevronDown } from 'lucide-react';

const DesktopNav = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/projects', label: 'Projects', icon: FolderGit2 },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const dropdownItems = [
    { path: '/news', label: 'News & Updates', icon: Newspaper, description: 'Latest company news and articles' },
    { path: '/career', label: 'Careers', icon: Briefcase, description: 'Join our team' },
  ];

  return (
    <div className="hidden md:flex items-center gap-1 lg:gap-2">
      <div className="flex items-center gap-1 mr-4">
        {navLinks.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-[#14141D] hover:text-red-600 hover:bg-red-50/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={18} 
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'text-red-600' 
                        : 'text-[#14141D] group-hover:text-red-600'
                    }`}
                    strokeWidth={1.8}
                  />
                  <span className={isActive ? 'text-red-600' : 'text-[#14141D] group-hover:text-red-600'}>
                    {link.label}
                  </span>
                  
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-amber-600 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Resources Dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => setIsResourcesOpen(true)}
          onMouseLeave={() => setIsResourcesOpen(false)}
        >
          <button
            className={`relative group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 text-[#14141D] hover:text-red-600 hover:bg-red-50/50`}
          >
            <Briefcase size={18} className="text-[#14141D] group-hover:text-red-600 transition-all duration-300" strokeWidth={1.8} />
            <span className="text-[#14141D] group-hover:text-red-600">Resources</span>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''} text-[#14141D] group-hover:text-red-600`}
            />
          </button>

          {/* Dropdown Menu */}
          {isResourcesOpen && (
            <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fadeInDown">
              {dropdownItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-red-50 transition-all duration-200 group"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-all duration-200">
                      <Icon size={16} className="text-red-600 group-hover:text-white transition-all duration-200" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#14141D] group-hover:text-red-800 text-sm">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;