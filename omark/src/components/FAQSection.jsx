// components/FAQSection.jsx - FAQs on Left, Large Image on Right
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight, Building2, Home, Handshake, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFaqs } from '../hooks/useFaqs';

const STATIC_FAQS = [
  { id: 1, question: 'What areas does Omark Real Estate serve?', answer: 'Omark Real Estate & Construction is based in Kumasi, with strategically located offices in Pankrono and Atimatim. We serve the entire Ashanti Region and surrounding areas.' },
  { id: 2, question: 'How do I start the home buying process?', answer: 'Schedule a consultation with our team, browse available properties, choose your preferred payment plan, complete documentation, and move in.' },
  { id: 3, question: 'What payment options are available?', answer: 'We offer outright purchase, installment payments, mortgage financing partnerships, and government-backed affordable housing schemes.' },
  { id: 4, question: 'Do you offer custom home construction?', answer: 'Yes! We offer custom home construction where you design your dream home with our architects from design to completion.' },
  { id: 5, question: 'Is the property title guaranteed?', answer: 'Yes, all Omark properties come with verified and registered land titles processed through the Lands Commission.' },
  { id: 6, question: 'Can foreigners buy property from Omark?', answer: 'Yes, foreigners can purchase property in Ghana. We assist international clients with all legal requirements for foreign ownership.' },
];

const FAQSection = () => {
  const [openQuestions, setOpenQuestions] = useState([]);
  const { data: faqData, isLoading } = useFaqs({ enabled: false });

  const faqs = (() => {
    if (!faqData) return STATIC_FAQS;
    const list = Array.isArray(faqData) ? faqData : (faqData?.data ?? []);
    return list.length > 0 ? list : STATIC_FAQS;
  })();

  const toggleQuestion = (id) => {
    setOpenQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const stats = [
    { icon: Home, value: '500+', label: 'Homes Built' },
    { icon: Building2, value: '15+', label: 'Years Experience' },
    { icon: Handshake, value: '98%', label: 'Satisfaction' },
    { icon: CreditCard, value: 'Flexible', label: 'Payment Plans' },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Got Questions?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#14141D] mt-2">
            Frequently Asked <span className="text-red-800">Questions</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our properties, construction services, and payment options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* FAQ Accordion */}
          <div>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-14 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-[#14141D] pr-4">{faq.question}</span>
                      {openQuestions.includes(faq.id) ? (
                        <ChevronUp size={20} className="text-red-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openQuestions.includes(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-200"
                        >
                          <div className="px-6 py-4 bg-white">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon size={18} className="text-red-700" />
                    </div>
                    <div className="text-lg font-bold text-red-700">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/35.jpeg"
                alt="Omark Real Estate - Modern Luxury Home"
                className="w-full h-auto object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/600x800/2c3e50/f59e0b?text=Modern+Luxury+Home'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14141D]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs opacity-80">Modern luxury homes in Kumasi</p>
              </div>
              <div className="absolute top-4 right-4 bg-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Featured Property
              </div>
            </motion.div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500 rounded-full opacity-20 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-600 rounded-full opacity-20 blur-2xl -z-10" />
          </div>
        </div>

        <div className="mt-16 p-6 bg-gradient-to-r from-red-50 to-red-100/50 rounded-2xl text-center">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <HelpCircle size={20} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#14141D]">Still have questions?</h3>
                <p className="text-sm text-gray-600">Can't find the answer you're looking for?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md font-semibold transition">
                Contact Us
              </Link>
              <a href="tel:+233546029075" className="border-2 border-red-600 text-red-600 hover:bg-red-800 hover:text-white px-6 py-2 rounded-md font-semibold transition">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
