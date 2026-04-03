// components/MobileNav.jsx - With consistent color scheme
import React, { useEffect } from "react";
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
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const MobileNav = ({ isOpen, closeMenu }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "auto";
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
    {
      path: "/about",
      label: "About",
      icon: Info,
      description: "Our story & vision",
    },
    {
      path: "/projects",
      label: "Projects",
      icon: FolderGit2,
      description: "View our work",
    },
    {
      path: "/contact",
      label: "Contact",
      icon: Mail,
      description: "Get in touch",
    },
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
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
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
            <div className="hidden bg-gradient-to-br from-amber-600 to-amber-700 p-2 rounded-xl items-center justify-center">
              <span className="text-white font-bold">O</span>
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
                      ? "bg-amber-50 text-amber-600 border-l-4 border-amber-600"
                      : "hover:bg-gray-50 text-[#14141D]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-amber-600 text-white"
                          : "bg-gray-100 text-[#14141D] group-hover:bg-amber-100 group-hover:text-amber-600"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold ${isActive ? "text-amber-600" : "text-[#14141D] group-hover:text-amber-600"}`}
                      >
                        {link.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {link.description}
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`transition-colors ${isActive ? "text-amber-600" : "text-gray-400 group-hover:text-amber-600"}`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
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

       

        {/* Social Links */}
        <div className="p-6 pt-0 border-t border-gray-100 mt-4">
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
      `}</style>
    </>
  );
};

export default MobileNav;
