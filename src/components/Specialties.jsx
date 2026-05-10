import { ArrowUpRight } from 'lucide-react';
import engineImg from '../assets/engine.jpg';
import brakeImg from '../assets/porsche brake.jpg';
import suspensionImg from '../assets/suspension.jpg';
import diagnoImg from '../assets/diagno.webp';
import irisImg from '../assets/iris.webp';

const specialties = [
  {
    id: '01',
    title: 'Engine Performance',
    description: 'Custom engine builds, turbocharging, and precision tuning for maximum power output.',
    image: engineImg,
    gridClass: 'md:col-span-1 md:row-span-2'
  },
  {
    id: '02',
    title: 'Braking Systems',
    description: 'High-performance brake kits and cooling solutions.',
    image: brakeImg,
    gridClass: 'md:col-span-1 md:row-span-1'
  },
  {
    id: '03',
    title: 'Suspension',
    description: 'Coilover setups and air ride installations.',
    image: suspensionImg,
    gridClass: 'md:col-span-1 md:row-span-1'
  },
  {
    id: '04',
    title: 'Diagnostics',
    description: 'Advanced computer diagnostics and data logging.',
    image: diagnoImg,
    gridClass: 'md:col-span-1 md:row-span-1'
  },
  {
    id: '05',
    title: 'Custom Projects',
    description: 'One-off builds and specialized restoration work.',
    image: irisImg,
    gridClass: 'md:col-span-1 md:row-span-1'
  }
];

export default function Specialties() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-10 h-[1px] bg-red-600/30"></div>
            <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">What We Build</span>
            <div className="w-10 h-[1px] bg-red-600/30"></div>
          </div>
          <h2 className="text-zinc-900 text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Five Specialties.
          </h2>
          <p className="text-red-600 text-4xl md:text-6xl font-serif italic tracking-tight">
            One crew.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[250px] md:auto-rows-[320px]">
          {specialties.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-sm ${item.gridClass} transition-all duration-700`}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay - Darker at bottom for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="absolute top-6 right-8 text-red-400 font-serif italic text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.id}
                </span>

                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none">
                    {item.title}
                  </h3>
                  <div className="h-[2px] w-0 bg-red-600 group-hover:w-full transition-all duration-500"></div>
                  <p className="text-white/70 text-sm md:text-base leading-tight max-w-xs mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


