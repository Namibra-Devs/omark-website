import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-primary-50 min-h-screen">
      
      {/* Header Banner */}
      <div className="relative pt-32 pb-20 bg-primary-600">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/interior.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Do you have a project in mind, or questions about our flexible payment models? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif text-primary-500 font-bold mb-8">Our Offices</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-accent-500/10 p-4 rounded-xl">
                  <MapPin className="text-accent-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-500 mb-2">Kumasi Headquarters</h3>
                  <p className="text-gray-600 mb-1">Located in Pankrono & Atimatim</p>
                  <p className="text-gray-500 text-sm">Ashanti Region, Ghana</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-accent-500/10 p-4 rounded-xl">
                  <Phone className="text-accent-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-500 mb-2">Phone numbers</h3>
                  <p className="text-gray-600 mb-1">+233 (0) 24 000 0000</p>
                  <p className="text-sm text-accent-600 opacity-80 cursor-pointer hover:opacity-100">Request a callback</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-accent-500/10 p-4 rounded-xl">
                  <Mail className="text-accent-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-500 mb-2">Email addresses</h3>
                  <p className="text-gray-600 mb-1">info@omark.com.gh</p>
                  <p className="text-gray-600">sales@omark.com.gh</p>
                </div>
              </div>

               <div className="flex gap-4 items-start">
                <div className="bg-accent-500/10 p-4 rounded-xl">
                  <Clock className="text-accent-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-500 mb-2">Working Hours</h3>
                  <p className="text-gray-600 mb-1">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-serif text-primary-500 font-bold mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area of Interest</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-gray-600">
                  <option>Residential Property</option>
                  <option>Commercial Construction</option>
                  <option>Real Estate Investment</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg shadow-accent-500/20">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
