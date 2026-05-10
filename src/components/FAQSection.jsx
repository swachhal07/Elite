import React, { useState } from 'react';
import { Plus, Minus, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    id: 'Q01',
    question: 'WHAT AREAS DO YOU SERVE?',
    answer: 'We serve the entire Kathmandu Valley and surrounding areas. For performance parts shipping, we serve customers nationwide.'
  },
  {
    id: 'Q02',
    question: 'DO YOU HANDLE BOTH PERFORMANCE AND MAINTENANCE?',
    answer: 'Yes, we specialize in high-performance builds and tuning, but we also provide expert routine maintenance and diagnostics for all major vehicle brands.'
  },
  {
    id: 'Q03',
    question: 'DO YOU PROVIDE FREE ESTIMATES?',
    answer: 'Absolutely. Every quote for service or parts installation is free and provided with a detailed breakdown of costs and timing.'
  },
  {
    id: 'Q04',
    question: 'HOW LONG DOES A TYPICAL BUILD TAKE?',
    answer: 'Timing depends on part availability and complexity. Minor upgrades take 1-3 days, while full restorations or engine builds can take several weeks.'
  },
  {
    id: 'Q05',
    question: 'DO YOU USE YOUR OWN CREW?',
    answer: 'Yes, all work is performed in-house by our certified master technicians. we do not outsource your vehicle to third parties.'
  },
  {
    id: 'Q06',
    question: 'HOW DO I GET IN CONTACT WITH YOU?',
    answer: 'You can call us directly, email our service desk, or fill out the contact form above. We typically respond within 4 business hours.'
  }
];

const FAQSection = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="bg-white py-24 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">

        {/* Left Side: Text */}
        <div className="lg:w-1/3 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-red-600"></div>
            <span className="text-zinc-500 text-xs font-bold tracking-[0.4em] uppercase">Got Questions?</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-zinc-900">
            Let's Clear<br />It Up.
          </h2>
          <p className="text-zinc-500 max-w-sm leading-relaxed">
            Straight answers to what our performance community and daily drivers ask us most often.
          </p>

          <div className="bg-zinc-900 text-white p-6 flex items-center gap-4 hover:bg-red-600 transition-colors duration-300 cursor-pointer group shadow-xl">
            <Phone size={20} className="text-red-500 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-tight">
              Still unsure? Just call:<br />
              <span className="text-lg">+977 9748759618</span>
            </span>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:w-2/3 border-t border-zinc-100">
          {faqData.map((item) => (
            <div key={item.id} className="border-b border-zinc-100">
              <button
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className="w-full py-8 flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-6">
                  <span className="text-red-600 font-serif italic text-xl md:text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.id}
                  </span>
                  <span className="text-zinc-900 font-black uppercase text-sm md:text-base tracking-tight group-hover:text-red-600 transition-colors">
                    {item.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center transition-all duration-300 ${activeId === item.id ? 'bg-red-600 border-red-600 text-white rotate-180' : 'text-zinc-400'}`}>
                  {activeId === item.id ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 pl-[4.5rem] pr-12 text-zinc-500 text-sm leading-relaxed max-w-2xl">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
