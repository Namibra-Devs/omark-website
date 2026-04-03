// pages/AboutPage.jsx - Fixed with proper Framer Motion usage
import React from 'react';
import VideoBanner from '../components/VideoBanner';
import { motion } from 'framer-motion';
import { 
  Target, 
  Lightbulb, 
  Users, 
  Globe2, 
  Home, 
  Building2, 
  Handshake, 
  Leaf,
  Award,
  Shield,
  Clock,
  MapPin,
  Quote,
  Star
} from 'lucide-react';

const AboutPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const values = [
    { icon: Shield, title: 'Integrity', description: 'We operate with transparency and honesty in every transaction.' },
    { icon: Leaf, title: 'Sustainability', description: 'Eco-friendly practices for a better tomorrow.' },
    { icon: Handshake, title: 'Partnership', description: 'Building lasting relationships with our clients.' },
    { icon: Award, title: 'Excellence', description: 'Delivering quality beyond expectations.' },
  ];

  const teamMembers = [
    { name: 'Kwame Osei', role: 'Founder & CEO', image: '/images/team1.jpg', quote: 'Building dreams, one home at a time.' },
    { name: 'Adwoa Mensah', role: 'Head of Operations', image: '/images/team2.jpg', quote: 'Excellence is our standard.' },
    { name: 'Michael Asare', role: 'Lead Architect', image: '/images/team3.jpg', quote: 'Designing future communities.' },
  ];

  return (
    <div className="bg-white overflow-hidden">
      
      {/* Premium Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img 
            src="/images/hero1.jpeg" 
            alt="Omark Real Estate Premium" 
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = 'https://placehold.co/1920x1080/14141D/f59e0b?text=Omark+Premium'}
          />
     
        </motion.div>


       
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20">
        
        {/* Core Identity Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-12 h-0.5 bg-amber-500"></div>
              <span className="text-amber-600 font-semibold uppercase tracking-wider">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14141D] leading-tight">
              Redefining Standards of
              <span className="text-amber-500"> Housing</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Omark Real Estate & Construction was founded on the principle that quality housing should not be a luxury reserved for a few. We operate at the intersection of innovation and reliability, providing comprehensive real estate and construction services that cater to a diverse range of needs.
              </p>
              <p className="text-lg">
                From modern residential developments to robust commercial construction, we bring expertise and integrity to every project we undertake. At Omark, we believe that a home is more than just a structure; it is the foundation of dignity, security, and a prosperous future.
              </p>
            </div>
            
            {/* Quote Block */}
            <div className="bg-gradient-to-r from-amber-50 to-transparent p-6 rounded-xl border-l-4 border-amber-500 mt-6">
              <Quote size={32} className="text-amber-500 mb-3 opacity-50" />
              <p className="text-gray-700 italic text-lg">
                "Quality housing should not be a luxury reserved for a few. We operate at the intersection of innovation and reliability."
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/images/luxury-home.jpg" 
                alt="Luxury Home" 
                className="rounded-2xl shadow-2xl w-full h-72 object-cover"
                onError={(e) => e.target.src = 'https://placehold.co/600x500/2c3e50/f59e0b?text=Luxury+Home'}
              />
              <img 
                src="/images/18.jpeg" 
                alt="Construction site" 
                className="rounded-2xl shadow-2xl w-full h-72 object-cover mt-8"
                onError={(e) => e.target.src = 'https://placehold.co/600x500/2c3e50/f59e0b?text=Construction'}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-full opacity-20 blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-600 rounded-full opacity-20 blur-2xl -z-10"></div>
          </motion.div>
        </motion.div>

        {/* Vision & Mission Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28"
        >
          <motion.div 
            variants={fadeInUp}
            className="group relative bg-gradient-to-br from-[#14141D] to-[#1a1a25] p-10 rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-all duration-300">
                <Lightbulb size={32} className="text-amber-500 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                To become Ghana's leading and most trusted real estate and construction company—driving innovation, sustainability, and accessibility in housing. We envision a future where every Ghanaian, regardless of income level, has the opportunity to own a quality home and live with dignity in a well-planned community.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="group relative bg-gradient-to-br from-amber-600 to-amber-700 p-10 rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-all duration-300">
                <Target size={32} className="text-white group-hover:text-amber-600 transition-colors" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Our Mission</h2>
              <p className="text-amber-50 leading-relaxed text-lg">
                To bridge the gap between high-, middle-, and low-income earners by creating affordable, modern, and sustainable housing solutions. We are committed to revolutionizing Ghana's real estate industry through innovation and flexible payment options.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-28"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={fadeInUp}>
              <span className="text-amber-600 font-semibold uppercase tracking-wider">Our Foundation</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14141D] mt-2">
                Core <span className="text-amber-700">Values</span>
              </h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
              <p className="text-gray-600 mt-6 text-lg">
                The principles that guide every decision and every project we undertake.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="bg-white p-6 rounded-md shadow-md border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-all duration-300">
                    <Icon size={24} className="text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#14141D] mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Revolutionizing Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-28"
        >
          <div className="bg-[#14141D] rounded-md p-12 shadow-md">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-amber-600 font-semibold uppercase tracking-wider">Our Commitment</span>
              <h2 className="text-xl md:text-3xl font-serif font-bold text-white mt-2">
                Revolutionizing Ghana's
                <span className="text-amber-700"> Real Estate</span>
              </h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Home,
                  title: "1.8M+",
                  subtitle: "Housing Deficit",
                  description: "Actively addressing the national housing deficit through innovative solutions."
                },
                {
                  icon: Globe2,
                  title: "Innovation",
                  subtitle: "Pushing Boundaries",
                  description: "Challenging traditional real estate models with flexible payment options."
                },
                {
                  icon: Users,
                  title: "Empowerment",
                  subtitle: "Building Futures",
                  description: "Providing opportunities to invest, build, and own property."
                },
                {
                  icon: Building2,
                  title: "Community",
                  subtitle: "Sustainable Living",
                  description: "Developing environments that promote comfort, security, and value."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon size={28} className="text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-600">{item.title}</h3>
                  <p className="font-semibold text-white mb-2">{item.subtitle}</p>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        
      </div>
      <VideoBanner />
    </div>
  );
};

export default AboutPage;