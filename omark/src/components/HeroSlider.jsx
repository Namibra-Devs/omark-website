// components/HeroSlider.jsx - Auto-advancing hero slider; each slide has its own content
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHero } from '../hooks/useHero';

// Cloudinary video URLs are served under /video/upload/; also catch common video extensions.
const isVideoUrl = (u = '') =>
  /\/video\/upload\//.test(u) || /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(u);

// Shown only when no slides have been configured in the admin dashboard yet.
const STATIC_SLIDES = [
  {
    id: 'static-1',
    image: '/images/hero1.jpeg',
    badge: "Building Ghana's Future",
    title: 'Redefining',
    highlight: 'Homeownership',
    subtitle: 'Premium Real Estate & Construction — From Kumasi to the nation, we build dignity, security, and prosperity for every Ghanaian.',
    btn1Text: 'Explore Projects',
    btn1Link: '/projects',
    btn2Text: 'Get Consultation',
    btn2Link: '/contact',
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const { data: heroData } = useHero();

  const slides = useMemo(() => {
    const raw = Array.isArray(heroData) ? heroData : (heroData?.data ?? null);
    if (raw && raw.length > 0) {
      return raw.map((s, i) => ({
        id: s.id ?? s._id ?? i,
        image: s.image ?? s.imageUrl ?? s.url ?? '',
        badge: s.badge ?? '',
        title: s.title ?? '',
        highlight: s.highlight ?? '',
        subtitle: s.subtitle ?? '',
        btn1Text: s.btn1Text ?? '',
        btn1Link: s.btn1Link ?? '#',
        btn2Text: s.btn2Text ?? '',
        btn2Link: s.btn2Link ?? '#',
      }));
    }
    return STATIC_SLIDES;
  }, [heroData]);

  // Keep current index in range when the slide list changes
  useEffect(() => {
    setCurrent((cur) => (cur >= slides.length ? 0 : cur));
  }, [slides.length]);

  // Keep a ref to slides.length so next/prev have zero deps and never trigger interval reset
  const slidesLengthRef = useRef(slides.length);
  useEffect(() => { slidesLengthRef.current = slides.length; }, [slides.length]);

  const goTo = useCallback((idx) => {
    setCurrent(() => (idx + slidesLengthRef.current) % slidesLengthRef.current);
  }, []);

  const next = useCallback(() => {
    setCurrent((cur) => (cur + 1) % slidesLengthRef.current);
  }, []);

  const prev = useCallback(() => {
    setCurrent((cur) => (cur - 1 + slidesLengthRef.current) % slidesLengthRef.current);
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused, slides.length]);

  return (
    <section
      className="relative w-full overflow-hidden mt-20"
      style={{ height: '70vh', minHeight: '500px', maxHeight: '800px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides — image + its own content crossfade together */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: idx === current ? 1 : 0,
            zIndex: idx === current ? 10 : 0,
            transition: 'opacity 700ms ease-in-out',
            pointerEvents: idx === current ? 'auto' : 'none',
          }}
        >
          {isVideoUrl(slide.image) ? (
            <video
              src={slide.image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <img
              src={slide.image}
              alt={slide.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                e.target.src = 'https://placehold.co/1920x800/14141D/f59e0b?text=Omark+Properties';
              }}
            />
          )}

          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/85 via-[#14141D]/50 to-[#14141D]/40" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#14141D] to-transparent" />

          {/* Per-slide content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
              <div className={`max-w-3xl ${idx === current ? 'animate-fadeInUp' : ''}`}>
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-red-400 text-sm font-semibold">{slide.badge}</span>
                  </div>
                )}

                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {slide.title}{slide.highlight ? ' ' : ''}
                  {slide.highlight && <span className="text-red-500">{slide.highlight}</span>}
                </h1>

                {slide.subtitle && (
                  <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-6 max-w-2xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  {slide.btn1Text && (
                    <Link
                      to={slide.btn1Link || '#'}
                      className="group relative overflow-hidden bg-[#7B170F] hover:bg-[#14141D] text-white px-8 py-3.5 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 text-base"
                    >
                      <span>{slide.btn1Text}</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  {slide.btn2Text && (
                    <Link
                      to={slide.btn2Link || '#'}
                      className="border-2 border-white/30 backdrop-blur-sm hover:bg-white hover:text-[#14141D] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-base bg-white/10"
                    >
                      {slide.btn2Text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-40 flex flex-col items-center gap-3">
        {slides.length > 1 && (
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                style={{
                  width: idx === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: idx === current ? '#ef4444' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 300ms',
                  padding: 0,
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default HeroSlider;
