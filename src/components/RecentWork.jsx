import { ArrowRight } from 'lucide-react';
import repaintImg from '../assets/repaint.jpg';
import intereworkImg from '../assets/intereworkmercedes.jpg';
import customlamboImg from '../assets/customlambo.jpg';
import engineRepairImg from '../assets/porscheengine.jpg';

const projects = [
  {
    id: 1,
    category: 'Body Work',
    title: 'Porsche Body Paint',
    image: repaintImg,
  },
  {
    id: 2,
    category: 'Interior Rework',
    title: 'Mercedes Interior Rework',
    image: intereworkImg,
  },
  {
    id: 3,
    category: 'Body Work',
    title: 'Custom Matte Black Kit',
    image: customlamboImg,
  },
  {
    id: 4,
    category: 'Porsche Engine Work',
    title: 'Porsche Engine Repair',
    image: engineRepairImg,
  },
];

const RecentWork = () => {
  return (
    <section className="bg-creme py-24 px-6 md:px-12 font-sans overflow-hidden border-t border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-red-600/40"></div>
              <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">Recent Work</span>
            </div>
            <h2 className="text-zinc-900 text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-2">
              A Few Jobs
            </h2>
            <p className="text-red-600 text-4xl md:text-6xl font-serif italic tracking-tight">
              around the shop.
            </p>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 border-2 border-zinc-900 text-zinc-900 font-bold uppercase tracking-widest text-xs hover:bg-zinc-900 hover:text-white transition-all duration-300">
            See All Work <ArrowRight size={16} />
          </button>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
              </div>
              <div className="space-y-1">
                <span className="text-red-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {project.category}
                </span>
                <h3 className="text-zinc-900 text-lg md:text-xl font-bold font-serif italic group-hover:text-red-600 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Progress Line */}
        <div className="mt-20 w-full h-[2px] bg-zinc-100 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-red-600"></div>
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
