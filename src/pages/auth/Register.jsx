import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { showSuccess } from '../../services/toast';
import { Eye, EyeOff, Wrench, User, Mail, Phone, MapPin, Car, Lock, ArrowLeft } from 'lucide-react';
import logo from '../../assets/car Repair (1).svg';
import bg1 from '../../assets/customlambo.jpg';
import bg2 from '../../assets/intereworkmercedes.jpg';
import bg3 from '../../assets/porshe2.jpg';
import bg4 from '../../assets/porshe3.jpg';
import bg5 from '../../assets/lambo2.jpg';

const BACKGROUNDS = [bg1, bg2, bg3, bg4, bg5];

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    vehicleNumber: '',
    vehicleModel: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

  // Background Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        email: form.email,
        password: form.password,
        role: 'Customer'
      });
      await API.post('/customers', {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        vehicleNumber: form.vehicleNumber,
        vehicleModel: form.vehicleModel,
      });
      showSuccess('Registration successful! Welcome to the elite network.');
      setSuccess('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Registration failed. Try a stronger password like Admin@123');
    }
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">

      {/* Left Side — Background Image Branding */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative flex-col justify-between p-16 overflow-hidden">
        {/* Smooth Transition Background Layers */}
        {BACKGROUNDS.map((bg, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 85%'
            }}
          />
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        {/* Top — Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <img src={logo} alt="Elite GearWorks Logo" className="w-16 h-16 object-contain" />
          <span className="text-xl font-black text-white tracking-widest uppercase">Elite GearWorks</span>
        </div>

        {/* Bottom — Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-2 leading-tight tracking-tighter">
            Join the Elite<br />Automotive Network.
          </h1>
          <p className="text-white/80 text-sm max-w-sm mb-6 leading-relaxed font-medium">
            Register today to unlock premium service management and exclusive part access.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-4 text-white/90 font-semibold tracking-wide uppercase text-sm">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span>Expert Servicing</span>
            </div>
            <div className="flex items-center gap-4 text-white/90 font-semibold tracking-wide uppercase text-sm">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span>History Tracking</span>
            </div>
            <div className="flex items-center gap-4 text-white/90 font-semibold tracking-wide uppercase text-sm">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span>Exclusive Parts</span>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center gap-2 mt-12">
            {BACKGROUNDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setBgIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 hover:bg-white/60 ${
                  i === bgIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side — Register Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-8 overflow-y-auto relative custom-scrollbar">
        {/* Back to Home Circular Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center rounded-full border border-border bg-white text-gray-800 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg group z-20"
          title="Back to Home"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="w-full max-w-lg py-8">

          {/* Logo Mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="p-0">
              <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-primary">Elite</span>
              <span className="text-gray-800"> GearWorks</span>
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-subtext mb-8">Fill in your details to get started</p>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-4 mb-6">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl p-4 mb-6">
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Account Info */}
            <div className="bg-red-50 rounded-xl p-1 mb-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider px-3 py-2">
                Account Info
              </p>
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars eg. Admin@123"
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-12 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-subtext hover:text-gray-800 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-red-50 rounded-xl p-1 mt-4">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider px-3 py-2">
                Personal Info
              </p>
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium mb-2 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-sm font-medium mb-2 block">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium mb-2 block">Address</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your address"
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-red-50 rounded-xl p-1 mt-4">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider px-3 py-2">
                Vehicle Info
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-sm font-medium mb-2 block">Vehicle Number</label>
                <div className="relative">
                  <Car size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={form.vehicleNumber}
                    onChange={handleChange}
                    placeholder="BA 1 CHA 1234"
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium mb-2 block">Vehicle Model</label>
                <div className="relative">
                  <Car size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                  <input
                    type="text"
                    name="vehicleModel"
                    value={form.vehicleModel}
                    onChange={handleChange}
                    placeholder="Toyota Corolla 2020"
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-200 mt-4 shadow-sm"
            >
              Create Account
            </button>
          </form>

          <p className="text-subtext text-sm text-center mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline font-medium">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}