// components/VideoBanner.jsx - Background Video Banner Section
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, ChevronRight } from 'lucide-react';

const VideoBanner = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Auto-play video when component mounts
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

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: '500px', maxHeight: '800px' }}>
      {/* Video Background - Properly scaled without cropping */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-full min-w-full min-h-full object-cover"
          style={{
            width: 'auto',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover'
          }}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/images/video-poster.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/video/banner.mp4" type="video/mp4" />
          <source src="/video/hero-video.webm" type="video/webm" />
          {/* Fallback image if video fails */}
          <img 
            src="/images/video-fallback.jpg" 
            alt="Omark Real Estate & Construction"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Loading Skeleton */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#14141D] to-[#2a2a35] flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/80 via-[#14141D]/50 to-[#14141D]/70 z-10"></div>
      
      {/* Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#14141D] to-transparent z-10"></div>

      
      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-amber-400 text-sm font-semibold">Building Ghana's Future</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Redefining{' '}
              <span className="text-amber-500 relative inline-block">
                Homeownership
               
              </span>
              <br />
              in Ghana
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-6 max-w-2xl leading-relaxed">
              Premium Real Estate & Construction — From Kumasi to the nation, we build dignity, security, and prosperity for every Ghanaian.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/projects"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 text-base"
              >
                <span>Explore Projects</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/30 backdrop-blur-sm hover:bg-white hover:text-[#14141D] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-base bg-white/10"
              >
                Get Consultation
              </Link>
            </div>

            
          </div>
        </div>
      </div>

     

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default VideoBanner;