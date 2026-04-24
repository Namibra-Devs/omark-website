// pages/EventsPage.jsx - Updated with Hero Image and Registration Modal
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Calendar, MapPin, Clock, ArrowRight, Search, Filter, ChevronDown, X, User, Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import Stats from '@/components/Stats';
import VideoBanner from '@/components/VideoBanner';
import { useEvents } from '../hooks/useEvents';
import { eventsApi } from '../api/events';

const STATIC_EVENTS = [
  { id: 1, title: 'Grand Opening: Pankrono Gardens', description: 'Join us for the official launch of our premium residential community. Tour model homes, meet the architects, and enjoy exclusive opening discounts.', date: 'April 25, 2025', time: '10:00 AM - 4:00 PM', location: 'Pankrono Gardens Estate, Kumasi', image: '/images/2.jpeg', category: 'Open House', status: 'upcoming', maxAttendees: 100, currentRegistrations: 45 },
  { id: 2, title: 'Homeownership Seminar', description: 'Learn about flexible payment plans, mortgage options, and the home buying process in Ghana. Free consultation available.', date: 'May 10, 2025', time: '2:00 PM - 6:00 PM', location: 'Omark Head Office, Atimatim', image: '/images/event2.jpeg', category: 'Seminar', status: 'upcoming', maxAttendees: 50, currentRegistrations: 28 },
  { id: 3, title: 'Sustainable Building Workshop', description: 'Discover eco-friendly construction techniques, energy-efficient materials, and sustainable design principles for modern homes.', date: 'May 20, 2025', time: '9:00 AM - 5:00 PM', location: 'Green Building Center, Kumasi', image: '/images/hero1.jpeg', category: 'Workshop', status: 'upcoming', maxAttendees: 30, currentRegistrations: 28 },
  { id: 4, title: 'Real Estate Investment Expo', description: "Connect with investors, explore opportunities in Ghana's real estate market, and learn about high-return property investments.", date: 'June 5, 2025', time: '10:00 AM - 7:00 PM', location: 'Kumasi City Mall', image: '/images/1.jpeg', category: 'Expo', status: 'upcoming', maxAttendees: 200, currentRegistrations: 95 },
  { id: 5, title: 'Community Open Day', description: 'Family-friendly event with games, food, and tours of our completed communities. Meet your future neighbors!', date: 'June 15, 2025', time: '11:00 AM - 6:00 PM', location: 'Heritage Villas, East Legon', image: '/images/event3.jpeg', category: 'Community', status: 'upcoming', maxAttendees: 150, currentRegistrations: 72 },
  { id: 6, title: 'Construction Career Fair', description: 'Career opportunities in construction, architecture, and real estate. Meet hiring managers and submit your resume.', date: 'June 28, 2025', time: '9:00 AM - 4:00 PM', location: 'Omark Construction Site Office', image: '/images/21.jpeg', category: 'Career Fair', status: 'upcoming', maxAttendees: 80, currentRegistrations: 34 },
];

const EMPTY_FORM = { fullName: '', email: '', phone: '', numberOfGuests: '1', specialRequests: '' };

const getEventField = (e, ...keys) => { for (const k of keys) if (e[k] != null) return e[k]; return ''; };
const formatEventDate = (val) => {
  if (!val) return '';
  if (typeof val === 'string' && !/^\d{4}-/.test(val)) return val;
  try { return new Date(val).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); } catch { return val; }
};

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  const { data: eventsData } = useEvents({ limit: 50 });

  const events = (() => {
    const list = Array.isArray(eventsData) ? eventsData : (eventsData?.data ?? null);
    return list && list.length > 0 ? list : STATIC_EVENTS;
  })();

  const registerMutation = useMutation({
    mutationFn: ({ eventId, payload }) => eventsApi.register(eventId, payload),
  });

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const allCategories = ['all', ...Array.from(new Set(events.map(e => e.category).filter(Boolean)))];

  const filteredEvents = events.filter(event => {
    const title = event.title ?? '';
    const description = event.description ?? '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    const s = (status ?? '').toLowerCase();
    if (s.includes('limit') || s.includes('few')) return 'bg-orange-100 text-orange-700';
    if (s === 'upcoming' || s === 'open') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setFormData(EMPTY_FORM);
    setIsSubmitted(false);
    setSubmitError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData(EMPTY_FORM);
    setSubmitError('');
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    try {
      await registerMutation.mutateAsync({
        eventId: selectedEvent.id,
        payload: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          guests: parseInt(formData.numberOfGuests, 10),
        },
      });
      setIsSubmitted(true);
      setTimeout(() => closeModal(), 2500);
    } catch (err) {
      setSubmitError(err?.response?.data?.message ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/event1.jpeg"
      alt="Events at Omark Real Estate"
      className="w-full h-full object-cover"
    />

  </div>
    {/* Left → Right Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/95 via-transparent to-transparent"></div>
    
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter - Desktop */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
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
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg capitalize text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
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
                className="mt-4 text-red-600 hover:text-red-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => {
                const eventDate = formatEventDate(getEventField(event, 'date', 'startDate', 'eventDate'));
                const eventTime = getEventField(event, 'time', 'startTime', 'eventTime');
                const eventLocation = getEventField(event, 'location', 'venue', 'address');
                const eventImage = getEventField(event, 'image', 'imageUrl', 'thumbnail');
                const spots = event.maxAttendees != null && event.currentRegistrations != null
                  ? event.maxAttendees - event.currentRegistrations : null;
                return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={eventImage}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = 'https://placehold.co/600x400/e5e7eb/6b7280?text=Event'; }}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="inline-block bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        {event.category}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    {spots != null && spots < 20 && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-block bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          Only {spots} left!
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{eventDate}</span>
                      </div>
                      {eventTime && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{eventTime.split(' - ')[0]}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-[#14141D] mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin size={14} />
                      <span className="line-clamp-1">{eventLocation}</span>
                    </div>

                    {spots != null && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs text-gray-500">
                          <span className="font-semibold text-red-600">{spots}</span> spots remaining
                        </div>
                        {event.currentRegistrations != null && (
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold">{event.currentRegistrations}</span> registered
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => openModal(event)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 cursor-pointer text-white py-2.5 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2"
                    >
                      Register Now
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

     <Stats/>
     <VideoBanner/>

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
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 cursor-pointer transition-colors"
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
                <div className="bg-red-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-red-600" />
                      <span>{formatEventDate(getEventField(selectedEvent, 'date', 'startDate', 'eventDate'))}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={14} className="text-red-600" />
                      <span>{getEventField(selectedEvent, 'time', 'startTime', 'eventTime')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <MapPin size={14} className="text-red-600" />
                      <span>{getEventField(selectedEvent, 'location', 'venue', 'address')}</span>
                    </div>
                  </div>
                  {selectedEvent.maxAttendees != null && selectedEvent.currentRegistrations != null && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Spots Available:</span>
                        <span className="font-semibold text-red-600">{selectedEvent.maxAttendees - selectedEvent.currentRegistrations} remaining</span>
                      </div>
                    </div>
                  )}
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
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 cursor-pointer text-white py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {registerMutation.isPending ? (
                    <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                  ) : (
                    <>Complete Registration <Send size={18} /></>
                  )}
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