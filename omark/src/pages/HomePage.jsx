// pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ServiceCard from '../components/ServiceCard';

const HomePage = () => {
  const services = [
    { icon: 'fa-home', title: 'Residential Development', desc: 'Modern homes designed for comfort, security, and lasting value.' },
    { icon: 'fa-building', title: 'Commercial Construction', desc: 'Robust commercial spaces built to the highest standards.' },
    { icon: 'fa-hand-holding-usd', title: 'Flexible Payment Plans', desc: 'Making homeownership accessible for all income levels.' },
    { icon: 'fa-leaf', title: 'Sustainable Building', desc: 'Eco-friendly materials and energy-efficient designs.' },
  ];

  return (
    <>
      <Hero />
      <Stats />
      
      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-wide">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Comprehensive Real Estate Solutions</h2>
            <div className="gold-accent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-amber-800 to-amber-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Future?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Join the Omark family and take the first step toward owning your dream home in Ghana.</p>
          <Link to="/contact" className="inline-block bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition shadow-lg">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;