// components/ProjectsSlider.jsx - Redesigned: Sleek Modern Slider
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Pankrono Gardens',
    location: 'Pankrono, Kumasi',
    tag: 'Residential',
    description:
      'A modern residential community featuring 50 luxury homes with smart home technology, landscaped gardens, and 24/7 security.',
    stats: { homes: '50 Units', area: '5 Acres', completion: '2024' },
    mainImage: '/images/6.jpeg',
    images: [
      '/images/7.jpeg',
      '/images/8.jpeg',
      '/images/9.jpeg',
      '/images/10.jpeg',
      '/images/11.jpeg',
    ],
    accent: '#F59E0B',
  },
  {
    id: 2,
    title: 'Atimatim Heights',
    location: 'Atimatim, Kumasi',
    tag: 'Affordable',
    description:
      'Affordable housing project with flexible payment plans, featuring modern 2 & 3 bedroom homes perfect for first-time homeowners.',
    stats: { homes: '120 Units', area: '8 Acres', completion: '2025' },
    mainImage: '/images/12.jpeg',
    images: [
      '/images/10.jpeg',
      '/images/14.jpeg',
      '/images/18.jpeg',
      '/images/16.jpeg',
      '/images/17.jpeg',
    ],
    accent: '#F59E0B',
  },
  {
    id: 3,
    title: 'Kumasi Central Mall',
    location: 'CBD, Kumasi',
    tag: 'Commercial',
    description:
      'A state-of-the-art commercial complex with retail spaces, office suites, and entertainment facilities designed for modern business.',
    stats: { stores: '80+ Units', area: '12 Acres', completion: '2026' },
    mainImage: '/images/19.jpeg',
    images: [
      '/images/24.jpeg',
      '/images/21.jpeg',
      '/images/22.jpeg',
      '/images/23.jpeg',
      '/images/20.jpeg',
    ],
    accent: '#F59E0B',
  },
  {
    id: 4,
    title: 'Heritage Villas',
    location: 'East Legon, Kumasi',
    tag: 'Premium',
    description:
      'Premium gated community with custom-built villas featuring private pools, rooftop gardens, and panoramic city views.',
    stats: { villas: '25 Units', area: '15 Acres', completion: '2024' },
    mainImage: '/images/25.jpeg',
    images: [
      '/images/26.jpeg',
      '/images/27.jpeg',
      '/images/28.jpeg',
      '/images/22.jpeg',
      '/images/30.jpeg',
    ],
    accent: '#F59E0B',
  },
  {
    id: 5,
    title: 'Garden City Residences',
    location: 'Asokwa, Kumasi',
    tag: 'Eco-Friendly',
    description:
      'Eco-friendly residential development with solar panels, rainwater harvesting, and community gardens.',
    stats: { homes: '85 Units', area: '10 Acres', completion: '2025' },
    mainImage: '/images/31.jpeg',
    images: [
      '/images/32.jpeg',
      '/images/33.jpeg',
      '/images/34.jpeg',
      '/images/35.jpeg',
      '/images/36.jpeg',
    ],
    accent: '#F59E0B',
  },
  {
    id: 6,
    title: 'Tech Hub Tower',
    location: 'Airport City, Kumasi',
    tag: 'Commercial',
    description:
      'Modern commercial tower with co-working spaces, conference facilities, and tech incubation centers.',
    stats: { floors: '12 Floors', area: '50,000 sqft', completion: '2026' },
    mainImage: '/images/37.jpeg',
    images: [
      '/images/34.jpeg',
      '/images/12.jpeg',
      '/images/9.jpeg',
      '/images/25.jpeg',
      '/images/33.jpeg',
    ],
    accent: '#F59E0B',
  },
];

/* ─── Placeholder image generator ─── */
const placeholder = (text) =>
  `https://placehold.co/900x600/1a1a28/d97706?text=${encodeURIComponent(text)}`;

