// pages/EventsPage.jsx - Updated with Hero Image and Registration Modal
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Search, Filter, ChevronDown, X, User, Mail, Phone, Send, CheckCircle } from 'lucide-react';

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
      title: 'Grand Opening: Pankrono Gardens',
      description: 'Join us for the official launch of our premium residential community. Tour model homes, meet the architects, and enjoy exclusive opening discounts.',
      date: 'April 25, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Pankrono Gardens Estate, Kumasi',
      image: '/images/event1.jpg',
      category: 'Open House',
      status: 'Upcoming',
      maxAttendees: 100,
      currentRegistrations: 45
    },
    {
      id: 2,
      title: 'Homeownership Seminar',
      description: 'Learn about flexible payment plans, mortgage options, and the home buying process in Ghana. Free consultation available.',
      date: 'May 10, 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Omark Head Office, Atimatim',
      image: '/images/event2.jpg',
      category: 'Seminar',
      status: 'Upcoming',
      maxAttendees: 50,
      currentRegistrations: 28
    },
    {
      id: 3,
      title: 'Sustainable Building Workshop',
      description: 'Discover eco-friendly construction techniques, energy-efficient materials, and sustainable design principles for modern homes.',
      date: 'May 20, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Green Building Center, Kumasi',
      image: '/images/event3.jpg',
      category: 'Workshop',
      status: 'Limited Spots',
      maxAttendees: 30,
      currentRegistrations: 28
    },
    {
      id: 4,
      title: 'Real Estate Investment Expo',
      description: 'Connect with investors, explore opportunities in Ghana\'s real estate market, and learn about high-return property investments.',
      date: 'June 5, 2025',
      time: '10:00 AM - 7:00 PM',
      location: 'Kumasi City Mall',
      image: '/images/event4.jpg',
      category: 'Expo',
      status: 'Upcoming',
      maxAttendees: 200,
      currentRegistrations: 95
    },
    {
      id: 5,
      title: 'Community Open Day',
      description: 'Family-friendly event with games, food, and tours of our completed communities. Meet your future neighbors!',
      date: 'June 15, 2025',
      time: '11:00 AM - 6:00 PM',
      location: 'Heritage Villas, East Legon',
      image: '/images/event5.jpg',
      category: 'Community',
      status: 'Upcoming',
      maxAttendees: 150,
      currentRegistrations: 72
    },
    {
      id: 6,
      title: 'Construction Career Fair',
      description: 'Career opportunities in construction, architecture, and real estate. Meet hiring managers and submit your resume.',
      date: 'June 28, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Omark Construction Site Office',
      image: '/images/event6.jpg',
      category: 'Career Fair',
      status: 'Upcoming',
      maxAttendees: 80,
      currentRegistrations: 34
    }
  ];

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

  const categories = ['all', 'Open House', 'Seminar', 'Workshop', 'Expo', 'Community', 'Career Fair'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Limited Spots':
        return 'bg-orange-100 text-orange-700';
      case 'Upcoming':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvailableSpots = (event) => {
    return event.maxAttendees - event.currentRegistrations;
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

  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/hero1.jpeg"
      alt="Events at Omark Real Estate"
      className="w-full h-full object-cover"
    />

  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center pt-20">
    {/* your content stays the same */}
  </div>
</section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter - Desktop */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full justify-center"
            >
              <Filter size={18} />
              Filter Events
              <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Filter Dropdown */}
          {isFilterOpen && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg capitalize text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-amber-600 hover:text-amber-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400/e5e7eb/6b7280?text=Event';
                      }}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="inline-block bg-amber-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        {event.category}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    {getAvailableSpots(event) < 20 && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-block bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          Only {getAvailableSpots(event)} left!
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{event.time.split(' - ')[0]}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#14141D] mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin size={14} />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-gray-500">
                        <span className="font-semibold text-amber-600">{getAvailableSpots(event)}</span> spots remaining
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-semibold">{event.currentRegistrations}</span> registered
                      </div>
                    </div>
                    
                    <button
                      onClick={() => openModal(event)}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2"
                    >
                      Register Now
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#14141D] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for event announcements and real estate insights
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-amber-600 hover:bg-amber-700 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300">
              Subscribe
            </button>
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
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2"
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

export default EventsPage;