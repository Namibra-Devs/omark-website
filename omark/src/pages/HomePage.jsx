// pages/HomePage.jsx - Updated with correct services
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ServiceCard from '../components/ServiceCard';
import ProjectsSlider from '../components/ProjectsSlider';

const HomePage = () => {
  const services = [
    { 
      title: 'Residential Development', 
      desc: 'Modern homes designed for comfort, security, and lasting value. Custom-built properties tailored to your lifestyle.' 
    },
    { 
      title: 'Commercial Construction', 
      desc: 'Robust commercial spaces built to the highest standards. Office buildings, retail spaces, and industrial facilities.' 
    },
    { 
      title: 'Flexible Payment Plans', 
      desc: 'Making homeownership accessible for all income levels with customized payment options and mortgage assistance.' 
    },
    { 
      title: 'Sustainable Building', 
      desc: 'Eco-friendly materials and energy-efficient designs that reduce environmental impact and lower utility costs.' 
    },
  ];

  return (
    <>
      <Hero />
      <Stats />
      
      {/* Services Section */}
      <section className="section-padding bg-[gray-50]" aria-label="Our Services">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-wide">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-dark">Comprehensive Real Estate Solutions</h2>
           
            <p className="mt-4 text-gray-600">From concept to completion, we deliver excellence at every stage of your property journey.</p>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} title={service.title} desc={service.desc} />
            ))}
          </div>
        </div>
      </section>

   {/* Projects Slider Section */}
      <ProjectsSlider />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-amber-600 to-amber-700 text-white" aria-label="Call to Action">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Future?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-amber-50">
            Join the Omark family and take the first step toward owning your dream home in Ghana.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600"
            aria-label="Contact us to start your journey"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;