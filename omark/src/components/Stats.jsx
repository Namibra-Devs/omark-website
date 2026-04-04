// components/Stats.jsx
import React from 'react';

const Stats = () => {
  const stats = [
    { number: '1.8M+', label: 'Housing Deficit Addressed', icon: 'fa-chart-line' },
    { number: '500+', label: 'Homes Completed', icon: 'fa-home' },
    { number: '98%', label: 'Client Satisfaction', icon: 'fa-smile' },
    { number: '15+', label: 'Years of Excellence', icon: 'fa-calendar-alt' },
  ];

  // 👉 WhatsApp CTA function
  const handleBookVisit = () => {
    const phoneNumber = '233241234567'; // replace with your number (no +)
    const message = encodeURIComponent(
      'Hello, I would like to book a free site visit. Please share available dates.'
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-12 bg-[#14141D] text-white">
      <div className="container-custom">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <i className={`fas ${stat.icon} text-3xl md:text-4xl`}></i>
              <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
              <div className="text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 🔥 CTA Section */}
        <div className="mt-10 text-center">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Ready to explore your future home?
          </h3>

          <button
            onClick={handleBookVisit}
            className="inline-flex items-center gap-2 bg-[#7B170F] hover:bg-white hover:text-[#7B170F] text-white font-semibold px-6 py-3 rounded- transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            {/* WhatsApp Icon (Lucide-style SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M16 .396C7.163.396 0 7.56 0 16.396c0 2.89.756 5.71 2.193 8.2L.04 32l7.623-2.136a15.93 15.93 0 0 0 8.337 2.33c8.837 0 16-7.164 16-16S24.837.396 16 .396zm0 29.25a13.2 13.2 0 0 1-6.73-1.84l-.48-.28-4.53 1.27 1.21-4.42-.31-.5a13.18 13.18 0 1 1 10.84 5.77zm7.34-9.88c-.4-.2-2.36-1.17-2.72-1.3-.36-.13-.62-.2-.88.2s-1 1.3-1.22 1.57c-.22.27-.44.3-.82.1-.38-.2-1.6-.59-3.05-1.88-1.13-1-1.9-2.24-2.12-2.62-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.1-.2-.88-2.13-1.2-2.92-.32-.77-.65-.66-.88-.67h-.75c-.25 0-.66.1-1 .47-.34.38-1.3 1.27-1.3 3.1 0 1.83 1.33 3.6 1.52 3.85.19.25 2.63 4.02 6.37 5.63.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.36-.96 2.7-1.89.34-.93.34-1.73.24-1.89-.1-.16-.36-.25-.75-.45z" />
            </svg>

            Book Free Site Visit
          </button>
        </div>

      </div>
    </section>
  );
};

export default Stats;
