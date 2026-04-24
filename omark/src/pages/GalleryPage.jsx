// pages/GalleryPage.jsx - Premium Gallery Page
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  ZoomIn,
  Heart,
  Share2,
  Grid,
  LayoutGrid,
  Image as ImageIcon,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowRight,
} from "lucide-react";
import Stats from "@/components/Stats";
import { useGallery, useGalleryCategories } from "../hooks/useGallery";

const STATIC_GALLERY = [
  { id: 1, title: "Pankrono Gardens - Exterior View", description: "Modern luxury homes with landscaped gardens and smart home technology", category: "Residential", subcategory: "Exterior", image: "/images/hse1.webp", location: "Pankrono, Kumasi", date: "March 2024", tags: ["Luxury", "Modern", "Smart Home"], featured: true },
  { id: 2, title: "Luxury Villa Interior", description: "Spacious living room with premium finishes and natural lighting", category: "Residential", subcategory: "Interior", image: "/images/house1.jpeg", location: "Heritage Villas, Kumasi", date: "January 2024", tags: ["Interior", "Luxury", "Modern"], featured: true },
  { id: 3, title: "Modern Kitchen Design", description: "State-of-the-art kitchen with smart appliances and elegant cabinetry", category: "Residential", subcategory: "Interior", image: "/images/hse7.webp", location: "Pankrono Gardens", date: "February 2024", tags: ["Kitchen", "Modern", "Luxury"], featured: false },
  { id: 4, title: "Master Bedroom Suite", description: "Spacious master bedroom with walk-in closet and en-suite bathroom", category: "Residential", subcategory: "Interior", image: "/images/bed1.webp", location: "Atimatim Heights", date: "December 2023", tags: ["Bedroom", "Luxury", "Modern"], featured: false },
  { id: 5, title: "Modern House Aerial View", description: "State-of-the-art commercial complex in the heart of Kumasi", category: "Commercial", subcategory: "Exterior", image: "/images/hse6.webp", location: "Central Business District, Kumasi", date: "March 2024", tags: ["Commercial", "Retail", "Modern"], featured: true },
  { id: 6, title: "Modern Office Space", description: "Contemporary office design with open floor plan and natural light", category: "Commercial", subcategory: "Interior", image: "/images/hse9.webp", location: "Tech Hub Tower", date: "February 2024", tags: ["Office", "Modern", "Commercial"], featured: false },
  { id: 7, title: "Retail Space Design", description: "Elegant retail environment with premium finishes", category: "Commercial", subcategory: "Interior", image: "/images/hse3.webp", location: "Kumasi Central Mall", date: "January 2024", tags: ["Retail", "Commercial", "Modern"], featured: false },
  { id: 8, title: "Construction Progress - Atimatim Heights", description: "Aerial view of ongoing construction at Atimatim Heights", category: "Construction", subcategory: "Process", image: "/images/21.jpeg", location: "Atimatim, Kumasi", date: "March 2024", tags: ["Construction", "Progress", "Aerial"], featured: true },
  { id: 9, title: "Quality Materials", description: "Premium construction materials ensuring durability and safety", category: "Construction", subcategory: "Materials", image: "/images/25.jpeg", location: "Pankrono Gardens", date: "February 2024", tags: ["Materials", "Quality", "Construction"], featured: false },
  { id: 10, title: "Expert Craftsmanship", description: "Skilled workers demonstrating precision and expertise", category: "Construction", subcategory: "Team", image: "/images/house2.webp", location: "Various Sites", date: "January 2024", tags: ["Team", "Craftsmanship", "Construction"], featured: false },
  { id: 11, title: "Grand Opening Celebration", description: "Community gathering at the launch of Pankrono Gardens", category: "Events", subcategory: "Ceremony", image: "/images/event1.jpeg", location: "Pankrono Gardens", date: "March 2024", tags: ["Event", "Community", "Celebration"], featured: true },
  { id: 12, title: "Homeownership Seminar", description: "Educational event for first-time homebuyers", category: "Events", subcategory: "Seminar", image: "/images/1.jpeg", location: "Omark Head Office", date: "February 2024", tags: ["Seminar", "Education", "Community"], featured: false },
];

