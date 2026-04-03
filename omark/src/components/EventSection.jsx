// components/EventSection.jsx - Updated with Registration Modal
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight, X, User, Mail, Phone, Send, CheckCircle } from 'lucide-react';

const EventSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventId: null,
    eventTitle: '',
    numberOfGuests: '1',
    specialRequests: ''
  });

  const events = [
    {
      id: 1,
      title: 'Homeownership Seminar',
      description: 'Learn about flexible payment plans, mortgage options, and the home buying process in Ghana. Free consultation available.',
      date: 'April 25, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Pankrono Gardens Estate, Kumasi',
      image: '/images/1.jpeg',
      category: 'Open House',
      featured: true,
      registrationLink: '/events/register/1'
    },
    {
      id: 2,
      title: 'Grand Opening: Pankrono Gardens',
      description: 'Join us for the official launch of our premium residential community. Tour model homes, meet the architects, and enjoy exclusive opening discounts.',
      date: 'May 10, 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Omark Head Office, Atimatim',
      image: '/images/hero1.jpeg',
      category: 'Seminar',
      featured: false,
      registrationLink: '/events/register/2'
    },
    {
      id: 3,
      title: 'Sustainable Building Workshop',
      description: 'Discover eco-friendly construction techniques, energy-efficient materials, and sustainable design principles for modern homes.',
      date: 'May 20, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Green Building Center, Kumasi',
      image: '/images/house1.jpeg',
      category: 'Workshop',
      featured: false,
      registrationLink: '/events/register/3'
    },
    {
      id: 4,
      title: 'Real Estate Investment Expo',
      description: 'Connect with investors, explore opportunities in Ghana\'s real estate market, and learn about high-return property investments.',
      date: 'June 5, 2025',
      time: '10:00 AM - 7:00 PM',
      location: 'Kumasi City Mall',
      image: '/images/2.jpeg',
      category: 'Expo',
      featured: true,
      registrationLink: '/events/register/4'
    },
    {
      id: 5,
      title: 'Community Open Day',
      description: 'Family-friendly event with games, food, and tours of our completed communities. Meet your future neighbors!',
      date: 'June 15, 2025',
      time: '11:00 AM - 6:00 PM',
      location: 'Heritage Villas, East Legon',
      image: '/images/event1.jpeg',
      category: 'Community',
      featured: false,
      registrationLink: '/events/register/5'
    },
    {
      id: 6,
      title: 'Construction Career Fair',
      description: 'Career opportunities in construction, architecture, and real estate. Meet hiring managers and submit your resume.',
      date: 'June 28, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Omark Construction Site Office',
      image: '/images/hero-home.jpg',
      category: 'Career Fair',
      featured: false,
      registrationLink: '/events/register/6'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const totalCards = events.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setFormData({
      ...formData,
      eventId: event.id,
      eventTitle: event.title,
      numberOfGuests: '1',
      specialRequests: ''
    });
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      eventId: null,
      eventTitle: '',
      numberOfGuests: '1',
      specialRequests: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send to backend API
    console.log('Registration submitted:', { ...formData, event: selectedEvent });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      closeModal();
    }, 2500);
  };

  const featuredEvents = events.filter(event => event.featured);

  const getAvailableSpots = (event) => {
    return event.maxAttendees - event.currentRegistrations;
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">Upcoming Events</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#14141D] mt-2">
              Join Our <span className="text-amber-600">Community Events</span>
            </h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mt-4"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Stay connected with Omark through our exciting events, workshops, and community gatherings
            </p>
          </div>

          {/* Featured Event Banner */}
          {featuredEvents.length > 0 && (
            <div className="mb-16 bg-gradient-to-r from-amber-600 to-amber-800 rounded-md overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 md:p-10 text-white">
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    FEATURED EVENT
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredEvents[0].title}</h3>
                  <p className="text-amber-50 mb-4 line-clamp-2">{featuredEvents[0].description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} />
                      <span>{featuredEvents[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} />
                      <span>{featuredEvents[0].time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} />
                      <span>{featuredEvents[0].location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => openModal(featuredEvents[0])}
                    className="inline-flex items-center gap-2 bg-white text-amber-700 px-6 py-2.5 rounded-md font-semibold hover:bg-[#14141D] hover:text-white cursor-pointer transition-all duration-300 shadow-lg"
                  >
                    Register Now
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img
                    src={featuredEvents[0].image}
                    alt={featuredEvents[0].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/800x600/f59e0b/white?text=Featured+Event';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-amber-700/50 to-transparent md:hidden"></div>
                </div>
              </div>
            </div>
          )}

          {/* Events Slider */}
          <div className="relative">
            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-amber-700 shadow-lg hover:bg-amber-600 text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-300 animate-pulse cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {currentIndex < maxIndex && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-amber-700 shadow-lg hover:bg-amber-600 text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-300 animate-pulse cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Events Grid */}
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
              >
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex-shrink-0 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                    style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 24 / cardsPerView}px)` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x400/e5e7eb/6b7280?text=Event';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block bg-amber-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{event.time.split(' - ')[0]}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#14141D] mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={12} />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <button
                          onClick={() => openModal(event)}
                          className="text-amber-600 font-semibold text-sm hover:gap-2 hover:text-[#14141D] cursor-pointer transition-all inline-flex items-center gap-1"
                        >
                          Register
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Events Button */}
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-[#14141D] hover:text-white text-white px-8 py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-md"
            >
              View All Events
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#14141D]">Register for Event</h3>
                <p className="text-sm text-gray-500">{selectedEvent.title}</p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-amber-100 transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-[#14141D] mb-2">Registration Successful!</h4>
                <p className="text-gray-600">
                  Thank you for registering for <strong>{selectedEvent.title}</strong>.
                  We will send a confirmation email with event details shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Event Details Summary */}
                <div className="bg-amber-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-amber-600" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={14} className="text-amber-600" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <MapPin size={14} className="text-amber-600" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-amber-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Spots Available:</span>
                      <span className="font-semibold text-amber-600">{getAvailableSpots(selectedEvent)} remaining</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests (including you)</label>
                  <select
                    name="numberOfGuests"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea
                    name="specialRequests"
                    rows={2}
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-[#14141D] text-white hover:text-amber-700 py-3 rounded-md cursor-pointer font-semibold transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2"
                >
                  Complete Registration
                  <Send size={18} />
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By registering, you agree to our event terms and conditions. You will receive a confirmation email.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default EventSection;