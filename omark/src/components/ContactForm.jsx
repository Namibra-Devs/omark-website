// components/ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600" />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600" />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600" />
        <textarea name="message" rows="5" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"></textarea>
        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition shadow-md">Send Message</button>
        {submitted && <p className="text-green-600 text-center">Thank you! We'll contact you soon.</p>}
      </form>
    </div>
  );
};

export default ContactForm;