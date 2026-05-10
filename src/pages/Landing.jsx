import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Settings, Users, Package, ArrowRight, CheckCircle, Car, Battery, Shield, Clock } from 'lucide-react';
import ModernHero from '../components/ModernHero';
import ServiceTicker from '../components/ServiceTicker';
import Specialties from '../components/Specialties';
import RecentWork from '../components/RecentWork';
import WhyHireUs from '../components/WhyHireUs';
import Reviews from '../components/Reviews';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQSection';
import SimpleFooter from '../components/SimpleFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <ModernHero />
      <ServiceTicker />
      <Specialties />
      <RecentWork />
      <WhyHireUs />
      <Reviews />
      <ContactSection />
      <FAQSection />
      <SimpleFooter />
    </div>
  );
}
