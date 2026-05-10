import React from 'react';
import { Phone, Mail, MapPin, Wrench } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="bg-zinc-950 text-white py-24 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Info */}
          <div className="lg:w-1/2 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-red-600"></div>
                <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">Free Quote</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-2">
                Tell us about
              </h2>
              <p className="text-red-600 text-4xl md:text-6xl font-serif italic tracking-tight">
                your project.
              </p>
              <p className="text-zinc-500 mt-8 max-w-md leading-relaxed">
                Call, text, email, or fill out the form. We usually reply same day and every quote is free. No high pressure sales.
              </p>
            </div>

            <div className="space-y-4">
              <ContactInfoItem
                icon={<Phone size={20} />}
                label="Call or Text"
                value="977 9748759618"
              />
              <ContactInfoItem
                icon={<Mail size={20} />}
                label="Email"
                value="contact@elitegearworks.com"
              />
              <ContactInfoItem
                icon={<MapPin size={20} />}
                label="Based In"
                value="Pokhara, Nepal"
              />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-1/2 bg-white p-8 md:p-12 rounded-sm shadow-2xl">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-zinc-900 text-[10px] font-black uppercase tracking-widest">Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full bg-zinc-50 border border-zinc-100 p-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-zinc-900 text-[10px] font-black uppercase tracking-widest">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-zinc-50 border border-zinc-100 p-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-900 text-[10px] font-black uppercase tracking-widest">Phone</label>
                  <input
                    type="tel"
                    placeholder="(913) 555-1234"
                    className="w-full bg-zinc-50 border border-zinc-100 p-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-900 text-[10px] font-black uppercase tracking-widest">Project Type</label>
                  <select className="w-full bg-zinc-50 border border-zinc-100 p-4 text-zinc-900 focus:outline-none focus:border-red-600 transition-colors appearance-none">
                    <option>Select a service...</option>
                    <option>Engine Work</option>
                    <option>Suspension</option>
                    <option>Braking</option>
                    <option>Restoration</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-zinc-900 text-[10px] font-black uppercase tracking-widest">Tell us about your project</label>
                <textarea
                  rows="4"
                  placeholder="What are you looking to build, fix, or maintain? Any timing or size details help."
                  className="w-full bg-zinc-50 border border-zinc-100 p-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
                ></textarea>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.3em] py-5 transition-all duration-300 shadow-lg shadow-red-600/20">
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon, label, value }) => (
  <div className="bg-zinc-900/50 border border-white/5 p-6 flex items-center gap-6 group hover:border-red-600/30 transition-all duration-500">
    <div className="bg-red-600/10 p-3 rounded-xl text-red-600 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <span className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</span>
      <span className="block text-white font-bold tracking-tight">{value}</span>
    </div>
  </div>
);

export default ContactSection;