const normalizeGalleryItem = (item) => ({
  id: item.id,
  title: item.title ?? item.name ?? '',
  description: item.description ?? '',
  category: item.category ?? 'Uncategorized',
  subcategory: item.subcategory ?? 'General',
  image: item.image ?? item.imageUrl ?? item.url ?? item.thumbnail ?? '',
  location: item.location ?? '',
  date: item.date ?? (item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''),
  tags: Array.isArray(item.tags) ? item.tags : [],
  featured: item.featured ?? item.isFeatured ?? false,
});

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedView, setSelectedView] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [likedImages, setLikedImages] = useState([]);

  const { data: galleryData } = useGallery({ limit: 100 });
  const { data: categoryData } = useGalleryCategories();

  const galleryItems = (() => {
    const list = Array.isArray(galleryData) ? galleryData : (galleryData?.data ?? null);
    if (list && list.length > 0) return list.map(normalizeGalleryItem);
    return STATIC_GALLERY;
  })();

  const apiCategories = Array.isArray(categoryData) ? categoryData : [];
  const derivedCategories = Array.from(new Set(galleryItems.map((i) => i.category).filter(Boolean)));
  const categories = ["all", ...(apiCategories.length > 0 ? apiCategories : derivedCategories)];

  const subcategories = {
    all: [],
    Residential: ["All", "Exterior", "Interior"],
    Commercial: ["All", "Exterior", "Interior"],
    Construction: ["All", "Process", "Materials", "Team"],
    Events: ["All", "Ceremony", "Seminar"],
  };

  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLightboxOpen]);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesSearch =
        (item.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags ?? []).some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSubcategory =
        selectedSubcategory === "All" || item.subcategory === selectedSubcategory;
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [searchTerm, selectedCategory, selectedSubcategory, galleryItems]);

  const featuredItems = galleryItems.filter((item) => item.featured);

  const toggleLike = (id) => {
    setLikedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const openLightbox = (item) => {
    setSelectedImage(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedImage.id,
    );
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedImage.id,
    );
    const prevIndex =
      (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
    <div className="bg-white min-h-screen overflow-hidden">
      {/* 🔥 Modern Gallery Hero */}
      <section className="relative h-[75vh] min-h-[420px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/house3.webp"
            alt="Omark Real Estate Gallery"
            className="w-full h-full object-cover"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/1920x600/14141D/f59e0b?text=Gallery")
            }
          />

          {/* Left Dark → Right Transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/95 via-[#14141D]/70 to-transparent"></div>

          {/* Subtle bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/40 via-transparent to-transparent"></div>
        </div>

        {/* Content (LEFT) */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <ImageIcon size={12} className="text-red-500" />
              <span className="text-red-400 text-xs font-semibold">
                Our Visual Story
              </span>
            </div>

            {/* Heading (reduced + cleaner) */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              Project <span className="text-red-500">Gallery</span>
            </h1>

            {/* Divider */}
            <div className="w-16 h-1 bg-red-500 mb-4"></div>
            {/* Description */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              Explore our portfolio of premium properties, construction
              projects, and community experiences captured in motion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">
                {galleryItems.length}+
              </div>
              <div className="text-xs text-gray-500">Photos</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">
                4
              </div>
              <div className="text-xs text-gray-500">Categories</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">
                12+
              </div>
              <div className="text-xs text-gray-500">Projects Featured</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">
                {likedImages.length}
              </div>
              <div className="text-xs text-gray-500">Liked Photos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#14141D] mt-2">
              Editor's <span className="text-red-700">Picks</span>
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => openLightbox(item)}
              >
                <div className="relative h-80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/600x500/2c3e50/f59e0b?text=" +
                        item.title.charAt(0))
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{item.location}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="hidden md:flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("All");
                }}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              {selectedCategory !== "all" && (
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  {subcategories[selectedCategory]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedView("grid")}
                  className={`p-2.5 rounded-md cursor-pointer transition-all ${selectedView === "grid" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setSelectedView("masonry")}
                  className={`p-2.5 rounded-md cursor-pointer transition-all ${selectedView === "masonry" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full justify-center"
            >
              <Filter size={18} />
              Filter Gallery
              <ChevronDown
                size={16}
                className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {isFilterOpen && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <select
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white"
              >
                <option value="grid">Grid View</option>
                <option value="masonry">Masonry View</option>
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🖼️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No images found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedSubcategory("All");
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
              className={`grid gap-6 ${
                selectedView === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) =>
                        (e.target.src =
                          "https://placehold.co/600x500/2c3e50/f59e0b?text=" +
                          item.title.charAt(0))
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">
                      {item.category}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                      >
                        <Heart
                          size={14}
                          className={
                            likedImages.includes(item.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }
                        />
                      </button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                        <Share2 size={14} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Quick View */}
                    <div className="absolute inset-0 bg-red-600/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="bg-white text-red-600 p-3 rounded-full hover:scale-110 transition-transform">
                        <ZoomIn size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-[#14141D] mb-1 group-hover:text-red-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <MapPin size={10} />
                      <span>{item.location}</span>
                      <Calendar size={10} />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <div className="relative h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-red-500 cursor-pointer text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-red-500 animate-pulse cursor-pointer text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-red-500 animate-pulse cursor-pointer text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {selectedImage.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {selectedImage.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {selectedImage.date}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedImage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => window.open(selectedImage.image, "_blank")}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 hover:bg-amber-500 text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Download size={18} />
                </button>
              </motion.div>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {filteredItems.findIndex((i) => i.id === selectedImage.id) + 1}{" "}
                / {filteredItems.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Stats/>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-700 to-red-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to See More?
          </h2>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Visit our properties in person or schedule a virtual tour of our
            premium developments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule a Tour
              <Calendar size={18} />
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-amber-700 transition-all duration-300"
            >
              View All Projects
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
