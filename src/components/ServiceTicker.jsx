import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Settings, ShieldCheck, Cpu, Gauge, Zap, Hammer, ClipboardList } from 'lucide-react';

const services = [
  { id: 1, name: 'Maintenance', outline: false },
  { id: 2, name: 'Custom Work', outline: true },
  { id: 3, name: 'Braking Systems', outline: false },
  { id: 4, name: 'Engine Tuning', outline: true },
  { id: 5, name: 'Suspension', outline: false },
  { id: 6, name: 'Diagnostics', outline: true },
  { id: 7, name: 'Restoration', outline: false },
  { id: 8, name: 'Performance', outline: true },
];

const ServiceTicker = () => {
  const duplicatedServices = [...services, ...services, ...services, ...services];

  return (
    <section className="bg-black py-8 border-y-2 border-red-600/50 overflow-hidden relative">
      <div className="flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap items-center gap-8"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedServices.map((service, index) => (
            <div key={index} className="flex items-center gap-8">
              <span 
                className={`text-4xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-500 ${
                  service.outline 
                    ? 'text-transparent stroke-red-500/60' 
                    : 'text-white'
                }`}
                style={service.outline ? { WebkitTextStroke: '1px rgba(220, 38, 38, 0.6)' } : {}}
              >
                {service.name}
              </span>
              <span className="text-red-600 text-3xl font-bold">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



export default ServiceTicker;
