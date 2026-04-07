// pages/AdminDashboard.jsx - Complete Admin Dashboard for Omark Real Estate
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Home,
  Image,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  RefreshCw,
  LogOut,
  Menu,
  Bell,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Tag,
  Save,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Star,
  Building2,
  Shield,
  Settings,
  BarChart3,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Heart,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@omarkrealestate.com",
  });

  // Data states
  const [events, setEvents] = useState([
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
      ],
    },
    {
      id: 2,
      title: "Homeownership Seminar",
      description:
        "Learn about flexible payment plans, mortgage options, and the home buying process in Ghana.",
      date: "2025-05-10",
      time: "2:00 PM - 6:00 PM",
      location: "Omark Head Office, Atimatim",
      category: "Seminar",
      image: "/images/event2.jpeg",
      status: "upcoming",
      registrations: [],
    },
    {
      id: 3,
      title: "Sustainable Building Workshop",
      description:
        "Discover eco-friendly construction techniques and sustainable design principles.",
      date: "2025-05-20",
      time: "9:00 AM - 5:00 PM",
      location: "Green Building Center, Kumasi",
      category: "Workshop",
      image: "/images/event3.jpeg",
      status: "upcoming",
      registrations: [],
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Pankrono Gardens",
      description:
        "Modern residential community with 50 luxury homes featuring smart home technology and landscaped gardens.",
      location: "Pankrono, Kumasi",
      status: "Completed",
      category: "Residential",
      image: "/images/10.jpeg",
      completion: "100%",
      features: [
        "Smart Home",
        "Swimming Pool",
        "24/7 Security",
        "Clubhouse",
        "Solar Panels",
      ],
      units: "50 Units",
      size: "5 Acres",
      completionDate: "March 2024",
    },
    {
      id: 2,
      title: "Atimatim Heights",
      description:
        "Affordable housing project with flexible payment plans for first-time homeowners.",
      location: "Atimatim, Kumasi",
      status: "Ongoing",
      category: "Residential",
      image: "/images/19.jpeg",
      completion: "65%",
      features: [
        "Community Center",
        "Playground",
        "Borehole",
        "Security Lighting",
      ],
      units: "120 Units",
      size: "8 Acres",
      completionDate: "December 2025",
    },
    {
      id: 3,
      title: "Kumasi Central Mall",
      description:
        "State-of-the-art commercial complex with retail spaces and office suites.",
      location: "Central Business District, Kumasi",
      status: "Coming Soon",
      category: "Commercial",
      image: "/images/24.jpeg",
      completion: "25%",
      features: ["Food Court", "Cinema", "Parking Garage", "Rooftop Garden"],
      units: "80+ Stores",
      size: "12 Acres",
      completionDate: "June 2026",
    },
  ]);

  const [gallery, setGallery] = useState([
    {
      id: 1,
      title: "Pankrono Gardens - Exterior",
      category: "Residential",
      image: "/images/hse2.webp",
      tags: ["Luxury", "Modern"],
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "Luxury Villa Interior",
      category: "Residential",
      image: "/images/hse4.webp",
      tags: ["Interior", "Luxury"],
      date: "2024-02-10",
    },
    {
      id: 3,
      title: "Luxury Kitchen Design",
      category: "Commercial",
      image: "/images/hse8.webp",
      tags: ["Luxury", "Modern"],
      date: "2024-01-20",
    },
    {
      id: 4,
      title: "Construction Progress",
      category: "Construction",
      image: "/images/7.jpeg",
      tags: ["Construction", "Progress"],
      date: "2024-03-01",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: "",
    status: "upcoming",
    features: [],
    completion: "",
    tags: [],
    units: "",
    size: "",
    completionDate: "",
  });

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("admin_session_start");
    navigate("/login");
    showNotification("Logged out successfully", "info");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle array fields
  const handleArrayChange = (field, value) => {
    const array = value.split(",").map((item) => item.trim());
    setFormData({ ...formData, [field]: array });
  };

  // Open modal
  const openModal = (type, item = null) => {
    setModalType(type);
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        image: "",
        status: "upcoming",
        features: [],
        completion: "",
        tags: [],
        units: "",
        size: "",
        completionDate: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Save event
  const saveEvent = () => {
    if (editingItem) {
      setEvents(
        events.map((e) =>
          e.id === editingItem.id
            ? { ...formData, id: e.id, registrations: e.registrations }
            : e,
        ),
      );
      showNotification("Event updated successfully!");
    } else {
      const newEvent = { ...formData, id: Date.now(), registrations: [] };
      setEvents([...events, newEvent]);
      showNotification("Event created successfully!");
    }
    closeModal();
  };

  // Save project
  const saveProject = () => {
    if (editingItem) {
      setProjects(
        projects.map((p) =>
          p.id === editingItem.id ? { ...formData, id: p.id } : p,
        ),
      );
      showNotification("Project updated successfully!");
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }]);
      showNotification("Project added successfully!");
    }
    closeModal();
  };

  // Save gallery item
  const saveGalleryItem = () => {
    if (editingItem) {
      setGallery(
        gallery.map((g) =>
          g.id === editingItem.id
            ? {
                ...formData,
                id: g.id,
                date: new Date().toISOString().split("T")[0],
              }
            : g,
        ),
      );
      showNotification("Gallery item updated successfully!");
    } else {
      setGallery([
        ...gallery,
        {
          ...formData,
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      showNotification("Image added to gallery!");
    }
    closeModal();
  };

  // Delete item
  const deleteItem = (type, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (type === "events") setEvents(events.filter((e) => e.id !== id));
      if (type === "projects") setProjects(projects.filter((p) => p.id !== id));
      if (type === "gallery") setGallery(gallery.filter((g) => g.id !== id));
      showNotification("Item deleted successfully!", "warning");
    }
  };

  // Export registrations to CSV
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
    a.download = `${event.title.replace(/\s/g, "_")}_registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Registrations exported successfully!");
  };

  // Filtered data
  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredGallery = gallery.filter(
    (g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Stats
  const stats = {
    events: events.length,
    upcomingEvents: events.filter((e) => e.status === "upcoming").length,
    totalRegistrations: events.reduce(
      (sum, e) => sum + e.registrations.length,
      0,
    ),
    projects: projects.length,
    completedProjects: projects.filter((p) => p.status === "Completed").length,
    ongoingProjects: projects.filter((p) => p.status === "Ongoing").length,
    galleryImages: gallery.length,
    totalUnits: projects.reduce((sum, p) => {
      const units = parseInt(p.units) || 0;
      return sum + units;
    }, 0),
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Ongoing":
        return "bg-blue-100 text-blue-700";
      case "Coming Soon":
        return "bg-red-100 text-red-700";
      case "upcoming":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


const renderContent = () => {
  switch (activeTab) {
    case "events":
      return (
        <div>
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-[#14141D]">
              Manage Events
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/all-events")}
                className="flex items-center gap-2 bg-[#14141D] hover:bg-[#2a2a3c] text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md hover:shadow-lg"
              >
                <Eye size={18} />
                View All Events
              </button>
              <button
                onClick={() => openModal("events")}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md hover:shadow-lg"
              >
                <Plus size={18} />
                Create Event
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-[#14141D]">
                          {event.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(event.status)}`}
                        >
                          {event.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {event.description}
                      </p>
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
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {event.registrations.length} registered
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("events", event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem("events", event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {event.registrations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                        <h4 className="font-semibold text-[#14141D] flex items-center gap-2">
                          <Users size={16} />
                          Registered Attendees ({event.registrations.length})
                        </h4>
                        <button
                          onClick={() => exportRegistrations(event)}
                          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 cursor-pointer transition"
                        >
                          <Download size={14} />
                          Export CSV
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left">Name</th>
                              <th className="px-4 py-2 text-left">Email</th>
                              <th className="px-4 py-2 text-left">Phone</th>
                              <th className="px-4 py-2 text-left">Guests</th>
                              <th className="px-4 py-2 text-left">
                                Registered
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {event.registrations.map((reg) => (
                              <tr
                                key={reg.id}
                                className="border-b border-gray-100"
                              >
                                <td className="px-4 py-2">{reg.name}</td>
                                <td className="px-4 py-2">{reg.email}</td>
                                <td className="px-4 py-2">{reg.phone}</td>
                                <td className="px-4 py-2">{reg.guests}</td>
                                <td className="px-4 py-2">
                                  {reg.registeredAt}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "projects":
      return (
        <div>
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-[#14141D]">
              Manage Projects
            </h2>
            <button
              onClick={() => openModal("projects")}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => openModal("projects", project)}
                      className="p-1.5 bg-white/90 rounded-lg hover:bg-blue-500 hover:text-white transition"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => deleteItem("projects", project.id)}
                      className="p-1.5 bg-white/90 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  {project.status === "Ongoing" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{ width: project.completion }}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#14141D] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                    <MapPin size={10} />
                    {project.location}
                  </p>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span>{project.units}</span>
                      <span>•</span>
                      <span>{project.size}</span>
                    </div>
                    <span className="text-xs text-amber-600 font-semibold">
                      {project.completion}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "gallery":
      return (
        <div>
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-[#14141D]">
              Gallery Management
            </h2>
            <button
              onClick={() => openModal("gallery")}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              Add Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all"
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => openModal("gallery", item)}
                      className="p-1.5 bg-white/90 rounded-lg hover:bg-blue-500 hover:text-white transition"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => deleteItem("gallery", item.id)}
                      className="p-1.5 bg-white/90 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

  const sidebarItems = [
    { id: "events", label: "Events", icon: Calendar, color: "text-red-500" },
    { id: "projects", label: "Projects", icon: Home, color: "text-red-500" },
    { id: "gallery", label: "Gallery", icon: Image, color: "text-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : notification.type === "warning"
                  ? "bg-orange-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#14141D] to-[#1a1a25] text-white transition-all duration-300 z-30 ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              {/* Logo Image */}
              <div className="w-8 h-8 overflow-hidden bg-white flex items-center justify-center shadow-sm">
                <img
                  src="/images/logo1.png"
                  alt="Omark Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* Brand Name */}
              <span className="font-serif font-bold text-lg ">
                Omark<span className="text-red-500">Admin</span>
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-md overflow-hidden bg-white flex items-center justify-center mx-auto shadow-sm">
              <img
                src="/images/logo1.png" // ensure it exists in public/images
                alt="Omark Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-white/10 rounded-lg transition"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-red-800 text-white shadow-lg"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          {isSidebarOpen ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={user.profileImage || "/images/user4.webp"} // fallback image
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/default-avatar.png";
                    }}
                  />
                </div>

                <span className="hidden md:inline text-gray-700">
                  {user.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.events}
                </div>
                <div className="text-sm text-gray-500">Total Events</div>
              </div>
              <Calendar size={32} className="text-gray-300" />
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {stats.upcomingEvents} upcoming
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.totalRegistrations}
                </div>
                <div className="text-sm text-gray-500">Registrations</div>
              </div>
              <Users size={32} className="text-gray-300" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.projects}
                </div>
                <div className="text-sm text-gray-500">Total Projects</div>
              </div>
              <Home size={32} className="text-gray-300" />
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {stats.completedProjects} completed, {stats.ongoingProjects}{" "}
              ongoing
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.galleryImages}
                </div>
                <div className="text-sm text-gray-500">Gallery Images</div>
              </div>
              <Image size={32} className="text-gray-300" />
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {stats.totalUnits}+ housing units
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">{renderContent()}</div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#14141D]">
                  {editingItem ? "Edit" : "Add"}{" "}
                  {modalType === "events"
                    ? "Event"
                    : modalType === "projects"
                      ? "Project"
                      : "Gallery Image"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />

                {modalType === "events" && (
                  <>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="time"
                      placeholder="Time (e.g., 10:00 AM - 4:00 PM)"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select Category</option>
                      <option value="Open House">Open House</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Expo">Expo</option>
                    </select>
                  </>
                )}

                {modalType === "projects" && (
                  <>
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </select>
                    <input
                      type="text"
                      name="completion"
                      placeholder="Completion % (e.g., 65%)"
                      value={formData.completion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="units"
                      placeholder="Units (e.g., 50 Units)"
                      value={formData.units}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="size"
                      placeholder="Size (e.g., 5 Acres)"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="features"
                      placeholder="Features (comma separated)"
                      onChange={(e) =>
                        handleArrayChange("features", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </>
                )}

                {modalType === "gallery" && (
                  <>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select Category</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Construction">Construction</option>
                      <option value="Events">Events</option>
                    </select>
                    <input
                      type="text"
                      name="tags"
                      placeholder="Tags (comma separated)"
                      onChange={(e) =>
                        handleArrayChange("tags", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </>
                )}

                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Image URL will be provided by API
                  </p>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (modalType === "events") saveEvent();
                      else if (modalType === "projects") saveProject();
                      else saveGalleryItem();
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
