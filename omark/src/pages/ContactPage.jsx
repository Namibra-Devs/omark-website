// pages/ContactPage.jsx - Premium Redesign
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Calendar,
  Building2,
  User,
  Briefcase,
  Star,
  ChevronRight,
  Loader2
} from 'lucide-react';
import VideoBanner from '@/components/VideoBanner';
import FAQSection from '@/components/FAQSection';
import { useSubmitContact } from '../hooks/useContact';

const EMPTY_FORM = { firstName: '', lastName: '', email: '', phone: '', interest: 'Residential Property', message: '', preferredContact: 'email' };

const ContactPage = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const submitContact = useSubmitContact();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    try {
      await submitContact.mutateAsync({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: formData.interest,
        message: formData.message,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(EMPTY_FORM);
      }, 3000);
    } catch (err) {
      setSubmitError(err?.response?.data?.message ?? 'Failed to send message. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const offices = [
    {
      location: "Pankrono Office",
      address: "Pankrono Main Road",
      city: "Kumasi, Ashanti Region",
      phone: "+233 54 602 9075 ",
      email: "pankrono@omarkrealestate.com",
      hours: "Mon-Fri: 8AM - 6PM, Sat: 9AM - 2PM",
      mapLink: "#"
    },
    {
      location: "Atimatim Office",
      address: "Atimatim Junction",
      city: "Kumasi, Ashanti Region",
      phone: "+233 24 385 1815",
      email: "atimatim@omarkrealestate.com",
      hours: "Mon-Fri: 8AM - 6PM, Sat: 9AM - 2PM",
      mapLink: "#"
    }
  ];

  const interestOptions = [
    "Residential Property",
    "Commercial Construction",
    "Real Estate Investment",
    "Flexible Payment Plans",
    "Property Management",
    "General Inquiry"
  ];

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      
      {/* Premium Hero Section */}
<section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/images/1.jpeg" 
      alt="Contact Omark Real Estate" 
      className="w-full h-full object-cover"
      onError={(e) => e.target.src = 'https://placehold.co/1920x800/14141D/f59e0b?text=Contact+Us'}
    />

    {/* 🔥 Left dark → Right transparent */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#14141D]/95 via-[#14141D]/60 to-transparent"></div>

    {/* Bottom fade */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/80 via-transparent to-transparent"></div>
  </div>

  {/* Content (LEFT aligned properly) */}
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
        <span className="text-red-400 text-xs font-semibold">Let's Connect</span>
      </div>

      {/* Heading (reduced slightly for balance) */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
        Get In <span className="text-red-500">Touch</span>
      </h1>

      {/* Divider (LEFT aligned now) */}
      <div className="w-16 h-1 bg-red-500 mb-4"></div>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
        Do you have a project in mind, or questions about our flexible payment models? 
        We'd love to hear from you.
      </p>
    </motion.div>
  </div>
</section>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side - Contact Details */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Our Locations</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#14141D] mt-2">
                Visit Our <span className="text-red-700">Offices</span>
              </h2>
              <div className="w-16 h-0.5 bg-red-500 mt-4"></div>
            </motion.div>

            {/* Office Cards */}
            <div className="space-y-6">
              {offices.map((office, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center group-hover:bg-red-700 transition-colors duration-300">
                      <MapPin size={22} className="text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#14141D] mb-1">{office.location}</h3>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                      <p className="text-gray-500 text-xs mb-3">{office.city}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-red-600" />
                          <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-red-600 transition">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-red-600" />
                          <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-red-600 transition truncate">
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:col-span-2">
                          <Clock size={14} className="text-red-600" />
                          <span className="text-gray-600 text-xs">{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Info Summary */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-red-50 to-transparent rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-[#14141D] mb-4 flex items-center gap-2">
                <MessageCircle size={18} className="text-red-600" />
                Quick Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-red-600" />
                  <a href="tel:+233241234567" className="text-gray-700 hover:text-red-600 transition">
                    +233 54 602 9075
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-red-600" />
                  <a href="mailto:info@omarkrealestate.com" className="text-gray-700 hover:text-red-600 transition">
                    info@omarkrealestate.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-red-600" />
                  <span className="text-gray-700">Mon-Sat: 8AM - 6PM</span>
                </div>
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div 
              variants={fadeInUp}
              className="bg-[#14141D] rounded-md p-6 text-center"
            >
              <Building2 size={32} className="text-red-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Emergency Support</h3>
              <p className="text-gray-400 text-sm mb-3">24/7 emergency assistance for existing clients</p>
              <a 
                href="tel:+233546029075" 
                className="inline-flex items-center gap-2 text-red-500 hover:text-white font-semibold hover:gap-3 transition-all"
              >
                Call Emergency Line
                <ChevronRight size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-6">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">
                  Send a Message
                </h2>
                <p className="text-amber-100 text-sm">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              {/* Form Body */}
              <div className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#14141D] mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll respond to your inquiry shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Area of Interest *
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                        >
                          {interestOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={16} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleChange}
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm text-gray-600">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleChange}
                            className="w-4 h-4 text-ared-600 focus:ring-red-500"
                          />
                          <span className="text-sm text-gray-600">Phone</span>
                        </label>
                      </div>
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="w-full bg-[#7B170F] hover:bg-[#14141D] text-white py-3.5 rounded-md cursor-pointer font-semibold transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitContact.isPending ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy. We'll never share your information.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Consultation CTA */}
            <motion.div 
              variants={fadeInUp}
              className="mt-6 text-center"
            >
              <p className="text-gray-500 text-sm">
                Prefer to speak with someone directly? 
                <a href="tel:+233241234567" className="text-red-700 font-semibold ml-1 hover:underline">
                  Call us now
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#14141D]">
              Find Us <span className="text-red-700">On Map</span>
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto mt-3"></div>
          </div>
          
          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.24656970688!2d-1.673868!3d6.674412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb9f3ba5a8c0d3%3A0x3c5b5b5b5b5b5b5b!2sKumasi%2C%20Ghana!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Omark Real Estate Location"
            ></iframe>
          </div>
        </motion.div>

        
      </div>

      <FAQSection />
<VideoBanner/>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;