/* ─── Utility: clamp ─── */
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const prev = () => setImgIdx((i) => (i === 0 ? project.images.length - 1 : i - 1));
  const next = () => setImgIdx((i) => (i === project.images.length - 1 ? 0 : i + 1));

  const arrowStyle = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 40, height: 40, borderRadius: '50%', border: 'none',
    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'background 0.2s, color 0.2s', zIndex: 2,
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(14px)',
      }}
      onClick={onClose}
    >
      {/* ── Close button: fixed to viewport, above everything ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'fixed', top: 20, right: 20, zIndex: 10000,
          width: 44, height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(14,14,26,0.85)',
          backdropFilter: 'blur(12px)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#0E0E1A'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(14,14,26,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
        aria-label="Close modal"
      >
        <X size={18} />
      </button>

      {/* ── Modal panel ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%', maxWidth: 900,
          maxHeight: '90vh',
          borderRadius: 24,
          background: '#0E0E1A',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        }}
      >
        {/* ── Image gallery (fixed aspect ratio = reliable sizing) ── */}
        <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%', flexShrink: 0, background: '#080810' }}>
          <img
            key={imgIdx}
            src={project.images[imgIdx]}
            alt={`${project.title} — image ${imgIdx + 1}`}
            onError={(e) => { e.target.src = placeholder(project.title); }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              transition: 'opacity 0.35s ease',
            }}
          />

          {/* Bottom gradient — bleeds into content panel */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, #0E0E1A 0%, rgba(14,14,26,0.35) 20%, transparent 0%)',
          }} />

          {/* Tag pill */}
          <span style={{
            position: 'absolute', top: 18, left: 18,
            padding: '5px 14px', borderRadius: 999,
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            background: '#F59E0B', color: '#0E0E1A',
          }}>
            {project.tag}
          </span>

          {/* Image counter */}
          <span style={{
            position: 'absolute', top: 18, right: 18,
            padding: '5px 12px', borderRadius: 999,
            fontSize: 11, fontWeight: 600,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            {imgIdx + 1} / {project.images.length}
          </span>

          {/* Prev / Next arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#ce7d05ff'; e.currentTarget.style.color = '#0E0E1A'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = '#fff'; }}
                style={{ ...arrowStyle, left: 14 }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.color = '#0E0E1A'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = '#fff'; }}
                style={{ ...arrowStyle, right: 14 }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {project.images.length > 1 && (
            <div style={{
              position: 'absolute', bottom: 18,
              left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 6, alignItems: 'center',
            }}>
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  style={{
                    width: i === imgIdx ? 22 : 6, height: 6,
                    borderRadius: 999, border: 'none', padding: 0,
                    background: i === imgIdx ? '#F59E0B' : 'rgba(255,255,255,0.35)',
                    cursor: 'pointer', transition: 'all 0.25s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Content (scrollable) ── */}
        <div style={{ padding: '24px 32px 32px', overflowY: 'auto', flex: 1 }}>

          {/* Title + location row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
            <h3 style={{
              margin: 0, fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontWeight: 800, color: '#fff',
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.2,
            }}>
              {project.title}
            </h3>
            <span style={{
              color: '#F59E0B', fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4,
              flexShrink: 0, marginTop: 3,
              whiteSpace: 'nowrap',
            }}>
              <MapPin size={13} /> {project.location}
            </span>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7, fontSize: 14, margin: '0 0 22px',
          }}>
            {project.description}
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: 12, padding: '18px 0', margin: '0 0 24px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#F59E0B', marginBottom: 3 }}>{value}</div>
                <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)' }}>{key}</div>
              </div>
            ))}
          </div>

          <button
            style={{
              width: '100%', padding: '14px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#0E0E1A', fontWeight: 800, fontSize: 13,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.88'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Request More Information
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '0 0 auto',
        width: 'var(--card-width)',
        borderRadius: 10,
        overflow: 'hidden',
        background: '#13131F',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.2)'
          : '0 8px 24px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => onOpen(project)}
    >
      {/* ── Image — taller than content ── */}
      <div style={{ position: 'relative', height: 280, flexShrink: 0, overflow: 'hidden' }}>
        <img
          src={project.mainImage}
          alt={project.title}
          onError={(e) => { e.target.src = placeholder(project.title); }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            display: 'block',
          }}
        />

        {/* Gradient bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(19,19,31,0.85) 15%, rgba(19,19,31,0.1) 5%, transparent 100%)',
        }} />

        {/* Tag */}
        <span style={{
          position: 'absolute', top: 14, left: 14,
          padding: '4px 12px',
          borderRadius: 999,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          background: 'rgba(245,158,11,0.15)',
          color: '#F59E0B',
          border: '1px solid rgba(245,158,11,0.3)',
          backdropFilter: 'blur(6px)',
        }}>
          {project.tag}
        </span>

        {/* Location overlay (bottom of image) */}
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          display: 'flex', alignItems: 'center', gap: 5,
          color: 'rgba(255,255,255,0.75)',
          fontSize: 12,
        }}>
          <MapPin size={12} style={{ color: '#F59E0B', flexShrink: 0 }} />
          <span>{project.location}</span>
        </div>

        {/* Quick view button overlay */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.3s ease',
        }}>
          <button
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: '#F59E0B',
              color: '#0E0E1A',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
          >
            View Project
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          margin: '0 0 8px',
          fontSize: 18,
          fontWeight: 800,
          color: '#fff',
          fontFamily: "'Playfair Display', Georgia, serif",
          transition: 'color 0.2s',
          color: hovered ? '#F59E0B' : '#fff',
          lineHeight: 1.25,
        }}>
          {project.title}
        </h3>

        <p style={{
          margin: '0 0 18px',
          fontSize: 13,
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.5)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          paddingTop: 16,
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#F59E0B', marginBottom: 2 }}>{value}</div>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SLIDER SECTION
───────────────────────────────────────────── */
export default function ProjectsSlider() {
  const [activeProject, setActiveProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startIndex: 0 });

  /* Responsive: how many cards are visible */
  const [cardsVisible, setCardsVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCardsVisible(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, PROJECTS.length - cardsVisible);

  /* ── Navigation ── */
  const goTo = useCallback(
    (idx) => setCurrentIndex(clamp(idx, 0, maxIndex)),
    [maxIndex]
  );

  /* Keep currentIndex valid when cardsVisible changes */
  useEffect(() => {
    setCurrentIndex((i) => clamp(i, 0, maxIndex));
  }, [maxIndex]);

  /* ── Drag / swipe ── */
  const onDragStart = (clientX) => {
    dragRef.current = { isDragging: true, startX: clientX, startIndex: currentIndex };
  };
  const onDragMove = (clientX) => {
    if (!dragRef.current.isDragging || !trackRef.current) return;
    const diff = dragRef.current.startX - clientX;
    const cardW = trackRef.current.offsetWidth / cardsVisible;
    const indexDelta = Math.round(diff / cardW);
    goTo(dragRef.current.startIndex + indexDelta);
  };
  const onDragEnd = () => { dragRef.current.isDragging = false; };

  /* ── Modal control (lock body scroll) ── */
  const openModal = (project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  /* ── Computed translate ── */
  const translatePct = -(currentIndex * (100 / cardsVisible));

  const GAP = 24; // px between cards — used in calc

  return (
    <>
      {/* ── Google Font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        .ps-section * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        .ps-track {
          display: flex;
          gap: ${GAP}px;
          transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
          will-change: transform;
          user-select: none;
        }

        .ps-arrow {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: #fff;
          transition: all 0.2s;
          backdrop-filter: blur(8px);
          flex-shrink: 0;
        }
        .ps-arrow:hover { background: #F59E0B; border-color: #F59E0B; color: #0E0E1A; }
        .ps-arrow:disabled { opacity: 0.25; cursor: not-allowed; }
        .ps-arrow:disabled:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); color: #fff; }

        .ps-dot {
          height: 6px; border-radius: 999px;
          border: none; cursor: pointer; padding: 0;
          transition: all 0.3s;
        }
      `}</style>

      <section
        className="ps-section"
        style={{
          background: '#0C0C16',
          padding: '96px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: -120, left: -120,
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: -120, right: -80,
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
          }} />
          {/* Fine grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

          {/* ── Header ── */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, gap: 24, flexWrap: 'wrap' }}>
            <div>
              <p style={{
                margin: '0 0 12px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#F59E0B',
              }}>
                Our Portfolio
              </p>
              <h2 style={{
                margin: 0,
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 800,
                color: '#fff',
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: 1.15,
              }}>
                Featured
                <span style={{ color: '#f5880bff' }}>Projects</span>
              </h2>
              
            </div>

            {/* Navigation arrows top-right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                className="ps-arrow"
                onClick={() => goTo(currentIndex - 1)}
                disabled={currentIndex === 0}
                aria-label="Previous"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                className="ps-arrow"
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex >= maxIndex}
                aria-label="Next"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* ── Slider viewport ── */}
          <div
            style={{ overflow: 'hidden', cursor: 'grab' }}
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
          >
            <div
              ref={trackRef}
              className="ps-track"
              style={{
                /* Each card width = (viewport - gaps) / cardsVisible */
                '--card-width': `calc((100% - ${(cardsVisible - 1) * GAP}px) / ${cardsVisible})`,
                transform: `translateX(calc(${translatePct}% - ${currentIndex * GAP}px))`,
              }}
            >
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={openModal} />
              ))}
            </div>
          </div>

          {/* ── Dots + counter ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 40 }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  className="ps-dot"
                  onClick={() => goTo(i)}
                  style={{
                    width: i === currentIndex ? 28 : 6,
                    background: i === currentIndex ? '#F59E0B' : 'rgba(255,255,255,0.2)',
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter pill */}
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              letterSpacing: '0.05em',
            }}>
              {currentIndex + 1}–{Math.min(currentIndex + cardsVisible, PROJECTS.length)} / {PROJECTS.length}
            </span>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {activeProject && <ProjectModal project={activeProject} onClose={closeModal} />}
    </>
  );
}