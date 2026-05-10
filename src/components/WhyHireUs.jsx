import React from 'react';

const reasons = [
  {
    id: '01',
    title: 'Expertise Driven',
    description: 'Every technician is master-certified with years of high-performance vehicle experience. No shortcuts on quality.'
  },
  {
    id: '02',
    title: 'Genuine Parts',
    description: 'We only source OEM or verified high-performance aftermarket parts. Built for longevity and track-ready use.'
  },
  {
    id: '03',
    title: 'Straight Talk Pricing',
    description: 'Clear written scope, honest pricing, and real timelines. You always know what is happening on your vehicle.'
  },
  {
    id: '04',
    title: 'Fast & Responsive',
    description: 'We value your time. We answer our phones, we show up when we say we will, and you deal directly with the mechanics.'
  },
  {
    id: '05',
    title: 'Full Service',
    description: 'Diagnostics, install, and ongoing maintenance. No handoffs between shops, no finger pointing.'
  }
];

const WhyHireUs = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 font-sans overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-8 h-[1px] bg-red-600/30"></div>
            <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">Why Hire Us</span>
            <div className="w-8 h-[1px] bg-red-600/30"></div>
          </div>
          <h2 className="text-zinc-900 text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Hired for the work.
          </h2>
          <p className="text-red-600 text-4xl md:text-6xl font-serif italic tracking-tight">
            Remembered for the care.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reasons.map((reason) => (
            <div 
              key={reason.id} 
              className="bg-white p-8 border-t-4 border-red-600/20 hover:border-red-600 transition-all duration-500 group shadow-sm hover:shadow-md"
            >
              <div className="flex justify-end mb-6">
                <span className="text-zinc-200 text-2xl font-serif italic group-hover:text-red-600/20 transition-colors">
                  {reason.id}
                </span>
              </div>
              <h3 className="text-zinc-900 text-lg font-black uppercase tracking-tight mb-4 leading-tight group-hover:text-red-600 transition-colors">
                {reason.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHireUs;
