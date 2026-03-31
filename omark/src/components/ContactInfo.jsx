// components/ContactInfo.jsx
import React from 'react';

const ContactInfo = () => {
  const offices = [
    { location: 'Pankrono Office', address: 'Pankrono Main Road, Kumasi', phone: '+233 24 123 4567', email: 'pankrono@omark.com' },
    { location: 'Atimatim Office', address: 'Atimatim Junction, Kumasi', phone: '+233 24 765 4321', email: 'atimatim@omark.com' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Visit Our Offices</h2>
      <div className="space-y-6 mb-8">
        {offices.map((office, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">{office.location}</h3>
            <p className="text-gray-600 mb-2"><i className="fas fa-map-marker-alt text-amber-600 w-6"></i> {office.address}</p>
            <p className="text-gray-600 mb-2"><i className="fas fa-phone text-amber-600 w-6"></i> {office.phone}</p>
            <p className="text-gray-600"><i className="fas fa-envelope text-amber-600 w-6"></i> {office.email}</p>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 p-6 rounded-xl">
        <h3 className="font-bold mb-2">Office Hours</h3>
        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
        <p>Saturday: 9:00 AM - 2:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  );
};

export default ContactInfo;