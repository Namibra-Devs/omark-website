// pages/AdminDashboard.jsx - Complete Admin Dashboard for Omark Real Estate
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent, useEventRegistrations } from "../hooks/useEvents";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "../hooks/useProjects";
import { useGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem } from "../hooks/useGallery";
import { useNews, useCreateNewsArticle, useUpdateNewsArticle, useDeleteNewsArticle } from "../hooks/useNews";
import { useCareers, useCreateCareer, useUpdateCareer, useDeleteCareer } from "../hooks/useCareers";
import { useContactMessages, useUpdateContactStatus, useDeleteContactMessage } from "../hooks/useContact";
import { useFaqs, useCreateFaq, useUpdateFaq, useDeleteFaq } from "../hooks/useFaqs";
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from "../hooks/useTestimonials";
import { usePrograms, useCreateProgram, useUpdateProgram, useDeleteProgram } from "../hooks/usePrograms";
import { authApi } from "../api/auth";
import { eventsApi } from "../api/events";
import { careersApi } from "../api/careers";
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
  Newspaper,
  Briefcase,
  MessageSquare,
  Mail,
  Phone,
  HelpCircle,
  Star,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const EMPTY_FORM = {
  // shared
  title: "", description: "", category: "", status: "upcoming", featured: false,
  // events & programs
  date: "", time: "", location: "", maxAttendees: "",
  // projects
  completion: "", units: "", size: "", completionDate: "", features: [],
  // news
  content: "", excerpt: "", author: "", readTime: "",
  // jobs
  department: "", type: "Full-time", requirements: [], benefits: [],
  salary: "", experience: "", active: true,
  // faqs
  question: "", answer: "", order: 0,
  // testimonials
  name: "", role: "", company: "", rating: 5, approved: false,
  // programs
  capacity: "",
};

const flatten = (d) => {
  if (!d) return [];
  return Array.isArray(d) ? d : (d?.data ?? []);
};

const regCount = (e) =>
  e.currentRegistrations ?? e.registrationCount ?? e.registrationsCount ??
  e.totalRegistrations ?? e._count?.registrations ?? e.registrations?.length ?? 0;

