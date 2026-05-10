import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, Wrench, ArrowLeft } from 'lucide-react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import FormError from '../../components/FormError';
import { showSuccess } from '../../services/toast';
import logo from '../../assets/car Repair (1).svg';
import bg1 from '../../assets/customlambo.jpg';
import bg2 from '../../assets/intereworkmercedes.jpg';
import bg3 from '../../assets/porshe2.jpg';
import bg4 from '../../assets/porshe3.jpg';
import bg5 from '../../assets/lambo2.jpg';

const BACKGROUNDS = [bg1, bg2, bg3, bg4, bg5];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [bgIndex, setBgIndex] = useState(0);
  const { login } = useAuth();

  // Background Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setServerError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data);
      showSuccess(`Welcome back, ${res.data.email.split('@')[0]}!`);
      if (res.data.role === 'Admin') navigate('/dashboard');
      else if (res.data.role === 'Staff') navigate('/staff-dashboard');
      else navigate('/my-appointments');
    } catch {
      setServerError('Invalid email or password!');
    }
    setLoading(false);
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
            Elevate Your<br />Driving Experience.
          </h1>
          <p className="text-white/80 text-sm max-w-sm mb-6 leading-relaxed font-medium">
            The ultimate management system for high-performance vehicles and precision parts.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-4 text-white/90 font-semibold tracking-wide uppercase text-sm">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span>Inventory Precision</span>
            </div>
            <div className="flex items-center gap-4 text-white/90 font-semibold tracking-wide uppercase text-sm">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span>Order Intelligence</span>
            </div>
            <div className="flex items-center gap-4 text-white/90 font-semibold tracking-wide uppercase text-sm">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span>Customer Care</span>
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

      {/* Right Side — Login Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-8 relative overflow-y-auto custom-scrollbar">
        {/* Back to Home Circular Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center rounded-full border border-border bg-white text-gray-800 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg group z-20"
          title="Back to Home"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="w-full max-w-md relative z-10">

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

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back!
          </h2>
          <p className="text-subtext mb-8">
            Sign in to your account to continue
          </p>

          {/* Server Error */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-4 mb-6 flex items-center gap-2">
              <span>⚠️</span>
              {serverError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-gray-700 text-sm font-medium mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: '' });
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                />
              </div>
              <FormError message={errors.email} />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: '' });
                  }}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-12 py-3 text-gray-800 placeholder-subtext focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-subtext hover:text-gray-800 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <FormError message={errors.password} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-subtext text-sm text-center mt-8">
            Don't have an account?{' '}
            <a href="/register" className="text-primary hover:underline font-medium">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}