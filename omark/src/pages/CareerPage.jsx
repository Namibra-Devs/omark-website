// pages/CareerPage.jsx - Separate Career Page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Send, 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle, 
  Building2,
  Mail,
  Award,
  TrendingUp,
  Heart,
  X,
  Calendar,
  UserPlus,
  FileText,
  Phone,
  Video,
  Coffee,
  Gift,
  Shield
} from 'lucide-react';
import ContactSection from '@/components/ContactSection';

const CareerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', coverLetter: '', resume: null });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = ['all', 'Construction', 'Sales & Marketing', 'Administration', 'Engineering', 'Customer Service'];

  const jobs = [
    { id: 1, title: 'Senior Architect', department: 'Engineering', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '5+ years', description: 'Lead architectural design for residential and commercial projects.' },
    { id: 2, title: 'Project Manager', department: 'Construction', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '7+ years', description: 'Oversee construction projects from planning to completion.' },
    { id: 3, title: 'Sales Executive', department: 'Sales & Marketing', location: 'Kumasi', type: 'Full-time', salary: 'Base + Commission', experience: '2+ years', description: 'Drive property sales and build client relationships.' },
    { id: 4, title: 'Civil Engineer', department: 'Engineering', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '3+ years', description: 'Design and supervise civil engineering works.' },
    { id: 5, title: 'Customer Service Representative', department: 'Customer Service', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '1+ years', description: 'Assist clients with inquiries and property viewings.' },
    { id: 6, title: 'Accountant', department: 'Administration', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '3+ years', description: 'Manage financial records and reporting.' },
    { id: 7, title: 'Interior Designer', department: 'Engineering', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '3+ years', description: 'Create stunning interior designs for residential properties.' },
    { id: 8, title: 'Marketing Coordinator', department: 'Sales & Marketing', location: 'Kumasi', type: 'Full-time', salary: 'Competitive', experience: '2+ years', description: 'Coordinate marketing campaigns and social media presence.' }
  ];

  const benefits = [
    { icon: Award, title: 'Career Growth', desc: 'Continuous learning and advancement opportunities' },
    { icon: Users, title: 'Great Culture', desc: 'Collaborative and supportive work environment' },
    { icon: DollarSign, title: 'Competitive Pay', desc: 'Attractive salary and benefits package' },
    { icon: TrendingUp, title: 'Performance Bonuses', desc: 'Annual performance-based incentives' },
    { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage' },
    { icon: Building2, title: 'Work-Life Balance', desc: 'Flexible working arrangements' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const openApplyModal = (job) => { setSelectedJob(job); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedJob(null); setFormData({ fullName: '', email: '', phone: '', coverLetter: '', resume: null }); setIsSubmitted(false); };
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitted(true); setTimeout(() => closeModal(), 2000); };
  const handleNewsletterSubscribe = (e) => { e.preventDefault(); if (email) { setIsSubscribed(true); setTimeout(() => setIsSubscribed(false), 3000); setEmail(''); } };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
<section className="relative pt-32 pb-20 overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/house2.webp"
      alt="Careers at Omark"
      className="w-full h-full object-cover scale-105"
      onError={(e) =>
        (e.target.src =
          "https://placehold.co/1920x800/14141D/f59e0b?text=Careers+at+Omark")
      }
    />

    {/* 🔥 Left dark → right transparent */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/95 via-[#14141D]/70 to-transparent"></div>

    {/* Bottom fade */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/70 via-transparent to-transparent"></div>
  </div>

  {/* Soft glow accents */}
  <div className="absolute inset-0 z-0 opacity-20">
    <div className="absolute top-0 right-0 w-80 h-80 bg-red-500 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600 rounded-full blur-3xl"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl text-left"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
        <Briefcase size={12} className="text-red-500" />
        <span className="text-red-400 text-xs font-semibold">
          Join Our Team
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
        Career <span className="text-red-700">Opportunities</span>
      </h1>

      

      {/* Description */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
        Join a dynamic team committed to building Ghana's future. We're looking
        for talented individuals to grow with us.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-red-400 font-bold">
            {jobs.length}
          </span>
          <span className="text-gray-300 text-sm ml-1">
            Open Positions
          </span>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-red-400 font-bold">
            {departments.length - 1}
          </span>
          <span className="text-gray-300 text-sm ml-1">
            Departments
          </span>
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Why Join Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#14141D]">Why Join <span className="text-red-800">Omark?</span></h2>
       
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We offer more than just a job - we offer a career with purpose and growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center group">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition">
                    <Icon size={24} className="text-red-700 group-hover:text-white transition" />
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
                <input type="text" placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64" />
              </div>
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-sm cursor-pointer hover:bg-gray-200">
                <Filter size={16} /> Filter <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {isFilterOpen && (
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
                    <button onClick={() => openApplyModal(job)} className="bg-red-600 hover:bg-red-800 text-white px-5 py-2 rounded-sm cursor-pointer font-semibold transition flex items-center gap-2">
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

     <ContactSection/>

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
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={20} /></button>
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
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-800 cursor-pointer text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    Submit Application <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default CareerPage;