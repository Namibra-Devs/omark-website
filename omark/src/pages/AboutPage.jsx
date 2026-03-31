import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Globe2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-primary-50">
      
      {/* Header Banner */}
      <div className="relative pt-32 pb-20 bg-primary-600">
        <div className="absolute inset-0 opacity-20 hidden md:block">
           <img src="/images/hero-home.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Who We Are</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
              Building communities that promote comfort, security, and long-term value.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Core Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-700 leading-relaxed"
          >
            <p>
              Omark Real Estate & Construction was founded on the principle that quality housing should not be a luxury reserved for a few. We operate at the intersection of innovation and reliability, providing comprehensive real estate and construction services that cater to a diverse range of needs. 
            </p>
            <p>
              From modern residential developments to robust commercial construction, we bring expertise and integrity to every project we undertake. At Omark, we believe that a home is more than just a structure; it is the foundation of dignity, security, and a prosperous future.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="/images/luxury-home.jpg" alt="Luxury Home" className="rounded-xl shadow-lg w-full h-64 object-cover" />
            <img src="/images/construction.jpg" alt="Construction site" className="rounded-xl shadow-lg w-full h-64 object-cover mt-8" />
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
          >
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-accent-500" />
            </div>
            <h2 className="text-3xl font-serif text-primary-500 font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become Ghana's leading and most trusted real estate and construction company—driving innovation, sustainability, and accessibility in housing. We envision a future where every Ghanaian, regardless of income level, has the opportunity to own a quality home and live with dignity in a well-planned community.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
          >
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-accent-500" />
            </div>
            <h2 className="text-3xl font-serif text-primary-500 font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To bridge the gap between high-, middle-, and low-income earners by creating affordable, modern, and sustainable housing solutions.
            </p>
          </motion.div>
        </div>

        {/* Revolutionizing the Industry */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-primary-500 font-bold mb-4">Revolutionizing Ghana's Real Estate</h2>
          <p className="text-lg text-gray-600">We are committed to changing the status quo through tangible action:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Tackling the Deficit",
              desc: "Addressing the national housing deficit, which currently stands at over 1.8 million housing units."
            },
            {
              icon: <Globe2 className="w-6 h-6" />,
              title: "Pushing Boundaries",
              desc: "Challenging traditional real estate models through innovation and flexible payment options."
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Empowering Families",
              desc: "Providing individuals and families with the opportunity to invest, build, and own property."
            },
            {
              icon: <Target className="w-6 h-6" />,
              title: "Building Communities",
              desc: "Developing environments that promote comfort, security, and long-term land value."
            }
          ].map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white p-6 rounded-xl shadow-md border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform"
             >
               <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                 {item.icon}
               </div>
               <h3 className="text-xl font-bold text-primary-500 mb-2">{item.title}</h3>
               <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
             </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
