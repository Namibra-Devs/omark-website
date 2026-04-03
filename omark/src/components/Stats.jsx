// components/Stats.jsx
import React from 'react';

const Stats = () => {
  const stats = [
    { number: '1.8M+', label: 'Housing Deficit Addressed', icon: 'fa-chart-line' },
    { number: '500+', label: 'Homes Completed', icon: 'fa-home' },
    { number: '98%', label: 'Client Satisfaction', icon: 'fa-smile' },
    { number: '15+', label: 'Years of Excellence', icon: 'fa-calendar-alt' },
  ];

  return (
    <section className="py-12 bg-[#14141D] text-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <i className={`fas ${stat.icon} text-3xl md:text-4xl`}></i>
              <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
              <div className="text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;