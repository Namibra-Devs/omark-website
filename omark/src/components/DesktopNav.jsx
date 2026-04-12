// components/DesktopNav.jsx - Updated with correct color classes
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, FolderGit2, Mail, Calendar, Image, Briefcase } from 'lucide-react';

const DesktopNav = () => {
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/projects', label: 'Projects', icon: FolderGit2 },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/news-career', label: 'Careers', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: Mail },
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
                    ? 'text-[#7B170F] bg-red-50' 
                    : 'text-dark hover:text-[#7B170F] hover:bg-red-50/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={18} 
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'text-[#7B170F]' 
                        : 'text-dark group-hover:text-[#7B170F]'
                    }`}
                    strokeWidth={1.8}
                  />
                  <span className={isActive ? 'text-[#7B170F]' : 'text-dark group-hover:text-[#7B170F]'}>
                    {link.label}
                  </span>
                  
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#7B170F] rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopNav;