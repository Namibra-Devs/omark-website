// pages/AdminDashboard.jsx - Complete Admin Dashboard for Omark Real Estate
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from "../hooks/useEvents";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "../hooks/useProjects";
import { useGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem } from "../hooks/useGallery";
import { authApi } from "../api/auth";
import { eventsApi } from "../api/events";
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
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  LogOut,
  Menu,
  MapPin,
  Clock,
} from "lucide-react";

const EMPTY_FORM = {
  title: "", description: "", date: "", time: "", location: "",
  category: "", status: "upcoming", featured: false, maxAttendees: "",
  features: [], completion: "", tags: [], units: "", size: "", completionDate: "",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || { name: "Admin", email: "" }; }
    catch { return { name: "Admin", email: "" }; }
  })();

  // Auth guard
  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) navigate("/login");
  }, [navigate]);

  // React Query — data
  const { data: eventsData } = useEvents({ page: 1, limit: 100 });
  const { data: projectsData } = useProjects({ page: 1, limit: 100 });
  const { data: galleryData } = useGallery({ page: 1, limit: 100 });

  const events = eventsData?.data ?? [];
  const projects = projectsData?.data ?? [];
  const gallery = galleryData?.data ?? [];

  // Mutations
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const createGallery = useCreateGalleryItem();
  const updateGallery = useUpdateGalleryItem();
  const deleteGallery = useDeleteGalleryItem();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    await authApi.logout();
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, value) => {
    setFormData({ ...formData, [field]: value.split(",").map((v) => v.trim()) });
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setImageFile(null);
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(EMPTY_FORM);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingItem(null); setImageFile(null); };

  const saveEvent = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        category: formData.category,
        status: formData.status,
        featured: formData.featured,
        ...(formData.maxAttendees !== "" ? { maxAttendees: Number(formData.maxAttendees) } : {}),
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateEvent.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Event updated successfully!");
      } else {
        await createEvent.mutateAsync(payload);
        showNotification("Event created successfully!");
      }
      closeModal();
    } catch { showNotification("Failed to save event.", "warning"); }
  };

  const saveProject = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        category: formData.category,
        status: formData.status,
        completion: formData.completion,
        units: formData.units,
        size: formData.size,
        completionDate: formData.completionDate,
        features: formData.features,
        featured: formData.featured,
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateProject.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Project updated successfully!");
      } else {
        await createProject.mutateAsync(payload);
        showNotification("Project added successfully!");
      }
      closeModal();
    } catch { showNotification("Failed to save project.", "warning"); }
  };

  const saveGalleryItem = async () => {
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        tags: formData.tags,
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateGallery.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Gallery item updated successfully!");
      } else {
        await createGallery.mutateAsync(payload);
        showNotification("Image added to gallery!");
      }
      closeModal();
    } catch { showNotification("Failed to save gallery item.", "warning"); }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      if (type === "events") await deleteEvent.mutateAsync(id);
      if (type === "projects") await deleteProject.mutateAsync(id);
      if (type === "gallery") await deleteGallery.mutateAsync(id);
      showNotification("Item deleted successfully!", "warning");
    } catch { showNotification("Failed to delete item.", "warning"); }
  };

  const exportRegistrations = (event) => {
    const token = localStorage.getItem("accessToken");
    const url = eventsApi.exportRegistrationsCsv(event.id);
    const a = document.createElement("a");
    a.href = token ? `${url}?token=${token}` : url;
    a.download = `${event.title.replace(/\s/g, "_")}_registrations.csv`;
    a.click();
    showNotification("Registrations export started!");
  };

  // Filtered data
  const filteredEvents = events.filter(
    (e) =>
      e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredGallery = gallery.filter(
    (g) =>
      g.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Stats
  const stats = {
    events: events.length,
    upcomingEvents: events.filter((e) => e.status === "upcoming").length,
    totalRegistrations: events.reduce((sum, e) => sum + (e.registrationCount ?? e.registrations?.length ?? 0), 0),
    projects: projects.length,
    completedProjects: projects.filter((p) => p.status === "Completed").length,
    ongoingProjects: projects.filter((p) => p.status === "Ongoing").length,
    galleryImages: gallery.length,
    totalUnits: projects.reduce((sum, p) => sum + (parseInt(p.units) || 0), 0),
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
                          {event.registrations?.length ?? 0} registered
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

                  {(event.registrations?.length ?? 0) > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                        <h4 className="font-semibold text-[#14141D] flex items-center gap-2">
                          <Users size={16} />
                          Registered Attendees ({event.registrations?.length ?? 0})
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
                            {(event.registrations ?? []).map((reg) => (
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
                      <option value="Community">Community</option>
                      <option value="Career Fair">Career Fair</option>
                    </select>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="past">Past</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <input
                      type="number"
                      name="maxAttendees"
                      placeholder="Max Attendees (optional)"
                      value={formData.maxAttendees}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={!!formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700 font-medium">Featured event</span>
                    </label>
                  </>
                )}

                {modalType === "projects" && (
                  <>
                    <input
                      type="text"
                      name="location"
                      placeholder="Location *"
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
                      <option value="">Select Category *</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
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
                      placeholder="Completion % (e.g., 65%) *"
                      value={formData.completion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="units"
                      placeholder="Units (e.g., 50 Units) *"
                      value={formData.units}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="size"
                      placeholder="Size (e.g., 5 Acres) *"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="date"
                      name="completionDate"
                      placeholder="Completion Date *"
                      value={formData.completionDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="features"
                      placeholder="Features (comma separated) *"
                      onChange={(e) => handleArrayChange("features", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={!!formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700 font-medium">Featured project</span>
                    </label>
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
                  <p className="text-sm text-gray-500 mb-2">
                    {imageFile ? imageFile.name : editingItem?.image ? "Current image — upload new to replace" : "Select image to upload"}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0] || null)}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
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

    </div>
  );
};

export default AdminDashboard;
