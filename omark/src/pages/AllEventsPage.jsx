// pages/AllEventsPage.jsx - Focused on Registered Attendees
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Star,
  User,
  Mail,
  Phone,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load events from localStorage or use default data
    const storedEvents = localStorage.getItem("admin_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Default events data with registrations
      setEvents([
        {
          id: 1,
          title: "Grand Opening: Pankrono Gardens",
          description:
            "Join us for the official launch of our premium residential community. Tour model homes, meet the architects, and enjoy exclusive opening discounts.",
          date: "2025-04-25",
          time: "10:00 AM - 4:00 PM",
          location: "Pankrono Gardens Estate, Kumasi",
          category: "Open House",
          image: "/images/event1.jpeg",
          status: "upcoming",
          registrations: [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              phone: "+233 24 123 4567",
              guests: 2,
              registeredAt: "2025-03-20",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
              phone: "+233 24 765 4321",
              guests: 1,
              registeredAt: "2025-03-21",
            },
            {
              id: 3,
              name: "Michael Asare",
              email: "michael@example.com",
              phone: "+233 24 111 2222",
              guests: 3,
              registeredAt: "2025-03-22",
            },
          ],
        },
        {
          id: 2,
          title: "Homeownership Seminar",
          description:
            "Learn about flexible payment plans, mortgage options, and the home buying process in Ghana. Free consultation available.",
          date: "2025-05-10",
          time: "2:00 PM - 6:00 PM",
          location: "Omark Head Office, Atimatim",
          category: "Seminar",
          image: "/images/event2.jpeg",
          status: "upcoming",
          registrations: [
            {
              id: 4,
              name: "Kwame Mensah",
              email: "kwame@example.com",
              phone: "+233 24 333 4444",
              guests: 1,
              registeredAt: "2025-04-01",
            },
            {
              id: 5,
              name: "Adwoa Serwaa",
              email: "adwoa@example.com",
              phone: "+233 24 555 6666",
              guests: 2,
              registeredAt: "2025-04-02",
            },
          ],
        },
        {
          id: 3,
          title: "Sustainable Building Workshop",
          description:
            "Discover eco-friendly construction techniques, energy-efficient materials, and sustainable design principles for modern homes.",
          date: "2025-05-20",
          time: "9:00 AM - 5:00 PM",
          location: "Green Building Center, Kumasi",
          category: "Workshop",
          image: "/images/event3.jpeg",
          status: "upcoming",
          registrations: [
            {
              id: 6,
              name: "Yaw Asante",
              email: "yaw@example.com",
              phone: "+233 24 777 8888",
              guests: 1,
              registeredAt: "2025-04-10",
            },
          ],
        },
        {
          id: 4,
          title: "Real Estate Investment Expo 2025",
          description:
            "Connect with investors, explore opportunities in Ghana's real estate market, and learn about high-return property investments.",
          date: "2025-06-05",
          time: "10:00 AM - 7:00 PM",
          location: "Kumasi City Mall",
          category: "Expo",
          image: "/images/1.jpeg",
          status: "upcoming",
          registrations: [
            {
              id: 7,
              name: "Nana Kofi",
              email: "nana@example.com",
              phone: "+233 24 999 0000",
              guests: 4,
              registeredAt: "2025-04-15",
            },
            {
              id: 8,
              name: "Ama Serwaa",
              email: "ama@example.com",
              phone: "+233 24 111 3333",
              guests: 2,
              registeredAt: "2025-04-16",
            },
            {
              id: 9,
              name: "Kweku Annan",
              email: "kweku@example.com",
              phone: "+233 24 555 7777",
              guests: 1,
              registeredAt: "2025-04-17",
            },
          ],
        },
        {
          id: 5,
          title: "Community Open Day",
          description:
            "Family-friendly event with games, food, and tours of our completed communities. Meet your future neighbors!",
          date: "2025-06-15",
          time: "11:00 AM - 6:00 PM",
          location: "Heritage Villas, East Legon",
          category: "Community",
          image: "/images/2.jpeg",
          status: "upcoming",
          registrations: [],
        },
        {
          id: 6,
          title: "Construction Career Fair",
          description:
            "Career opportunities in construction, architecture, and real estate. Meet hiring managers and submit your resume.",
          date: "2025-06-28",
          time: "9:00 AM - 4:00 PM",
          location: "Omark Construction Site Office",
          category: "Career Fair",
          image: "/images/event6.jpg",
          status: "upcoming",
          registrations: [
            {
              id: 10,
              name: "Eric Boateng",
              email: "eric@example.com",
              phone: "+233 24 222 4444",
              guests: 1,
              registeredAt: "2025-05-01",
            },
          ],
        },
        {
          id: 7,
          title: "Luxury Property Showcase",
          description:
            "Exclusive preview of our premium villas and luxury estates. Private tours and champagne reception.",
          date: "2025-07-12",
          time: "3:00 PM - 8:00 PM",
          location: "Heritage Villas, East Legon",
          category: "Open House",
          image: "/images/event7.jpg",
          status: "upcoming",
          registrations: [],
        },
        {
          id: 8,
          title: "Digital Marketing for Real Estate",
          description:
            "Learn how to effectively market properties online, leverage social media, and attract more buyers.",
          date: "2025-07-25",
          time: "10:00 AM - 4:00 PM",
          location: "Omark Training Center, Pankrono",
          category: "Workshop",
          image: "/images/event8.jpg",
          status: "upcoming",
          registrations: [],
        },
        {
          id: 9,
          title: "Annual Real Estate Gala",
          description:
            "Celebrating excellence in real estate development. Awards ceremony, networking, and entertainment.",
          date: "2025-08-20",
          time: "6:00 PM - 11:00 PM",
          location: "Kumasi City Hotel",
          category: "Expo",
          image: "/images/event9.jpg",
          status: "upcoming",
          registrations: [],
        },
      ]);
    }
    setIsLoading(false);
  }, []);

  const categories = [
    "all",
    "Open House",
    "Seminar",
    "Workshop",
    "Expo",
    "Community",
    "Career Fair",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAttendeesModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = "unset";
  };

  const exportRegistrations = (event) => {
    const headers = ["Name", "Email", "Phone", "Guests", "Registered Date"];
    const rows = event.registrations.map((r) => [
      r.name,
      r.email,
      r.phone,
      r.guests,
      r.registeredAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/\s/g, "_")}_attendees.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Open House":
        return "bg-green-100 text-green-700";
      case "Seminar":
        return "bg-blue-100 text-blue-700";
      case "Workshop":
        return "bg-purple-100 text-purple-700";
      case "Expo":
        return "bg-amber-100 text-amber-700";
      case "Community":
        return "bg-teal-100 text-teal-700";
      case "Career Fair":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.registrations?.length || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero1.jpeg" // add your image here
            alt="Event Attendees"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1920x800/14141D/f59e0b?text=Events+Hero";
            }}
          />

          {/* 🔥 Left Dark → Right Transparent Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/95 via-[#14141D]/70 to-transparent"></div>

          {/* Optional bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/60 via-transparent to-transparent"></div>
        </div>

        {/* Decorative blobs (subtle) */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>

        {/* Content (LEFT aligned for readability) */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <Users size={12} className="text-red-500" />
              <span className="text-red-400 text-xs font-semibold">
                Event Registrations
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              Registered <span className="text-red-700">Attendees</span>
            </h1>

            {/* Divider */}
            <div className="w-16 h-1 bg-red-500 mb-4"></div>
            {/* Description */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              View and manage all registered attendees for our events and
              community gatherings.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
                <span className="text-red-400 font-bold">
                  {events.length}
                </span>
                <span className="text-gray-300 text-sm ml-1">Total Events</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
                <span className="text-red-400 font-bold">
                  {totalRegistrations}
                </span>
                <span className="text-gray-300 text-sm ml-1">
                  Total Attendees
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search events or attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md cursor-pointer capitalize transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All Events" : category}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md w-full justify-center"
            >
              <Filter size={18} />
              Filter Events
              <ChevronDown
                size={16}
                className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {isFilterOpen && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg capitalize text-sm transition-all ${
                      selectedCategory === category
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    {category === "all" ? "All Events" : category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events with Attendees Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading attendees...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No events found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4 text-red-600 hover:text-red-700 font-semibold"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center flex-wrap gap-2">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-amber-600">
                    {filteredEvents.length}
                  </span>{" "}
                  of <span className="font-semibold">{events.length}</span>{" "}
                  events
                </p>
                <p className="text-sm text-gray-500">
                  Total Attendees:{" "}
                  <span className="font-semibold text-red-600">
                    {totalRegistrations}
                  </span>
                </p>
              </div>
              <div className="space-y-6">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    {/* Event Header */}
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-xl font-bold text-[#14141D]">
                              {event.title}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}
                            >
                              {event.category}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openAttendeesModal(event)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer text-sm font-semibold transition-all"
                          >
                            <Eye size={16} />
                            View {event.registrations?.length || 0} Attendees
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Attendees Preview */}
                    {event.registrations && event.registrations.length > 0 ? (
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold text-[#14141D] flex items-center gap-2">
                            <Users size={16} />
                            Recent Attendees
                          </h4>
                          <button
                            onClick={() => exportRegistrations(event)}
                            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                          >
                            <Download size={14} />
                            Export CSV
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {event.registrations.slice(0, 3).map((attendee) => (
                            <div
                              key={attendee.id}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <User size={16} className="text-red-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-[#14141D]">
                                  {attendee.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {attendee.email}
                                </p>
                              </div>
                              <div className="text-xs text-gray-400">
                                {attendee.guests} guest
                                {attendee.guests !== 1 ? "s" : ""}
                              </div>
                            </div>
                          ))}
                        </div>
                        {event.registrations.length > 3 && (
                          <button
                            onClick={() => openAttendeesModal(event)}
                            className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
                          >
                            View all {event.registrations.length} attendees
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <div className="text-gray-400 text-sm">
                          No attendees registered yet
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Attendees Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#14141D]">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedEvent.registrations?.length || 0} registered
                    attendees
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportRegistrations(selectedEvent)}
                    className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition cursor-pointer"
                  >
                    <Download size={16} />
                    Export CSV
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body - Attendees List */}
              <div className="overflow-y-auto p-6">
                {selectedEvent.registrations &&
                selectedEvent.registrations.length > 0 ? (
                  <div className="space-y-3">
                    {selectedEvent.registrations.map((attendee, idx) => (
                      <div
                        key={attendee.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#14141D]">
                              {attendee.name}
                            </h4>
                            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                              <div className="flex items-center gap-1">
                                <Mail size={12} />
                                {attendee.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone size={12} />
                                {attendee.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-red-600">
                            {attendee.guests} guest
                            {attendee.guests !== 1 ? "s" : ""}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Registered: {attendee.registeredAt}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <p className="text-gray-500">
                      No attendees registered for this event yet
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 text-center">
                <p className="text-xs text-gray-500">
                  Total: {selectedEvent.registrations?.length || 0} attendees
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Admin Button */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 text-center">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          ← Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AllEventsPage;
