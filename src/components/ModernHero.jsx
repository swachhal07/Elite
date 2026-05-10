import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight } from 'lucide-react';
import logo from '../assets/car Repair (1).svg';

/* ── Animated Cursor Tab ── */
const Tab = ({ children, setPosition, href }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      <a href={href}>{children}</a>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

const ModernHero = () => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* ── Video Background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* ── Dark Overlay + Gradient ── */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 lg:px-12 transition-all duration-500 ${scrolled ? 'bg-black/20 backdrop-blur-lg py-3 shadow-lg' : 'bg-transparent py-6'
          }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-0 transition-transform duration-300 group-hover:scale-110">
            <img src={logo} alt="Elite GearWorks Logo" className="w-16 h-16 object-contain" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block leading-none">
              Elite GearWorks
            </span>
            <span className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em]">
              Premium Auto Engineering
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          <a href="/" className="text-lg font-semibold text-white hover:text-white/70 transition-colors">Home</a>
          <a href="#features" className="text-lg font-semibold text-white hover:text-white/70 transition-colors">Features</a>
          <a href="#about" className="text-lg font-semibold text-white hover:text-white/70 transition-colors">About</a>
          <a href="#contact" className="text-lg font-semibold text-white hover:text-white/70 transition-colors">Contact</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block text-lg font-bold text-white/80 hover:text-white px-4 py-2 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold px-6 py-3 rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-22">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-bold uppercase tracking-[0.15em] mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          Trusted by 500+ Service Centers
        </div>

        {/* Title */}
        <h1 className="max-w-5xl mb-8">
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            Find & Order
          </span>
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mt-2">
            Premium Parts
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/60 max-w-xl text-base md:text-lg font-medium leading-relaxed mb-12">
          Your one stop solution for high quality vehicle parts, seamless order
          tracking, and expert service appointments.
        </p>
      </div>
    </div>
  );
};

export default ModernHero;
