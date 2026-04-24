// pages/NewsCareerPage.jsx - Updated with real images instead of icons
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactSection from '../components/ContactSection';
import { useNews, useLikeArticle } from '../hooks/useNews';
import { useSubscribeNewsletter } from '../hooks/useNewsletter';
import { useCareers } from '../hooks/useCareers';
import { careersApi } from '../api/careers';
import { useMutation } from '@tanstack/react-query';
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Filter,
  ChevronDown,
  Clock,
  Eye,
  Heart,
  Mail,
  Send,
  CheckCircle,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Award,
  TrendingUp,
  Building2,
  X,
  Phone,
  Loader2
} from 'lucide-react';

const STATIC_NEWS = [
  { id: 1, title: 'Omark Real Estate Wins Best Developer Award 2024', excerpt: 'We are proud to announce that Omark Real Estate has been recognized as the Best Real Estate Developer at the Ghana Property Awards 2024.', category: 'Awards', image: '/images/award1.png', date: 'March 15, 2025', author: 'Admin', readTime: '3 min read', views: 1245, featured: true },
  { id: 2, title: 'Pankrono Gardens Phase 2 Launch Announced', excerpt: 'Due to high demand, we are excited to announce the launch of Phase 2 at Pankrono Gardens with 30 additional luxury homes.', category: 'Projects', image: '/images/bb.jpeg', date: 'March 10, 2025', author: 'Admin', readTime: '2 min read', views: 892, featured: false },
  { id: 3, title: 'Affordable Housing Initiative: 500 New Homes', excerpt: 'Omark partners with government to deliver 500 affordable homes for low and middle-income families across the Ashanti Region.', category: 'Company News', image: '/images/bbb.png', date: 'March 5, 2025', author: 'Admin', readTime: '4 min read', views: 2100, featured: false },
  { id: 4, title: 'Sustainable Building Practices at Omark', excerpt: 'Learn how Omark is leading the way in eco-friendly construction with solar-powered homes and sustainable materials.', category: 'Industry Insights', image: '/images/bbbbb.png', date: 'February 28, 2025', author: 'Admin', readTime: '5 min read', views: 678, featured: false },
  { id: 5, title: 'Community Outreach: Building Schools in Rural Areas', excerpt: 'Omark continues its commitment to community development with the construction of three new schools in underserved communities.', category: 'Community', image: '/images/c.png', date: 'February 20, 2025', author: 'Admin', readTime: '3 min read', views: 1543, featured: false },
  { id: 6, title: "Real Estate Market Outlook 2025", excerpt: "Expert insights on Ghana's real estate market trends, opportunities, and predictions for the coming year.", category: 'Industry Insights', image: '/images/cc.jpeg', date: 'February 15, 2025', author: 'Admin', readTime: '6 min read', views: 987, featured: false },
];

const STATIC_JOBS = [
  { id: 1, title: 'Senior Architect', department: 'Engineering', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '5+ years', description: 'Lead architectural design for residential and commercial projects.' },
  { id: 2, title: 'Project Manager', department: 'Construction', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '7+ years', description: 'Oversee construction projects from planning to completion.' },
  { id: 3, title: 'Sales Executive', department: 'Sales & Marketing', location: 'Kumasi', type: 'Full-time', salary: 'Base + Commission', experience: '2+ years', description: 'Drive property sales and build client relationships.' },
  { id: 4, title: 'Civil Engineer', department: 'Engineering', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '3+ years', description: 'Design and supervise civil engineering works.' },
  { id: 5, title: 'Customer Service Representative', department: 'Customer Service', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '1+ years', description: 'Assist clients with inquiries and property viewings.' },
  { id: 6, title: 'Accountant', department: 'Administration', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '3+ years', description: 'Manage financial records and reporting.' },
];

