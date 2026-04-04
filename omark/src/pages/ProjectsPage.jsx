// pages/ProjectsPage.jsx - Updated Modal with Gallery Navigation
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Calendar,
  MapPin,
  Users,
  Ruler,
  CheckCircle,
  Clock,
  ArrowRight,
  ZoomIn,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Pankrono Gardens",
      description:
        "A modern residential community featuring 50 luxury homes with smart home technology, landscaped gardens, and 24/7 security. Each home comes with premium finishes and energy-efficient appliances.",
      shortDesc: "Modern residential community with 50 luxury homes",
      image: "/images/3.jpeg",
      gallery: [
        "/images/4.jpeg",
        "/images/5.jpeg",
        "/images/6.jpeg",
        "/images/7.jpeg",
        "/images/8.jpeg",
      ],
      status: "Completed",
      category: "Residential",
      location: "Pankrono, Kumasi",
      completionDate: "March 2024",
      size: "5 Acres",
      units: "50 Units",
      features: [
        "Smart Home Technology",
        "Landscaped Gardens",
        "24/7 Security",
        "Swimming Pool",
        "Clubhouse",
        "Solar Panels",
      ],
      completion: "100%",
    },
    {
      id: 2,
      title: "Atimatim Heights",
      description:
        "Affordable housing project with flexible payment plans, featuring modern 2 & 3 bedroom homes perfect for first-time homeowners. Includes community spaces and playgrounds.",
      shortDesc: "Affordable housing with flexible payment plans",
      image: "/images/9.jpeg",
      gallery: [
        "/images/10.jpeg",
        "/images/11.jpeg",
        "/images/12.jpeg",
        "/images/13.jpeg",
        "/images/14.jpeg",
      ],
      status: "Ongoing",
      category: "Residential",
      location: "Atimatim, Kumasi",
      completionDate: "December 2025",
      size: "8 Acres",
      units: "120 Units",
      features: [
        "Flexible Payment Plans",
        "Community Center",
        "Playground",
        "Borehole",
        "Security Lighting",
      ],
      completion: "65%",
    },
    {
      id: 3,
      title: "Kumasi Central Mall",
      description:
        "A state-of-the-art commercial complex with retail spaces, office suites, and entertainment facilities designed for modern business and shopping experiences.",
      shortDesc: "Commercial complex with retail and office spaces",
      image: "/images/16.jpeg",
      gallery: [
        "/images/15.jpeg",
        "/images/16.jpeg",
        "/images/17.jpeg",
        "/images/18.jpeg",
        "/images/19.jpeg",
      ],
      status: "Coming Soon",
      category: "Commercial",
      location: "Central Business District, Kumasi",
      completionDate: "June 2026",
      size: "12 Acres",
      units: "80+ Stores",
      features: [
        "Food Court",
        "Cinema",
        "Parking Garage",
        "Rooftop Garden",
        "EV Charging",
      ],
      completion: "25%",
    },
    {
      id: 4,
      title: "Heritage Villas",
      description:
        "Premium gated community with custom-built villas featuring private pools, rooftop gardens, and panoramic city views. The epitome of luxury living in Kumasi.",
      shortDesc: "Premium gated community with smart home features",
      image: "/images/20.jpeg",
      gallery: [
        "/images/20.jpeg",
        "/images/21.jpeg",
        "/images/22.jpeg",
        "/images/23.jpeg",
        "/images/24.jpeg",
      ],
      status: "Completed",
      category: "Luxury",
      location: "East Legon, Kumasi",
      completionDate: "January 2024",
      size: "15 Acres",
      units: "25 Villas",
      features: [
        "Private Pools",
        "Rooftop Gardens",
        "Smart Home",
        "Concierge Service",
        "Gym",
        "Spa",
      ],
      completion: "100%",
    },
    {
      id: 5,
      title: "Garden City Residences",
      description:
        "Eco-friendly residential development with solar panels, rainwater harvesting, and community gardens. Sustainable living without compromising on comfort.",
      shortDesc: "Eco-friendly residential development",
      image: "/images/25.jpeg",
      gallery: [
        "/images/25.jpeg",
        "/images/26.jpeg",
        "/images/27.jpeg",
        "/images/28.jpeg",
        "/images/29.jpeg",
      ],
      status: "Ongoing",
      category: "Residential",
      location: "Asokwa, Kumasi",
      completionDate: "August 2025",
      size: "10 Acres",
      units: "85 Units",
      features: [
        "Solar Panels",
        "Rainwater Harvesting",
        "Community Gardens",
        "Bike Lanes",
        "Recycling Center",
      ],
      completion: "45%",
    },
    {
      id: 6,
      title: "Tech Hub Tower",
      description:
        "Modern commercial tower with co-working spaces, conference facilities, and tech incubation centers. Designed for the future of work.",
      shortDesc: "Commercial tower with co-working spaces",
      image: "/images/30.jpeg",
      gallery: [
        "/images/30.jpeg",
        "/images/31.jpeg",
        "/images/32.jpeg",
        "/images/33.jpeg",
        "/images/34.jpeg",
      ],
      status: "Coming Soon",
      category: "Commercial",
      location: "Airport City, Kumasi",
      completionDate: "March 2026",
      size: "50,000 sqft",
      units: "12 Floors",
      features: [
        "Co-working Spaces",
        "Conference Facilities",
        "Rooftop Cafe",
        "High-speed Internet",
        "24/7 Access",
      ],
      completion: "15%",
    },
  ];

  const statuses = ["all", "Completed", "Ongoing", "Coming Soon"];
  const categories = ["all", "Residential", "Commercial", "Luxury"];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || project.status === selectedStatus;
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, selectedStatus, selectedCategory]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Ongoing":
        return "bg-blue-100 text-blue-700";
      case "Coming Soon":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleBookVisit = () => {
    const phone = "233241234567";
    const message = "Hello, I would like to book a free site visit.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <>
      {/* Hero Section */}
<section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/house1.jpeg"
      alt="Projects at Omark Real Estate"
      className="w-full h-full object-cover"
    />

    {/* Left → Right Gradient (strong left, fades right) */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/95 via-transparent to-transparent"></div>

    {/* Bottom fade (optional depth) */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/40 via-transparent to-transparent"></div>
  </div>

  {/* Content (LEFT aligned) */}
  <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl text-left"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
        <Star size={12} className="text-red-500 fill-red-500" />
        <span className="text-red-400 text-xs font-semibold">
          Our Portfolio
        </span>
      </div>

      {/* Heading (reduced size) */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
        Featured <span className="text-red-500">Projects</span>
      </h1>

      {/* Divider */}
      <div className="w-16 h-1 bg-red-500 mb-4"></div>

      {/* Description (smaller + tighter) */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
        Discover our premium developments that redefine modern living and
        commercial spaces in Ghana.
      </p>
    </motion.div>
  </div>
</section>


      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="hidden md:flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full justify-center"
            >
              <Filter size={18} />
              Filter Projects
              <ChevronDown
                size={16}
                className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {isFilterOpen && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("all");
                  setSelectedCategory("all");
                }}
                className="mt-4 text-red-600 hover:text-red-700 font-semibold"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/600x400/2c3e50/f59e0b?text=${project.title.charAt(0)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(project.status)}`}
                    >
                      {project.status}
                    </div>
                    {project.status === "Ongoing" && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                        <div
                          className="h-full bg-red-500 transition-all duration-500"
                          style={{ width: project.completion }}
                        ></div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex gap-4">
                        <button className="bg-white text-red-600 p-3 rounded-full hover:scale-110 transition-transform">
                          <ZoomIn size={20} />
                        </button>
                        <button className="bg-white text-red-600 p-3 rounded-full hover:scale-110 transition-transform">
                          <Heart size={20} />
                        </button>
                        <button className="bg-white text-red-600 p-3 rounded-full hover:scale-110 transition-transform">
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <MapPin size={12} />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#14141D] mb-2 group-hover:text-red-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Ruler size={14} className="text-red-600" />
                        <span>{project.size}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users size={14} className="text-red-600" />
                        <span>{project.units}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        Details
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal with Gallery Navigation */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-red-500 cursor-pointer text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Gallery Section with Navigation */}
              <div className="relative bg-gray-900">
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <img
                    src={selectedProject.gallery?.[currentImageIndex] || selectedProject.image}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/1200x800/2c3e50/f59e0b?text=Image+${currentImageIndex + 1}`;
                    }}
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#14141D] cursor-pointer animate-pulse hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#14141D] cursor-pointer animate-pulse hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm z-10">
                      {currentImageIndex + 1} / {selectedProject.gallery.length}
                    </div>
                  )}

                  {/* Thumbnail Navigation */}
                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {selectedProject.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === idx
                              ? "w-6 bg-red-600"
                              : "bg-white/60 hover:bg-white"
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold z-10 ${getStatusBadgeColor(selectedProject.status)}`}
                >
                  {selectedProject.status}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin size={14} />
                  <span>{selectedProject.location}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#14141D] mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Project Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <Calendar size={18} className="text-red-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Completion</div>
                    <div className="text-sm font-semibold">
                      {selectedProject.completionDate}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <Ruler size={18} className="text-red-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Size</div>
                    <div className="text-sm font-semibold">
                      {selectedProject.size}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <Users size={18} className="text-red-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Units</div>
                    <div className="text-sm font-semibold">
                      {selectedProject.units}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <Clock size={18} className="text-red-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Progress</div>
                    <div className="text-sm font-semibold">
                      {selectedProject.completion}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#14141D] mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedProject.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle size={14} className="text-red-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact"
                    className="flex-1 inline-flex items-center justify-center bg-red-800 hover:bg-[#14141D] text-white py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    Request More Information
                  </Link>

                  <button
                    onClick={handleBookVisit}
                    className="flex-1 inline-flex bg-[#14141D] text-white items-center justify-center gap-2 border-2 border-red-600 hover:bg-red-800 hover:text-white py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M16 .396C7.163.396 0 7.56 0 16.396c0 2.89.756 5.71 2.193 8.2L.04 32l7.623-2.136a15.93 15.93 0 0 0 8.337 2.33c8.837 0 16-7.164 16-16S24.837.396 16 .396zm0 29.25a13.2 13.2 0 0 1-6.73-1.84l-.48-.28-4.53 1.27 1.21-4.42-.31-.5a13.18 13.18 0 1 1 10.84 5.77zm7.34-9.88c-.4-.2-2.36-1.17-2.72-1.3-.36-.13-.62-.2-.88.2s-1 1.3-1.22 1.57c-.22.27-.44.3-.82.1-.38-.2-1.6-.59-3.05-1.88-1.13-1-1.9-2.24-2.12-2.62-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.1-.2-.88-2.13-1.2-2.92-.32-.77-.65-.66-.88-.67h-.75c-.25 0-.66.1-1 .47-.34.38-1.3 1.27-1.3 3.1 0 1.83 1.33 3.6 1.52 3.85.19.25 2.63 4.02 6.37 5.63.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.36-.96 2.7-1.89.34-.93.34-1.73.24-1.89-.1-.16-.36-.25-.75-.45z" />
                    </svg>
                    Book Free Site Visit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <ContactSection />

      <style jsx>{`
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

export default ProjectsPage;