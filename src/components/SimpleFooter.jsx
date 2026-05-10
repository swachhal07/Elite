import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Activity, Zap, Shield, Wrench } from 'lucide-react';
import logo from '../assets/car Repair (1).svg';

const SimpleFooter = () => {
  return (
    <footer className="bg-zinc-950 text-white py-20 px-6 md:px-12 font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="p-0 transition-transform duration-300 group-hover:scale-110">
                <img src={logo} alt="Elite GearWorks Logo" className="w-14 h-14 object-contain" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                Elite GearWorks
              </span>
            </div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">Premium Auto Engineering</p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 w-full lg:w-auto">
            <FooterColumn
              title="Services"
              links={['Engine Work', 'Suspension', 'Braking Systems', 'Custom Painting', 'Exhaust Systems', 'Body Repair']}
            />
            <FooterColumn
              title="Shop"
              links={['All Parts', 'New Arrivals', 'Special Orders']}
            />
            <FooterColumn
              title="Support"
              links={['FAQ', 'Shipping', 'Returns']}
            />
            <FooterColumn
              title="Company"
              links={['About Us', 'Contact', 'Careers']}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-zinc-800 w-full mb-12"></div>

        {/* Social & Copyright */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-4">
            <SocialIcon icon={<Globe size={18} />} />
            <SocialIcon icon={<Mail size={18} />} />
            <SocialIcon icon={<Activity size={18} />} />
            <SocialIcon icon={<Zap size={18} />} />
            <SocialIcon icon={<Shield size={18} />} />
          </div>
          <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest">
            ©Copyright. All rights reserved. Made By Swachhal
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="space-y-6">
    <h4 className="text-white text-xs font-black uppercase tracking-widest">{title}</h4>
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <Link key={link} to="#" className="text-zinc-500 hover:text-red-600 text-[11px] font-bold uppercase transition-colors">
          {link}
        </Link>
      ))}
    </div>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
  >
    {icon}
  </a>
);

export default SimpleFooter;
