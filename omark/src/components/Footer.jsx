// components/Footer.jsx - Redesigned with Lucide React icons
import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  MessageCircle,
  Users,
  ArrowRight,
  Clock,
  Shield,
  Award,
  Heart,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/projects", label: "Projects" },
    { path: "/events", label: "Events" },

    { path: "/contact", label: "Contact" },
  ];

  const services = [
    { name: "Residential Development", path: "/projects" },
    { name: "Commercial Construction", path: "/projects" },
    { name: "Flexible Payment Plans", path: "/events" },
    { name: "Sustainable Building", path: "/about" },
    { name: "Property Management", path: "/events" },
    { name: "Real Estate Investment", path: "/events" },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "Pankrono Main Road & Atimatim Junction, Kumasi, Ghana",
      link: null,
    },
    { icon: Phone, text: "+233 54 602 9075", link: "tel:+233546029075" },
    {
      icon: Mail,
      text: "info@omarkrealestate.com",
      link: "mailto:info@omarkrealestate.com",
    },
  ];

  const socialLinks = [
    { icon: Globe, href: "#", label: "Website", color: "hover:bg-blue-500" },
    { icon: Share2, href: "#", label: "Share", color: "hover:bg-sky-500" },
    {
      icon: MessageCircle,
      href: "#",
      label: "Chat",
      color: "hover:bg-pink-500",
    },
    {
      icon: Users,
      href: "#",
      label: "Community",
      color: "hover:bg-indigo-500",
    },
  ];

  const stats = [
    { icon: Shield, value: "15+", label: "Years of Excellence" },
    { icon: Award, value: "500+", label: "Homes Completed" },
    { icon: Heart, value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <footer className="bg-[#14141D] relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Top Section with Newsletter */}
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-20 h-20 bg-white  rounded-md flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/logo1.png" 
                    alt="Omark Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Redefining homeownership in Ghana through quality construction
                and innovative real estate solutions.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                      aria-label={social.label}
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4 relative inline-block">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-500 rounded-full"></div>
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-red-500 transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4 relative inline-block">
                Our Services
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-500 rounded-full"></div>
              </h4>
              <ul className="space-y-2">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <Link
                      to={service.path}
                      className="text-gray-400 hover:text-red-500 transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {service.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4 relative inline-block">
                Contact Info
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3 mb-6">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  const content = item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-start gap-3"
                    >
                      <Icon
                        size={16}
                        className="text-red-500 flex-shrink-0 mt-0.5"
                      />
                      <span>{item.text}</span>
                    </a>
                  ) : (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon
                        size={16}
                        className="text-red-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-gray-400 text-sm">{item.text}</span>
                    </li>
                  );
                  return <li key={idx}>{content}</li>;
                })}
              </ul>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock
                  size={16}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-gray-400 text-sm">
                    Mon-Fri: 8:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-400 text-sm">
                    Saturday: 9:00 AM - 2:00 PM
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Omark Real Estate &
              Construction. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-gray-500 text-xs hover:text-red-500 transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 text-xs hover:text-red-500 transition"
              >
                Terms of Service
              </Link>
              <Link
                to="/faq"
                className="text-gray-500 text-xs hover:text-red-500 transition"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