const NewsCareerPage = () => {
  // News State
  const [newsSearchTerm, setNewsSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isNewsFilterOpen, setIsNewsFilterOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  
  // Career State
  const [jobSearchTerm, setJobSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isJobFilterOpen, setIsJobFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Newsletter State
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', coverLetter: '', resume: null });

  // API hooks
  const { data: newsData } = useNews({ limit: 50 });
  const { data: careersData } = useCareers({ limit: 50 });
  const likeMutation = useLikeArticle();
  const subscribeMutation = useSubscribeNewsletter();
  const applyMutation = useMutation({
    mutationFn: ({ jobId, payload }) => careersApi.apply(jobId, payload),
  });

  const formatDate = (val) => {
    if (!val) return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(val)) return new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return val;
  };

  const news = useMemo(() => {
    const list = Array.isArray(newsData) ? newsData : (newsData?.data ?? null);
    if (!list || list.length === 0) return STATIC_NEWS;
    return list.map(a => ({ ...a, id: a.id ?? a._id, excerpt: a.excerpt ?? a.summary ?? a.description ?? '', image: a.image ?? a.imageUrl ?? a.coverImage ?? '', date: formatDate(a.date ?? a.publishedAt ?? a.createdAt ?? ''), readTime: a.readTime ?? a.readingTime ?? '3 min read', views: a.views ?? 0, featured: a.featured ?? a.isFeatured ?? false }));
  }, [newsData]);

  const jobs = useMemo(() => {
    const list = Array.isArray(careersData) ? careersData : (careersData?.data ?? null);
    if (!list || list.length === 0) return STATIC_JOBS;
    return list.map(j => ({ ...j, id: j.id ?? j._id, department: j.department ?? j.category ?? '', location: j.location ?? j.city ?? 'Kumasi', type: j.type ?? j.employmentType ?? 'Full-time', salary: j.salary ?? j.salaryRange ?? 'Competitive', experience: j.experience ?? j.experienceRequired ?? '', description: j.description ?? j.summary ?? '' }));
  }, [careersData]);

  const newsCategories = useMemo(() => {
    const cats = [...new Set(news.map(n => n.category).filter(Boolean))];
    return ['all', ...cats];
  }, [news]);

  const departments = useMemo(() => {
    const depts = [...new Set(jobs.map(j => j.department).filter(Boolean))];
    return ['all', ...depts];
  }, [jobs]);

  const benefits = [
    { icon: Award, title: 'Career Growth', desc: 'Continuous learning and advancement opportunities' },
    { icon: Users, title: 'Great Culture', desc: 'Collaborative and supportive work environment' },
    { icon: DollarSign, title: 'Competitive Pay', desc: 'Attractive salary and benefits package' },
    { icon: TrendingUp, title: 'Performance Bonuses', desc: 'Annual performance-based incentives' },
    { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage' },
    { icon: Building2, title: 'Work-Life Balance', desc: 'Flexible working arrangements' }
  ];

  // Filter Functions
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(newsSearchTerm.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(newsSearchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(jobSearchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const featuredNews = news.find(item => item.featured) || news[0];

  // Career Functions
  const openApplyModal = (job) => { setSelectedJob(job); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedJob(null); setFormData({ fullName: '', email: '', phone: '', coverLetter: '', resume: null }); setIsSubmitted(false); };
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    applyMutation.mutate(
      { jobId: selectedJob.id, payload: { fullName: formData.fullName, email: formData.email, phone: formData.phone, coverLetter: formData.coverLetter, file: formData.resume } },
      { onSettled: () => { setIsSubmitted(true); setTimeout(() => closeModal(), 2000); } }
    );
  };
  const toggleLike = (id) => {
    setLikedPosts(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      likeMutation.mutate(id);
      return [...prev, id];
    });
  };
  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate({ email }, {
      onSettled: () => { setIsSubscribed(true); setTimeout(() => setIsSubscribed(false), 3000); setEmail(''); }
    });
  };

  return (
    <div className="min-h-screen bg-white">
    {/* Hero Section */}
<section className="relative pt-32 pb-20 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/house4.webp"
      alt="News and Careers at Omark"
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.src =
          "https://placehold.co/1920x800/14141D/f59e0b?text=News+%26+Careers";
      }}
    />

    {/* 🔥 Left Dark → Right Transparent Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/95 via-[#14141D]/70 to-transparent"></div>

    {/* Bottom fade */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/60 via-transparent to-transparent"></div>
  </div>



  {/* Content (LEFT aligned) */}
  <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl text-left"
    >
      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
        News & <span className="text-red-700">Careers</span>
      </h1>



      {/* Description */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
        Stay updated with company news and explore exciting career opportunities
        at Omark Real Estate.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-red-600 font-bold">
            {news.length}
          </span>
          <span className="text-gray-300 text-sm ml-1">
            Articles
          </span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-red-600 font-bold">
            {jobs.length}
          </span>
          <span className="text-gray-300 text-sm ml-1">
            Open Positions
          </span>
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Featured News Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#14141D]">Featured <span className="text-red-800">Story</span></h2>
            
          </div>
          <div className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-80 md:h-auto overflow-hidden">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => e.target.src = 'https://placehold.co/800x600/2c3e50/f59e0b?text=Featured+News'}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
                  <div className="flex items-center gap-1"><Calendar size={14} />{featuredNews.date}</div>
                  <div className="flex items-center gap-1"><Clock size={14} />{featuredNews.readTime}</div>
                  <div className="flex items-center gap-1"><Eye size={14} />{featuredNews.views} views</div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#14141D] mb-3">{featuredNews.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{featuredNews.excerpt}</p>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section with Images */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#14141D]">Latest <span className="text-red-800">News</span></h2>
             
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search news..." 
                  value={newsSearchTerm} 
                  onChange={(e) => setNewsSearchTerm(e.target.value)} 
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 w-full sm:w-64" 
                />
              </div>
              <button onClick={() => setIsNewsFilterOpen(!isNewsFilterOpen)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <Filter size={16} /> Filter <ChevronDown size={14} className={`transition-transform ${isNewsFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {isNewsFilterOpen && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl flex flex-wrap gap-2">
              {newsCategories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-sm cursor-pointer capitalize text-sm ${selectedCategory === cat ? 'bg-red-700 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          )}

          {filteredNews.length === 0 ? (
            <div className="text-center py-12"><div className="text-6xl mb-4">📰</div><h3 className="text-xl font-semibold text-gray-700">No news found</h3></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.filter(n => !n.featured).map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => e.target.src = 'https://placehold.co/600x400/2c3e50/f59e0b?text=' + item.category}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">{item.category}</span>
                    </div>
                    <button onClick={() => toggleLike(item.id)} className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-red-500 transition">
                      <Heart size={14} className={likedPosts.includes(item.id) ? 'fill-red-500 text-red-500' : ''} />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar size={12} />{item.date}
                      <Clock size={12} />{item.readTime}
                    </div>
                    <h3 className="font-bold text-[#14141D] mb-2 group-hover:text-red-600 transition line-clamp-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.excerpt}</p>
                    <button className="text-red-600 font-semibold text-sm inline-flex items-center cursor-pointer hover:text-red-800 gap-1 group-hover:gap-2 transition">
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Omark Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#14141D]">Why Join <span className="text-red-800">Omark?</span></h2>
           
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center group">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-800 transition">
                    <Icon size={24} className="text-amber-600 group-hover:text-white transition" />
                  </div>
                  <h3 className="text-lg font-bold text-[#14141D] mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#14141D]">Open <span className="text-red-800">Positions</span></h2>
             
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search jobs..." value={jobSearchTerm} onChange={(e) => setJobSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64" />
              </div>
              <button onClick={() => setIsJobFilterOpen(!isJobFilterOpen)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <Filter size={16} /> Filter <ChevronDown size={14} className={`transition-transform ${isJobFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {isJobFilterOpen && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl flex flex-wrap gap-2">
              {departments.map(dept => (
                <button key={dept} onClick={() => setSelectedDepartment(dept)} className={`px-3 py-1.5 rounded-sm cursor-pointer capitalize text-sm ${selectedDepartment === dept ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
                  {dept === 'all' ? 'All' : dept}
                </button>
              ))}
            </div>
          )}

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12"><div className="text-6xl mb-4">🔍</div><h3 className="text-xl font-semibold text-gray-700">No jobs found</h3></div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all group">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#14141D] mb-2 group-hover:text-red-600 transition">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                        <div className="flex items-center gap-1"><Briefcase size={14} />{job.department}</div>
                        <div className="flex items-center gap-1"><MapPin size={14} />{job.location}</div>
                        <div className="flex items-center gap-1"><Clock size={14} />{job.type}</div>
                        <div className="flex items-center gap-1"><DollarSign size={14} />{job.salary}</div>
                      </div>
                      <p className="text-gray-600 text-sm">{job.description}</p>
                    </div>
                    <button onClick={() => openApplyModal(job)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md cursor-pointer font-semibold transition flex items-center gap-2">
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

     

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b p-5 flex justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#14141D]">Apply for {selectedJob.title}</h3>
                  <p className="text-sm text-gray-500">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              {isSubmitted ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#14141D] mb-2">Application Submitted!</h3>
                  <p className="text-gray-600">Thank you for applying. We'll review your application and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <input type="text" name="fullName" placeholder="Full Name" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                  <textarea name="coverLetter" rows={4} placeholder="Cover Letter / Why you're a good fit" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Resume (PDF)</label>
                    <input type="file" accept=".pdf" required onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })} className="w-full" />
                  </div>
                  <button type="submit" className="w-full bg-red-700 hover:bg-red-800 cursor-pointer text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    Submit Application <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

<ContactSection />

      {/* Success Toast */}
      <AnimatePresence>
        {isSubscribed && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle size={18} /> Subscribed successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsCareerPage;