// pages/EventDetailPage.jsx - Individual Event Page (Optional)
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  Download,
  CheckCircle,
} from "lucide-react";

const EventDetailPage = () => {
  const { id } = useParams();

  // In a real app, fetch event data based on id
  const event = {
    id: parseInt(id),
    title: "Grand Opening: Pankrono Gardens",
    description:
      "Join us for the official launch of our premium residential community. Tour model homes, meet the architects, and enjoy exclusive opening discounts.",
    fullDescription: `This landmark event marks the completion of Pankrono Gardens, our flagship residential community in Kumasi. The grand opening celebration will feature:

• Guided tours of model homes
• Meet-and-greet with lead architects
• Exclusive opening discounts and payment plans
• Refreshments and entertainment
• Q&A session with the development team

Don't miss this opportunity to secure your dream home at special launch prices. Space is limited, so register early to guarantee your spot.`,
    date: "April 25, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Pankrono Gardens Estate, Kumasi",
    image: "/images/event1.jpg",
    category: "Open House",
    status: "Upcoming",
    agenda: [
      { time: "10:00 AM", activity: "Welcome Address & Opening Ceremony" },
      { time: "11:00 AM", activity: "Guided Property Tours" },
      { time: "1:00 PM", activity: "Lunch Break" },
      { time: "2:00 PM", activity: "Architect Q&A Session" },
      { time: "3:00 PM", activity: "Exclusive Offers & Registration" },
    ],
  };

  return (
    <section className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event Header */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="relative h-80">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/1200x600/f59e0b/white?text=Event";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex gap-2 mb-3">
                <span className="bg-amber-600 px-3 py-1 rounded-lg text-sm font-semibold">
                  {event.category}
                </span>
                <span className="bg-green-600 px-3 py-1 rounded-lg text-sm font-semibold">
                  {event.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-4 justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#14141D]">
                About This Event
              </h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Share2 size={16} />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Download size={16} />
                  Add to Calendar
                </button>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
              {event.fullDescription}
            </p>

            {/* Agenda */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#14141D] mb-4">
                Event Agenda
              </h3>
              <div className="space-y-3">
                {event.agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-24 font-semibold text-amber-600">
                      {item.time}
                    </div>
                    <div className="flex-1 text-gray-700">{item.activity}</div>
                    <CheckCircle
                      size={18}
                      className="text-green-500 flex-shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Button */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-[#14141D] mb-2">
                Ready to Join?
              </h3>
              <p className="text-gray-600 mb-4">
                Secure your spot at this exclusive event
              </p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
