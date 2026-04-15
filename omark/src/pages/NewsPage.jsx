// pages/NewsPage.jsx - Separate News & Updates Page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Tag,
  Share2
} from 'lucide-react';
import VideoBanner from '@/components/VideoBanner';

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = ['all', 'Company News', 'Projects', 'Industry Insights', 'Community', 'Awards'];

  const news = [
    {
      id: 1,
      title: 'Omark Real Estate Wins Best Developer Award 2024',
      excerpt: 'We are proud to announce that Omark Real Estate has been recognized as the Best Real Estate Developer at the Ghana Property Awards 2024 for excellence in residential development and innovation in affordable housing.',
      category: 'Awards',
      image: '/images/award.png',
      date: 'March 15, 2025',
      author: 'Admin',
      readTime: '3 min read',
      views: 1245,
      featured: true
    },
    {
      id: 2,
      title: 'Pankrono Gardens Phase 2 Launch Announced',
      excerpt: 'Due to high demand, we are excited to announce the launch of Phase 2 at Pankrono Gardens with 30 additional luxury homes featuring smart technology and modern amenities.',
      category: 'Projects',
      image: '/images/hero1.jpeg',
      date: 'March 10, 2025',
      author: 'Admin',
      readTime: '2 min read',
      views: 892,
      featured: false
    },
    {
      id: 3,
      title: 'Affordable Housing Initiative: 500 New Homes',
      excerpt: 'Omark partners with government to deliver 500 affordable homes for low and middle-income families across the Ashanti Region over the next 24 months.',
      category: 'Company News',
      image: '/images/bb.jpeg',
      date: 'March 5, 2025',
      author: 'Admin',
      readTime: '4 min read',
      views: 2100,
      featured: false
    },
    {
      id: 4,
      title: 'Sustainable Building Practices at Omark',
      excerpt: 'Learn how Omark is leading the way in eco-friendly construction with solar-powered homes, rainwater harvesting, and sustainable materials that reduce carbon footprint.',
      category: 'Industry Insights',
      image: '/images/bbbbb.png',
      date: 'February 28, 2025',
      author: 'Admin',
      readTime: '5 min read',
      views: 678,
      featured: false
    },
    {
      id: 5,
      title: 'Community Outreach: Building Schools in Rural Areas',
      excerpt: 'Omark continues its commitment to community development with the construction of three new schools in underserved communities across the Ashanti Region.',
      category: 'Community',
      image: '/images/c.png',
      date: 'February 20, 2025',
      author: 'Admin',
      readTime: '3 min read',
      views: 1543,
      featured: false
    },
    {
      id: 6,
      title: 'Real Estate Market Outlook 2025',
      excerpt: 'Expert insights on Ghana\'s real estate market trends, opportunities, and predictions for the coming year from our industry experts.',
      category: 'Industry Insights',
      image: '/images/cc.jpeg',
      date: 'February 15, 2025',
      author: 'Admin',
      readTime: '6 min read',
      views: 987,
      featured: false
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const toggleLike = (id) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = news.find(item => item.featured) || news[0];

  return (
    <div className="min-h-screen bg-white">
     {/* Hero Section */}
<section className="relative pt-32 pb-20 overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/house4.webp"
      alt="News & Updates"
      className="w-full h-full object-cover scale-105"
      onError={(e) =>
        (e.target.src =
          "https://placehold.co/1920x800/14141D/f59e0b?text=News+%26+Updates")
      }
    />

    {/* 🔥 Strong left → transparent right */}
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
        <span className="text-red-400 text-xs font-semibold">
          Stay Informed
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
        News & <span className="text-red-600">Updates</span>
      </h1>



      {/* Description */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
        Stay informed about the latest developments, projects, and company news
        from Omark Real Estate.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-red-400 font-bold">
            {news.length}
          </span>
          <span className="text-gray-300 text-sm ml-1">
            Articles
          </span>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-red-400 font-bold">
            {categories.length - 1}
          </span>
          <span className="text-gray-300 text-sm ml-1">
            Categories
          </span>
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Featured Article */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#14141D]">Featured <span className="text-red-700">Story</span></h2>
         
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-80 md:h-auto overflow-hidden">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => e.target.src = 'https://placehold.co/800x600/2c3e50/f59e0b?text=Featured+News'}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
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

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search news..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" 
              />
            </div>
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)} 
                  className={`px-4 py-2 rounded-sm cursor-pointer capitalize transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full justify-center"
            >
              <Filter size={18} /> Filter <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {isFilterOpen && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-xl flex flex-wrap gap-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }} 
                  className={`px-3 py-1.5 rounded-lg capitalize text-sm ${
                    selectedCategory === cat 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-700">No news found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-right">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-red-600">{filteredNews.length}</span> of {news.length} articles
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.filter(n => !n.featured).map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1 }} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => e.target.src = 'https://placehold.co/600x400/2c3e50/f59e0b?text=' + item.category}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">{item.category}</span>
                      </div>
                      <button onClick={() => toggleLike(item.id)} className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-red-500 transition">
                        <Heart size={14} className={likedPosts.includes(item.id) ? 'fill-red-500 text-red-500' : ''} />
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1"><Calendar size={12} />{item.date}</div>
                        <div className="flex items-center gap-1"><Clock size={12} />{item.readTime}</div>
                      </div>
                      <h3 className="font-bold text-[#14141D] mb-2 group-hover:text-red-600 transition line-clamp-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye size={12} /> {item.views} views
                        </div>
                        <button className="text-red-600  hover:text-red-800 cursor-pointer font-semibold text-sm hover:gap-2 transition-all inline-flex items-center gap-1">
                          Read More <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

    <VideoBanner/>

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

export default NewsPage;