const EventRegistrationsList = ({ eventId, onExport, event }) => {
  const { data, isLoading } = useEventRegistrations(eventId);
  const regs = flatten(data);
  if (isLoading) return (
    <div className="py-6 text-center text-gray-400 text-sm">Loading registrations…</div>
  );
  if (!regs.length) return (
    <div className="py-6 text-center text-gray-400 text-sm">No registrations yet.</div>
  );
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-[#14141D] flex items-center gap-1.5">
          <Users size={15} /> {regs.length} Registrant{regs.length !== 1 ? "s" : ""}
        </p>
        <button onClick={() => onExport(event)} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 cursor-pointer">
          <Download size={14} /> Export CSV
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-4 py-2.5 text-left">Name</th>
              <th className="px-4 py-2.5 text-left">Email</th>
              <th className="px-4 py-2.5 text-left">Phone</th>
              <th className="px-4 py-2.5 text-left">Guests</th>
              <th className="px-4 py-2.5 text-left">Registered</th>
            </tr>
          </thead>
          <tbody>
            {regs.map((reg, i) => (
              <tr key={reg.id ?? i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 font-medium text-[#14141D]">{reg.name ?? `${reg.firstName ?? ""} ${reg.lastName ?? ""}`.trim()}</td>
                <td className="px-4 py-2.5 text-gray-600">{reg.email}</td>
                <td className="px-4 py-2.5 text-gray-600">{reg.phone ?? "—"}</td>
                <td className="px-4 py-2.5 text-gray-600">{reg.guests ?? reg.numberOfGuests ?? 0}</td>
                <td className="px-4 py-2.5 text-gray-500">{reg.registeredAt ?? reg.createdAt ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
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
  const [viewingContact, setViewingContact] = useState(null);
  const [expandedEventId, setExpandedEventId] = useState(null);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || { name: "Admin", email: "" }; }
    catch { return { name: "Admin", email: "" }; }
  })();

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) navigate("/login");
  }, [navigate]);

  // Queries
  const { data: eventsData } = useEvents({ page: 1, limit: 100 });
  const { data: projectsData } = useProjects({ page: 1, limit: 100 });
  const { data: galleryData } = useGallery({ page: 1, limit: 100 });
  const { data: newsData } = useNews({ page: 1, limit: 100 });
  const { data: careersData } = useCareers({ page: 1, limit: 100 });
  const { data: contactsData } = useContactMessages({ page: 1, limit: 100 });
  const { data: faqsData } = useFaqs({ page: 1, limit: 100 });
  const { data: testimonialsData } = useTestimonials({ page: 1, limit: 100 });
  const { data: programsData } = usePrograms({ page: 1, limit: 100 });

  const events = eventsData?.data ?? [];
  const projects = projectsData?.data ?? [];
  const gallery = galleryData?.data ?? [];
  const newsArticles = flatten(newsData);
  const jobs = flatten(careersData);
  const contacts = flatten(contactsData).map(c => ({ ...c, id: c.id ?? c._id }));
  const faqs = flatten(faqsData);
  const testimonials = flatten(testimonialsData);
  const programs = flatten(programsData);

  // Mutations — events/projects/gallery
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const createGallery = useCreateGalleryItem();
  const updateGallery = useUpdateGalleryItem();
  const deleteGallery = useDeleteGalleryItem();
  // Mutations — news/jobs/contacts
  const createNews = useCreateNewsArticle();
  const updateNews = useUpdateNewsArticle();
  const deleteNews = useDeleteNewsArticle();
  const createCareer = useCreateCareer();
  const updateCareer = useUpdateCareer();
  const deleteCareer = useDeleteCareer();
  const updateContactStatus = useUpdateContactStatus();
  const deleteContact = useDeleteContactMessage();
  // Mutations — faqs/testimonials/programs
  const createFaq = useCreateFaq();
  const updateFaq = useUpdateFaq();
  const deleteFaq = useDeleteFaq();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const createProgram = useCreateProgram();
  const updateProgram = useUpdateProgram();
  const deleteProgram = useDeleteProgram();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    await authApi.logout();
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData({ ...formData, [name]: inputType === "checkbox" ? checked : value });
  };

  const handleArrayChange = (field, value) => {
    setFormData({ ...formData, [field]: value.split(",").map((v) => v.trim()).filter(Boolean) });
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setImageFile(null);
    if (item) {
      setEditingItem(item);
      setFormData({ ...EMPTY_FORM, ...item });
    } else {
      setEditingItem(null);
      setFormData(EMPTY_FORM);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingItem(null); setImageFile(null); };

  // ── Save functions ──────────────────────────────────────────

  const saveEvent = async () => {
    try {
      const payload = {
        title: formData.title, description: formData.description,
        date: formData.date, time: formData.time, location: formData.location,
        category: formData.category, status: formData.status, featured: formData.featured,
        ...(formData.maxAttendees !== "" ? { maxAttendees: Number(formData.maxAttendees) } : {}),
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateEvent.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Event updated!");
      } else {
        await createEvent.mutateAsync(payload);
        showNotification("Event created!");
      }
      closeModal();
    } catch { showNotification("Failed to save event.", "warning"); }
  };

  const saveProject = async () => {
    try {
      const payload = {
        title: formData.title, description: formData.description,
        location: formData.location, category: formData.category, status: formData.status,
        completion: formData.completion, units: formData.units, size: formData.size,
        completionDate: formData.completionDate, features: formData.features,
        featured: formData.featured,
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateProject.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Project updated!");
      } else {
        await createProject.mutateAsync(payload);
        showNotification("Project added!");
      }
      closeModal();
    } catch { showNotification("Failed to save project.", "warning"); }
  };

  const saveGalleryItem = async () => {
    try {
      const payload = {
        title: formData.title, category: formData.category, tags: formData.tags,
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateGallery.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Gallery item updated!");
      } else {
        await createGallery.mutateAsync(payload);
        showNotification("Image added to gallery!");
      }
      closeModal();
    } catch { showNotification("Failed to save gallery item.", "warning"); }
  };

  const saveNews = async () => {
    try {
      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        readTime: formData.readTime,
        featured: formData.featured,
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateNews.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Article updated!");
      } else {
        await createNews.mutateAsync(payload);
        showNotification("Article published!");
      }
      closeModal();
    } catch { showNotification("Failed to save article.", "warning"); }
  };

  const saveJob = async () => {
    try {
      const payload = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        experience: formData.experience,
        description: formData.description,
        requirements: Array.isArray(formData.requirements)
          ? formData.requirements
          : formData.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
        benefits: Array.isArray(formData.benefits)
          ? formData.benefits
          : formData.benefits.split("\n").map((s) => s.trim()).filter(Boolean),
        active: formData.active,
      };
      if (editingItem) {
        await updateCareer.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Job listing updated!");
      } else {
        await createCareer.mutateAsync(payload);
        showNotification("Job listing created!");
      }
      closeModal();
    } catch { showNotification("Failed to save job listing.", "warning"); }
  };

  const saveFaq = async () => {
    try {
      const payload = {
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        order: Number(formData.order) || 0,
        active: formData.active,
      };
      if (editingItem) {
        await updateFaq.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("FAQ updated!");
      } else {
        await createFaq.mutateAsync(payload);
        showNotification("FAQ created!");
      }
      closeModal();
    } catch { showNotification("Failed to save FAQ.", "warning"); }
  };

  const saveTestimonial = async () => {
    try {
      const payload = {
        name: formData.name, role: formData.role, company: formData.company,
        content: formData.content, rating: Number(formData.rating),
        featured: formData.featured, approved: formData.approved,
      };
      if (editingItem) {
        await updateTestimonial.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Testimonial updated!");
      } else {
        await createTestimonial.mutateAsync(payload);
        showNotification("Testimonial added!");
      }
      closeModal();
    } catch { showNotification("Failed to save testimonial.", "warning"); }
  };

  const saveProgram = async () => {
    try {
      const payload = {
        title: formData.title, description: formData.description,
        date: formData.date, time: formData.time, location: formData.location,
        category: formData.category, featured: formData.featured,
        ...(formData.capacity !== "" ? { capacity: Number(formData.capacity) } : {}),
        ...(imageFile ? { image: imageFile } : {}),
      };
      if (editingItem) {
        await updateProgram.mutateAsync({ id: editingItem.id, ...payload });
        showNotification("Program updated!");
      } else {
        await createProgram.mutateAsync(payload);
        showNotification("Program created!");
      }
      closeModal();
    } catch { showNotification("Failed to save program.", "warning"); }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      if (type === "events") await deleteEvent.mutateAsync(id);
      else if (type === "projects") await deleteProject.mutateAsync(id);
      else if (type === "gallery") await deleteGallery.mutateAsync(id);
      else if (type === "news") await deleteNews.mutateAsync(id);
      else if (type === "jobs") await deleteCareer.mutateAsync(id);
      else if (type === "contacts") await deleteContact.mutateAsync(id);
      else if (type === "faqs") await deleteFaq.mutateAsync(id);
      else if (type === "testimonials") await deleteTestimonial.mutateAsync(id);
      else if (type === "programs") await deleteProgram.mutateAsync(id);
      showNotification("Deleted!", "warning");
    } catch { showNotification("Failed to delete.", "warning"); }
  };

  const handleContactStatus = async (id, status) => {
    try {
      await updateContactStatus.mutateAsync({ id, status });
      showNotification(`Marked as ${status}`);
    } catch { showNotification("Failed to update status.", "warning"); }
  };

  const exportRegistrations = async (event) => {
    try {
      await eventsApi.exportRegistrationsCsv(
        event.id,
        `${event.title.replace(/\s+/g, "_")}_registrations.csv`
      );
      showNotification("Export started!");
    } catch {
      showNotification("Export failed.", "warning");
    }
  };

  const exportApplications = (job) => {
    const url = careersApi.exportApplicationsCsv(job.id);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${job.title.replace(/\s/g, "_")}_applications.csv`;
    a.click();
    showNotification("Export started!");
  };

  // Filtered data
  const filteredEvents = events.filter((e) => e.title?.toLowerCase().includes(searchTerm.toLowerCase()) || e.location?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredProjects = projects.filter((p) => p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || p.location?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredGallery = gallery.filter((g) => g.title?.toLowerCase().includes(searchTerm.toLowerCase()) || g.category?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredNews = newsArticles.filter((n) => n.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredJobs = jobs.filter((j) => j.title?.toLowerCase().includes(searchTerm.toLowerCase()) || j.department?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredContacts = contacts.filter((c) => c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.email?.toLowerCase().includes(searchTerm.toLowerCase()) || c.subject?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFaqs = faqs.filter((f) => f.question?.toLowerCase().includes(searchTerm.toLowerCase()) || f.category?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredTestimonials = testimonials.filter((t) => t.name?.toLowerCase().includes(searchTerm.toLowerCase()) || t.company?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPrograms = programs.filter((p) => p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || p.location?.toLowerCase().includes(searchTerm.toLowerCase()));

  // Stats
  const newContacts = contacts.filter((c) => c.status === "new" || !c.status).length;
  const stats = {
    events: events.length,
    upcomingEvents: events.filter((e) => e.status === "upcoming").length,
    totalRegistrations: events.reduce((sum, e) => sum + regCount(e), 0),
    projects: projects.length,
    ongoingProjects: projects.filter((p) => p.status === "Ongoing").length,
    galleryImages: gallery.length,
    newsCount: newsArticles.length,
    jobsCount: jobs.length,
    newContacts,
    faqsCount: faqs.length,
    testimonialsCount: testimonials.length,
    programsCount: programs.length,
  };

  const getStatusBadge = (status) => {
    const map = {
      Completed: "bg-green-100 text-green-700",
      Ongoing: "bg-blue-100 text-blue-700",
      "Coming Soon": "bg-red-100 text-red-700",
      upcoming: "bg-green-100 text-green-700",
      ongoing: "bg-blue-100 text-blue-700",
      past: "bg-gray-100 text-gray-600",
      cancelled: "bg-red-100 text-red-700",
      new: "bg-blue-100 text-blue-700",
      read: "bg-gray-100 text-gray-700",
      replied: "bg-purple-100 text-purple-700",
      resolved: "bg-green-100 text-green-700",
    };
    return map[status] ?? "bg-gray-100 text-gray-700";
  };

  const getModalTitle = () => {
    const a = editingItem ? "Edit" : "Add";
    const map = { events: "Event", projects: "Project", gallery: "Gallery Image", news: "News Article", jobs: "Job Listing", faqs: "FAQ", testimonials: "Testimonial", programs: "Program" };
    return `${a} ${map[modalType] ?? "Item"}`;
  };

  const handleSave = () => {
    if (modalType === "events") saveEvent();
    else if (modalType === "projects") saveProject();
    else if (modalType === "news") saveNews();
    else if (modalType === "jobs") saveJob();
    else if (modalType === "faqs") saveFaq();
    else if (modalType === "testimonials") saveTestimonial();
    else if (modalType === "programs") saveProgram();
    else saveGalleryItem();
  };

  // ── Sidebar ───────────────────────────────────────────────

  const sidebarItems = [
    { id: "events", label: "Events", icon: Calendar, badge: stats.totalRegistrations },
    { id: "projects", label: "Projects", icon: Home },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "programs", label: "Programs", icon: BookOpen },
    { id: "news", label: "News", icon: Newspaper },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "contacts", label: "Contacts", icon: MessageSquare },
  ];

  // ── Tab content ───────────────────────────────────────────

  const renderContent = () => {
    switch (activeTab) {

      // ── EVENTS ────────────────────────────────────────────
      case "events":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">Manage Events</h2>
              <div className="flex gap-3">
                <button onClick={() => navigate("/all-events")} className="flex items-center gap-2 bg-[#14141D] hover:bg-[#2a2a3c] text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                  <Eye size={18} /> View All Events
                </button>
                <button onClick={() => openModal("events")} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                  <Plus size={18} /> Create Event
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-[#14141D]">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(event.status)}`}>{event.status}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={14} />{event.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} />{event.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} />{event.location}</span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {regCount(event)} registered
                          {event.maxAttendees ? ` / ${event.maxAttendees} max` : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpandedEventId(expandedEventId === event.id ? null : event.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${expandedEventId === event.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      >
                        <Users size={15} />
                        {regCount(event)}
                        <ChevronDown size={14} className={`transition-transform ${expandedEventId === event.id ? "rotate-180" : ""}`} />
                      </button>
                      <button onClick={() => openModal("events", event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"><Edit size={18} /></button>
                      <button onClick={() => deleteItem("events", event.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  {expandedEventId === event.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <EventRegistrationsList eventId={event.id} onExport={exportRegistrations} event={event} />
                    </div>
                  )}
                </div>
              ))}
              {filteredEvents.length === 0 && <div className="text-center py-16 text-gray-400">No events found.</div>}
            </div>
          </div>
        );

      // ── PROJECTS ──────────────────────────────────────────
      case "projects":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">Manage Projects</h2>
              <button onClick={() => openModal("projects")} className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                <Plus size={18} /> Add Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button onClick={() => openModal("projects", project)} className="p-1.5 bg-white/90 rounded-lg hover:bg-blue-500 hover:text-white transition"><Edit size={14} /></button>
                      <button onClick={() => deleteItem("projects", project.id)} className="p-1.5 bg-white/90 rounded-lg hover:bg-red-500 hover:text-white transition"><Trash2 size={14} /></button>
                    </div>
                    <div className="absolute bottom-2 left-2"><span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(project.status)}`}>{project.status}</span></div>
                    {project.status === "Ongoing" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200"><div className="h-full bg-amber-500" style={{ width: project.completion }}></div></div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#14141D] mb-1">{project.title}</h3>
                    <p className="text-gray-500 text-xs mb-2 flex items-center gap-1"><MapPin size={10} />{project.location}</p>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{project.units} • {project.size}</span>
                      <span className="text-amber-600 font-semibold">{project.completion}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && <div className="col-span-3 text-center py-16 text-gray-400">No projects found.</div>}
            </div>
          </div>
        );

      // ── GALLERY ───────────────────────────────────────────
      case "gallery":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">Gallery Management</h2>
              <button onClick={() => openModal("gallery")} className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                <Plus size={18} /> Add Image
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGallery.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button onClick={() => openModal("gallery", item)} className="p-1.5 bg-white/90 rounded-lg hover:bg-blue-500 hover:text-white transition"><Edit size={14} /></button>
                      <button onClick={() => deleteItem("gallery", item.id)} className="p-1.5 bg-white/90 rounded-lg hover:bg-red-500 hover:text-white transition"><Trash2 size={14} /></button>
                    </div>
                    <div className="absolute bottom-2 left-2"><span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">{item.category}</span></div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">{item.tags?.slice(0, 2).map((tag) => <span key={tag} className="text-xs text-gray-500">#{tag}</span>)}</div>
                  </div>
                </div>
              ))}
              {filteredGallery.length === 0 && <div className="col-span-4 text-center py-16 text-gray-400">No images found.</div>}
            </div>
          </div>
        );

      // ── PROGRAMS ──────────────────────────────────────────
      case "programs":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">Programs</h2>
              <button onClick={() => openModal("programs")} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                <Plus size={18} /> Add Program
              </button>
            </div>
            <div className="space-y-4">
              {filteredPrograms.map((prog) => (
                <div key={prog.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    {prog.image && <img src={prog.image} alt={prog.title} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />}
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-[#14141D] text-lg">{prog.title}</h3>
                            {prog.featured && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Featured</span>}
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{prog.category}</span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                            {prog.date && <span className="flex items-center gap-1"><Calendar size={13} />{prog.date}</span>}
                            {prog.time && <span className="flex items-center gap-1"><Clock size={13} />{prog.time}</span>}
                            {prog.location && <span className="flex items-center gap-1"><MapPin size={13} />{prog.location}</span>}
                            {prog.capacity && <span className="flex items-center gap-1"><Users size={13} />{prog.registrationCount ?? 0} / {prog.capacity}</span>}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{prog.description}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => openModal("programs", prog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"><Edit size={18} /></button>
                          <button onClick={() => deleteItem("programs", prog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPrograms.length === 0 && <div className="text-center py-16 text-gray-400">No programs found.</div>}
            </div>
          </div>
        );

      // ── NEWS ──────────────────────────────────────────────
      case "news":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">News & Updates</h2>
              <button onClick={() => openModal("news")} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                <Plus size={18} /> New Article
              </button>
            </div>
            <div className="space-y-4">
              {filteredNews.map((article) => (
                <div key={article.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    {article.image && <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-xl flex-shrink-0" />}
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">{article.category}</span>
                            {article.featured && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Featured</span>}
                          </div>
                          <h3 className="font-bold text-[#14141D] text-lg mb-1 line-clamp-1">{article.title}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2">{article.summary ?? article.content?.slice(0, 140)}</p>
                          <div className="flex gap-3 mt-2 text-xs text-gray-400">
                            <span>{article.author}</span>
                            <span>•</span><span>{article.publishedAt ?? article.createdAt}</span>
                            <span>•</span><span>{article.views ?? 0} views</span>
                            <span>•</span><span>{article.likes ?? 0} likes</span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => openModal("news", article)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"><Edit size={18} /></button>
                          <button onClick={() => deleteItem("news", article.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredNews.length === 0 && <div className="text-center py-16 text-gray-400">No articles found.</div>}
            </div>
          </div>
        );

      // ── JOBS ──────────────────────────────────────────────
      case "jobs":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">Job Listings</h2>
              <button onClick={() => openModal("jobs")} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                <Plus size={18} /> Post Job
              </button>
            </div>
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold text-[#14141D]">{job.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${job.active !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                          {job.active !== false ? "Active" : "Closed"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Briefcase size={13} />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={13} />{job.type}</span>
                        {job.experience && <span>{job.experience}</span>}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{job._count?.applications ?? job.applicationsCount ?? 0} applications</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => exportApplications(job)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition cursor-pointer" title="Export applications"><Download size={18} /></button>
                      <button onClick={() => openModal("jobs", job)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"><Edit size={18} /></button>
                      <button onClick={() => deleteItem("jobs", job.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredJobs.length === 0 && <div className="text-center py-16 text-gray-400">No job listings found.</div>}
            </div>
          </div>
        );

      // ── FAQs ──────────────────────────────────────────────
      case "faqs":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">FAQs</h2>
              <button onClick={() => openModal("faqs")} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                <Plus size={18} /> Add FAQ
              </button>
            </div>
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{faq.order ?? idx + 1}</span>
                        {faq.category && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{faq.category}</span>}
                      </div>
                      <p className="font-semibold text-[#14141D] mb-1">{faq.question}</p>
                      <p className="text-gray-500 text-sm">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openModal("faqs", faq)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"><Edit size={16} /></button>
                      <button onClick={() => deleteItem("faqs", faq.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredFaqs.length === 0 && <div className="text-center py-16 text-gray-400">No FAQs found.</div>}
            </div>
          </div>
        );

      // ── TESTIMONIALS ──────────────────────────────────────
      case "testimonials":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">Testimonials</h2>
              <button onClick={() => openModal("testimonials")} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-md cursor-pointer transition-all shadow-md">
                <Plus size={18} /> Add Testimonial
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTestimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg">{t.name?.charAt(0)}</div>
                      )}
                      <div>
                        <p className="font-bold text-[#14141D]">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.role}{t.company ? `, ${t.company}` : ""}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openModal("testimonials", t)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"><Edit size={14} /></button>
                      <button onClick={() => deleteItem("testimonials", t.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < (t.rating ?? 5) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />)}
                  </div>
                  <p className="text-gray-600 text-sm italic line-clamp-3">"{t.text ?? t.content ?? t.message}"</p>
                  {t.featured && <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>}
                </div>
              ))}
              {filteredTestimonials.length === 0 && <div className="col-span-3 text-center py-16 text-gray-400">No testimonials found.</div>}
            </div>
          </div>
        );

      // ── CONTACTS ──────────────────────────────────────────
      case "contacts":
        return (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#14141D]">Contact Messages</h2>
              <span className="text-sm text-gray-500">{stats.newContacts} unread</span>
            </div>
            <div className="space-y-4">
              {filteredContacts.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white rounded-2xl shadow-md border overflow-hidden hover:shadow-lg transition-shadow ${msg.status === "new" || !msg.status ? "border-blue-200" : "border-gray-100"}`}
                >
                  <div className="p-5">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <button
                        onClick={() => {
                          setViewingContact(msg);
                          if (!msg.status || msg.status === "new") handleContactStatus(msg.id, "read");
                        }}
                        className="flex-1 min-w-0 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(msg.status ?? "new")}`}>{msg.status ?? "new"}</span>
                          <span className="text-sm text-gray-400">{msg.createdAt}</span>
                        </div>
                        <h3 className={`font-bold text-[#14141D] mb-1 ${!msg.status || msg.status === "new" ? "font-extrabold" : ""}`}>
                          {msg.subject ?? msg.interest}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                          <span className="flex items-center gap-1"><Users size={13} />{msg.firstName ? `${msg.firstName} ${msg.lastName ?? ""}`.trim() : msg.name}</span>
                          <span className="flex items-center gap-1"><Mail size={13} />{msg.email}</span>
                          {msg.phone && <span className="flex items-center gap-1"><Phone size={13} />{msg.phone}</span>}
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{msg.message}</p>
                      </button>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <select
                          value={msg.status ?? "new"}
                          onChange={(e) => handleContactStatus(msg.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <button onClick={() => deleteItem("contacts", msg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer self-end"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && <div className="text-center py-16 text-gray-400">No contact messages found.</div>}
            </div>
          </div>
        );

      default: return null;
    }
  };

  // ── Modal form fields per type ────────────────────────────

  const renderModalFields = () => {
    switch (modalType) {
      case "events":
        return (
          <>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="time" placeholder="Time (e.g., 10:00 AM – 4:00 PM)" value={formData.time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Category</option>
              {["Open House","Seminar","Workshop","Expo","Community","Career Fair"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              {["upcoming","ongoing","past","cancelled"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <input type="number" name="maxAttendees" placeholder="Max Attendees (optional)" value={formData.maxAttendees} onChange={handleInputChange} min="1" className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" /><span className="text-sm text-gray-700">Featured event</span></label>
          </>
        );
      case "projects":
        return (
          <>
            <input type="text" name="location" placeholder="Location *" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Category *</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
            <input type="text" name="completion" placeholder="Completion % (e.g., 65%)" value={formData.completion} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="units" placeholder="Units (e.g., 50 Units)" value={formData.units} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="size" placeholder="Size (e.g., 5 Acres)" value={formData.size} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="date" name="completionDate" value={formData.completionDate} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="features" placeholder="Features (comma separated)" defaultValue={Array.isArray(formData.features) ? formData.features.join(", ") : ""} onChange={(e) => handleArrayChange("features", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" /><span className="text-sm text-gray-700">Featured project</span></label>
          </>
        );
      case "gallery":
        return (
          <>
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Category</option>
              {["Residential","Commercial","Construction","Events"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" name="tags" placeholder="Tags (comma separated)" defaultValue={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""} onChange={(e) => handleArrayChange("tags", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </>
        );
      case "programs":
        return (
          <>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="time" placeholder="Time (e.g., 9:00 AM – 2:00 PM)" value={formData.time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Category</option>
              {["Training","Workshop","Seminar","Bootcamp","Mentorship"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" name="capacity" placeholder="Capacity (max participants)" value={formData.capacity} onChange={handleInputChange} min="1" className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" /><span className="text-sm text-gray-700">Featured program</span></label>
          </>
        );
      case "news":
        return (
          <>
            <input type="text" name="author" placeholder="Author name *" value={formData.author} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <textarea name="excerpt" placeholder="Excerpt (short summary) *" rows={2} value={formData.excerpt} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <input type="text" name="readTime" placeholder="Read time * (e.g. 5 min read)" value={formData.readTime} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Category</option>
              {["Real Estate","Construction","Market Trends","Company News","Events"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" /><span className="text-sm text-gray-700">Featured article</span></label>
          </>
        );
      case "jobs":
        return (
          <>
            <input type="text" name="department" placeholder="Department *" value={formData.department} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="location" placeholder="Location *" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              {["Full-time","Part-time","Contract","Internship"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="text" name="experience" placeholder="Experience required (e.g. 5+ years) *" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" name="salary" placeholder="Salary (e.g. Competitive)" value={formData.salary} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <textarea name="requirements" placeholder="Requirements (one per line) *" rows={3} value={Array.isArray(formData.requirements) ? formData.requirements.join("\n") : formData.requirements} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <textarea name="benefits" placeholder="Benefits (one per line)" rows={3} value={Array.isArray(formData.benefits) ? formData.benefits.join("\n") : formData.benefits} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="active" checked={!!formData.active} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" /><span className="text-sm text-gray-700">Active listing</span></label>
          </>
        );
      case "faqs":
        return (
          <>
            <input type="text" name="question" placeholder="Question *" value={formData.question} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <textarea name="answer" placeholder="Answer *" rows={4} value={formData.answer} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Category (optional)</option>
              {["General","Buying","Construction","Payment","Legal"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" name="order" placeholder="Display order (e.g. 1, 2, 3)" value={formData.order} onChange={handleInputChange} min="0" className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="active" checked={!!formData.active} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
              <span className="text-sm text-gray-700">Active (visible on site)</span>
            </label>
          </>
        );
      case "testimonials":
        return (
          <>
            <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <input type="text" name="role" placeholder="Role / Title *" value={formData.role} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <input type="text" name="company" placeholder="Company (optional)" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
            <textarea name="content" placeholder="Testimonial content *" rows={4} value={formData.content} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select name="rating" value={formData.rating} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{"★".repeat(r)} ({r} star{r !== 1 ? "s" : ""})</option>)}
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" /><span className="text-sm text-gray-700">Featured</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="approved" checked={!!formData.approved} onChange={handleInputChange} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" /><span className="text-sm text-gray-700">Approved (visible on site)</span></label>
          </>
        );
      default: return null;
    }
  };

  const hasImageUpload = !["jobs", "faqs", "contacts", "testimonials"].includes(modalType);
  const hasTitle = !["faqs", "testimonials"].includes(modalType);
  const hasDescription = !["gallery", "faqs", "testimonials"].includes(modalType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${notification.type === "success" ? "bg-green-500 text-white" : notification.type === "warning" ? "bg-orange-500 text-white" : "bg-blue-500 text-white"}`}
          >
            {notification.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#14141D] to-[#1a1a25] text-white transition-all duration-300 z-30 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 overflow-hidden bg-white flex items-center justify-center shadow-sm">
                <img src="/images/logo1.png" alt="Omark" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = "none"; }} />
              </div>
              <span className="font-serif font-bold text-lg">Omark<span className="text-red-500">Admin</span></span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-md overflow-hidden bg-white flex items-center justify-center mx-auto shadow-sm">
              <img src="/images/logo1.png" alt="Omark" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = "none"; }} />
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded-lg transition"><Menu size={18} /></button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 160px)" }}>
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all cursor-pointer ${activeTab === item.id ? "bg-red-800 text-white shadow-lg" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {isSidebarOpen && (
                <div className="flex items-center justify-between flex-1">
                  <span className="text-sm">{item.label}</span>
                  {item.id === "contacts" && newContacts > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">{newContacts}</span>
                  )}
                  {item.badge > 0 && (
                    <span className="bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">{item.badge}</span>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          {isSidebarOpen ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">{user.name.charAt(0)}</div>
                <div className="flex-1"><p className="text-sm font-semibold text-white">{user.name}</p><p className="text-xs text-gray-400 truncate">{user.email}</p></div>
              </div>
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm cursor-pointer">
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex items-center justify-center p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"><LogOut size={18} /></button>
          )}
        </div>
      </div>

      {/* Main */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img src={user.profileImage || "/images/user4.webp"} alt={user.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "/images/default-avatar.png"; }} />
              </div>
              <span className="hidden md:inline text-gray-700">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Events", value: stats.events, sub: `${stats.upcomingEvents} upcoming` },
            { label: "Registrations", value: stats.totalRegistrations },
            { label: "Projects", value: stats.projects, sub: `${stats.ongoingProjects} ongoing` },
            { label: "Gallery", value: stats.galleryImages },
            { label: "Programs", value: stats.programsCount },
            { label: "Articles", value: stats.newsCount },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-red-600">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
              {s.sub && <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>}
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">{renderContent()}</div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#14141D]">{getModalTitle()}</h3>
                <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition"><X size={20} /></button>
              </div>

              <div className="p-6 space-y-4">
                {/* Title field */}
                {hasTitle && (
                  <input type="text" name="title" placeholder="Title *" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
                )}

                {/* Description/content */}
                {hasDescription && (
                  <textarea
                    name={modalType === "news" ? "content" : "description"}
                    placeholder={modalType === "news" ? "Article content *" : "Description"}
                    rows={modalType === "news" ? 6 : 3}
                    value={modalType === "news" ? formData.content : formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                )}

                {/* Type-specific fields */}
                {renderModalFields()}

                {/* Image upload */}
                {hasImageUpload && (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">{imageFile ? imageFile.name : editingItem?.image ? "Current image — upload new to replace" : "Select image to upload"}</p>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded-lg">Save</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Contact message viewer */}
      <AnimatePresence>
        {viewingContact && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setViewingContact(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-red-600" />
                  <h3 className="text-lg font-bold text-[#14141D]">Message</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(viewingContact.status ?? "new")}`}>
                    {viewingContact.status ?? "new"}
                  </span>
                </div>
                <button onClick={() => setViewingContact(null)} className="p-1 hover:bg-gray-100 rounded-lg transition"><X size={20} /></button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                {/* Sender */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-sm flex-shrink-0">
                    {(viewingContact.firstName ?? viewingContact.name ?? "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[#14141D]">
                      {viewingContact.firstName ? `${viewingContact.firstName} ${viewingContact.lastName ?? ""}`.trim() : viewingContact.name}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-0.5">
                      <a href={`mailto:${viewingContact.email}`} className="flex items-center gap-1 hover:text-red-600 transition"><Mail size={13} />{viewingContact.email}</a>
                      {viewingContact.phone && <a href={`tel:${viewingContact.phone}`} className="flex items-center gap-1 hover:text-red-600 transition"><Phone size={13} />{viewingContact.phone}</a>}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400 flex-shrink-0">{viewingContact.createdAt}</span>
                </div>

                {/* Subject / Interest */}
                {(viewingContact.subject ?? viewingContact.interest) && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2">
                    <p className="text-xs text-gray-400 mb-0.5">Subject</p>
                    <p className="text-sm font-semibold text-[#14141D]">{viewingContact.subject ?? viewingContact.interest}</p>
                  </div>
                )}

                {/* Message */}
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Message</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{viewingContact.message}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
                <select
                  value={viewingContact.status ?? "new"}
                  onChange={(e) => {
                    handleContactStatus(viewingContact.id, e.target.value);
                    setViewingContact({ ...viewingContact, status: e.target.value });
                  }}
                  className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="resolved">Resolved</option>
                </select>
                <div className="flex gap-2">
                  <a href={`mailto:${viewingContact.email}`} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#14141D] hover:bg-[#2a2a3c] text-white text-sm rounded-lg transition">
                    <Mail size={14} /> Reply
                  </a>
                  <button
                    onClick={() => { deleteItem("contacts", viewingContact.id); setViewingContact(null); }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 size={16} />
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
