import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Michael Ross',
    source: 'Google Review',
    stars: 5,
    text: 'The engine diagnostic was spot on. My car runs better than the day I bought it. Highly professional crew that actually cares about the results.'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    source: 'Google Review',
    stars: 5,
    text: 'Best suspension work in the city. They explained every part and the difference it would make on the track. Performance is night and day.'
  },
  {
    id: 3,
    name: 'David Chen',
    source: 'Google Review',
    stars: 5,
    text: 'Transparent pricing and fast service. No hidden fees, just honest work. I found them through a car forum and I am so glad I did!'
  },
  {
    id: 4,
    name: 'Jessica Pearson',
    source: 'Google Review',
    stars: 5,
    text: 'Quick turnaround on my brake upgrade. They kept me updated throughout the process. Highly recommend for any performance work.'
  }
];

const Reviews = () => {
  // Double the reviews for seamless looping
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="bg-creme py-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-8 h-[1px] bg-red-600/30"></div>
            <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">What Our Clients Say</span>
            <div className="w-8 h-[1px] bg-red-600/30"></div>
          </div>
          <h2 className="text-zinc-900 text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Real Reviews.
          </h2>
          <p className="text-red-600 text-4xl md:text-6xl font-serif italic tracking-tight">
            Real performance.
          </p>
        </div>
      </div>

      {/* Animated Marquee */}
      <div className="relative flex overflow-hidden py-10">
        <motion.div 
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: [0, "-50%"]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {duplicatedReviews.map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`} 
              className="w-[350px] flex-shrink-0 bg-white p-8 border-t-2 border-zinc-100 hover:border-red-600 transition-all duration-500 flex flex-col shadow-sm"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-red-600 text-red-600" />
                ))}
              </div>
              <p className="text-zinc-700 text-sm md:text-base font-serif italic leading-relaxed mb-8 whitespace-normal">
                "{review.text}"
              </p>
              <div className="mt-auto space-y-1">
                <h4 className="text-zinc-900 text-xs font-black uppercase tracking-widest">
                  {review.name}
                </h4>
                <span className="text-red-600 text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {review.source}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 text-center">
        {/* Footer Link */}
        <a 
          href="#" 
          className="inline-flex items-center gap-2 text-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] hover:text-red-600 transition-colors border-b border-zinc-200 pb-1"
        >
          Read All Reviews on Google <ExternalLink size={12} />
        </a>
      </div>
    </section>
  );
};

export default Reviews;
