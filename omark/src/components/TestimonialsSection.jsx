// components/TestimonialsSection.jsx - Testimonials Section for Homepage
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, User, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const testimonials = [
    {
      id: 1,
      name: 'Kwame Osei',
      location: 'Pankrono Gardens Resident',
      rating: 5,
      content: 'I purchased my first home through Omark Real Estate, and the experience was seamless. Their team guided me through every step. The quality of construction is exceptional.',
      date: 'March 2025'
    },
    {
      id: 2,
      name: 'Adwoa Mensah',
      location: 'Atimatim Heights',
      rating: 5,
      content: 'The flexible payment plan made it possible for me to own a home. Omark truly understands the needs of Ghanaians and provides affordable solutions without compromising on quality.',
      date: 'February 2025'
    },
    {
      id: 3,
      name: 'Michael Asare',
      location: 'Commercial Client',
      rating: 5,
      content: 'Omark handled our commercial construction project professionally and delivered ahead of schedule. Their attention to detail and project management skills are top-notch.',
      date: 'January 2025'
    },
    {
      id: 4,
      name: 'Dr. Sarah Johnson',
      location: 'Heritage Villas',
      rating: 5,
      content: 'The team at Omark went above and beyond to ensure my custom-built home exceeded my expectations. Their architects are creative and responsive.',
      date: 'December 2024'
    },
    {
      id: 5,
      name: 'James Ankrah',
      location: 'Investor',
      rating: 5,
      content: 'I have invested in multiple Omark properties, and each has provided excellent returns. Their understanding of the Ghanaian real estate market is unmatched.',
      date: 'November 2024'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = testimonials.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  const handlePrev = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#14141D] mt-2">
            What Our <span className="text-red-800">Clients Say</span>
          </h2>
        
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Read experiences from our satisfied homeowners, investors, and commercial clients.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-white shadow-lg hover:bg-red-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer">
              <ChevronLeft size={20} />
            </button>
          )}
          {currentIndex < maxIndex && (
            <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-white shadow-lg hover:bg-red-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer">
              <ChevronRight size={20} />
            </button>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0" style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 24 / cardsPerView}px)` }}>
                  <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all">
                    <Quote size={32} className="text-red-500 opacity-50 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-red-600 text-red-500" />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <User size={18} className="text-red-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#14141D]">{testimonial.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={10} />
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default TestimonialsSection;