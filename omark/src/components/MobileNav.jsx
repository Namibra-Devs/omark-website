// components/MobileNav.jsx - With nested dropdown for News & Career
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  Info,
  FolderGit2,
  Mail,
  Quote,
  X,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Calendar,
  Image,
  Briefcase,
  Newspaper,
  ChevronDown
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const MobileNav = ({ isOpen, closeMenu }) => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "auto";
      // Reset dropdown state when menu closes
      setIsResourcesOpen(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeMenu]);

  const navLinks = [
    { path: "/", label: "Home", icon: Home, description: "Welcome to Omark" },
    { path: "/about", label: "About", icon: Info, description: "Our story & vision" },
    { path: "/projects", label: "Projects", icon: FolderGit2, description: "View our work" },
    { path: "/events", label: "Events", icon: Calendar, description: "Upcoming events" },
    { path: "/gallery", label: "Gallery", icon: Image, description: "Explore our visuals" },
    { path: "/contact", label: "Contact", icon: Mail, description: "Get in touch" },
  ];

  const dropdownItems = [
    { path: "/news", label: "News & Updates", icon: Newspaper, description: "Latest company news and articles" },
    { path: "/career", label: "Careers", icon: Briefcase, description: "Join our team" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+233 24 123 4567", href: "tel:+233241234567" },
    { icon: MapPin, text: "Pankrono & Atimatim, Kumasi", href: null },
    { icon: Clock, text: "Mon-Sat: 8AM - 6PM", href: null },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#14141D]/50 backdrop-blur-sm z-40 md:hidden"
        onClick={closeMenu}
        aria-hidden="true"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* Mobile Menu Panel */}
      <div
        className="fixed top-0 left-0 h-full w-full bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
        style={{ animation: "slideInRight 0.3s ease-out" }}
      >
        {/* Header with Logo and Close Button */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo1.png"
              alt="Omark Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = "flex";
                }
              }}
            />
            <div className="hidden bg-amber-600 p-2 rounded-xl items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#14141D]">Omark<span className="text-amber-600">RE</span></span>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Close menu"
            type="button"
          >
            <X size={20} className="text-[#14141D]" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "bg-red-50 text-red-700 border-l-4 border-red-600"
                      : "hover:bg-gray-50 text-[#14141D]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-[#14141D] group-hover:bg-red-100 group-hover:text-red-600"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold ${isActive ? "text-red-700" : "text-[#14141D] group-hover:text-red-600"}`}
                      >
                        {link.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {link.description}
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`transition-colors ${isActive ? "text-red-600" : "text-gray-400 group-hover:text-red-600"}`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Resources Dropdown (News & Career) */}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 text-[#14141D]"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gray-100 text-[#14141D]">
                  <Briefcase size={20} strokeWidth={1.8} />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Resources</div>
                  <div className="text-xs text-gray-500">News & Career</div>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''} text-gray-400`}
              />
            </button>

            {/* Dropdown Items */}
            {isResourcesOpen && (
              <div className="ml-4 pl-4 border-l-2 border-red-200 space-y-2 mt-2 animate-fadeIn">
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
                          isActive
                            ? "bg-red-50 text-red-700 border-l-4 border-red-600"
                            : "hover:bg-gray-50 text-[#14141D]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={`p-1.5 rounded-lg transition-all duration-300 ${
                              isActive
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-[#14141D] group-hover:bg-red-100 group-hover:text-red-600"
                            }`}
                          >
                            <Icon size={16} strokeWidth={1.8} />
                          </div>
                          <div className="flex-1">
                            <div
                              className={`font-medium text-sm ${isActive ? "text-amber-700" : "text-[#14141D] group-hover:text-amber-600"}`}
                            >
                              {item.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight
                            size={14}
                            className={`transition-colors ${isActive ? "text-amber-600" : "text-gray-400 group-hover:text-amber-600"}`}
                          />
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* Contact Information */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-semibold text-[#14141D] uppercase tracking-wider">
            Contact Information
          </h3>
          <div className="space-y-3">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              const content = item.href ? (
                <a
                  href={item.href}
                  className="flex items-center gap-3 text-[#14141D] hover:text-amber-600 transition-colors"
                  onClick={closeMenu}
                >
                  <Icon size={18} className="text-amber-600" />
                  <span className="text-sm">{item.text}</span>
                </a>
              ) : (
                <div className="flex items-center gap-3 text-[#14141D]">
                  <Icon size={18} className="text-amber-600" />
                  <span className="text-sm">{item.text}</span>
                </div>
              );
              return <div key={index}>{content}</div>;
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-4">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <Quote size={18} />
            Get a Free Consultation
          </Link>
        </div>

        {/* Office Locations */}
        <div className="px-6 pb-4">
          <div className="bg-amber-50 rounded-xl p-4">
            <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <MapPin size={16} />
              Our Offices
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>📍 Pankrono Main Road, Kumasi</p>
              <p>📍 Atimatim Junction, Kumasi</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 pt-0 border-t border-gray-100 mt-2">
          <div className="flex justify-center gap-4 mt-4">
            {[
              { name: "facebook", icon: faFacebook },
              { name: "twitter", icon: faXTwitter },
              { name: "instagram", icon: faInstagram },
              { name: "linkedin", icon: faLinkedin },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-amber-600 hover:text-white transition-all duration-300"
                aria-label={`Follow us on ${social.name}`}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            © {new Date().getFullYear()} Omark Real Estate. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default MobileNav;