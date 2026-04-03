// components/ContactSection.jsx - Using only Lucide React icons
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe, Share2, MessageCircle, Users
} from 'lucide-react';

const ContactSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: ['+233 24 123 4567', '+233 24 765 4321'], link: 'tel:+233241234567' },
    { icon: Mail, title: 'Email', details: ['info@omarkrealestate.com', 'sales@omarkrealestate.com'], link: 'mailto:info@omarkrealestate.com' },
    { icon: MapPin, title: 'Office Locations', details: ['Pankrono Main Road, Kumasi', 'Atimatim Junction, Kumasi'], link: null },
    { icon: Clock, title: 'Working Hours', details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM'], link: null },
  ];

const socialLinks = [
  { icon: Globe, href: '#', label: 'Website', color: 'hover:bg-blue-500' },
  { icon: Share2, href: '#', label: 'Share', color: 'hover:bg-sky-500' },
  { icon: MessageCircle, href: '#', label: 'Chat', color: 'hover:bg-pink-500' },
  { icon: Users, href: '#', label: 'Community', color: 'hover:bg-indigo-500' },
];


  return (
    <section className="py-20 bg-gradient-to-br from-[#14141D] to-[#1a1a25] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Ready to Build Your <span className="text-amber-500">Future?</span>
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Join the Omark family and take the first step toward owning your dream home in Ghana.
          </p>
        </div>

        {/* Contact Grid - Left: Details, Right: Portrait Video */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Contact Details */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/50 transition-all duration-300 group hover:transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                      <Icon size={22} className="text-amber-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      item.link && i === 0 ? (
                        <a
                          key={i}
                          href={item.link}
                          className="block text-gray-400 text-sm hover:text-amber-500 transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={i} className="text-gray-400 text-sm">{detail}</p>
                      )
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send size={18} />
              Contact Us Today
            </Link>
          </div>

          {/* Right Side - Portrait Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              {/* Video Container - Portrait aspect ratio (9:16) */}
              <div className="relative" style={{ paddingBottom: '177.77%' }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster="/images/contact-video-poster.jpg"
                  onLoadedData={() => setIsVideoLoaded(true)}
                >
                  <source src="/video/3.mp4" type="video/mp4" />
                  <source src="/video/contact-portrait.webm" type="video/webm" />
                  {/* Fallback image */}
                  <img
                    src="/images/contact-fallback.jpg"
                    alt="Omark Real Estate"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </video>

                {/* Loading Skeleton */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#14141D] to-[#2a2a35] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-white text-sm">Loading video...</p>
                    </div>
                  </div>
                )}

                {/* Video Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Video Controls */}
                <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            
                </div>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    Welcome to Omark
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;