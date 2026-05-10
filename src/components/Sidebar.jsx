import { useAuth } from '../context/AuthContext';
import { showSuccess } from '../services/toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, Package, Tag, Truck,
  Users, ShoppingCart, BarChart2, CalendarCheck,
  ClipboardList, Star, LogOut, FileText,
  ChevronLeft, ChevronRight, User, Settings,
  ShoppingBag, PenTool, Award, ChevronDown
} from 'lucide-react';


export default function Sidebar({ lowStockCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    showSuccess('Signed out successfully. See you soon!');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navBtn = (path, label, Icon, colorClass, activeBg) => (
    <button
      onClick={() => navigate(path)}
      className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group
        ${isActive(path)
          ? `${activeBg} text-dark font-bold shadow-sm`
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
    >
      <div className={`p-1.5 rounded-lg transition-colors ${isActive(path) ? 'bg-white shadow-sm' : ''}`}>
        <Icon size={18} className={`${isActive(path) ? colorClass : 'text-gray-400 group-hover:text-gray-600'}`} />
      </div>
      {!collapsed && (
        <span className="flex-1 text-left tracking-tight">{label}</span>
      )}
    </button>
  );

  const customerLinks = [
    { path: '/my-appointments', label: 'Appointments', Icon: CalendarCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { path: '/my-orders', label: 'My Orders', Icon: ShoppingBag, color: 'text-rose-500', bg: 'bg-rose-50' },
    { path: '/part-requests', label: 'Request Part', Icon: PenTool, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { path: '/reviews', label: 'My Reviews', Icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { path: '/profile', label: 'Account Profile', Icon: User, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const adminLinks = [
    { path: '/dashboard', label: 'Admin Panel', Icon: LayoutDashboard, color: 'text-blue-500', bg: 'bg-blue-50' },
    { path: '/products', label: 'Inventory', Icon: Package, color: 'text-rose-500', bg: 'bg-rose-50' },
    { path: '/orders', label: 'Sales/Finance', Icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { path: '/appointments', label: 'Schedule', Icon: CalendarCheck, color: 'text-amber-500', bg: 'bg-amber-50' },
    { path: '/staff', label: 'Manage Staff', Icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const staffLinks = [
    { path: '/dashboard', label: 'Overview', Icon: LayoutDashboard, color: 'text-blue-500', bg: 'bg-blue-50' },
    { path: '/customers', label: 'Customers', Icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
    { path: '/orders', label: 'New Sale', Icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { path: '/appointments', label: 'Schedule', Icon: CalendarCheck, color: 'text-amber-500', bg: 'bg-amber-50' },
    { path: '/products', label: 'Inventory', Icon: Package, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  const links = user?.role === 'Admin' ? adminLinks : user?.role === 'Staff' ? staffLinks : customerLinks;

  return (
    <>
      <div className={`h-screen sticky top-0 bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-72'}`}>

        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/brand-logo.svg" alt="Elite Gearworks" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <span className="text-lg font-black tracking-tight text-dark uppercase">
              Elite Gearworks
            </span>
          )}
        </div>

        {/* User Snippet */}
        {!collapsed && (
          <div className="px-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 group-hover:border-primary/20">
                <User size={20} />
              </div>
              <div className="flex-1 overflow-hidden text-left">
                <p className="text-xs font-black text-dark truncate uppercase tracking-wider">{user?.email?.split('@')[0]}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{user?.role}</p>
              </div>
              <ChevronDown size={14} className="text-gray-300" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {links.map((link, i) => (
            <div key={i}>
              {navBtn(link.path, link.label, link.Icon, link.color, link.bg)}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} className="shrink-0 text-red-400" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 mx-auto">
              <LogOut size={32} />
            </div>
            <h3 className="text-2xl font-black text-dark text-center tracking-tight mb-2">Sign Out?</h3>
            <p className="text-gray-400 text-center font-medium mb-8">Are you sure you want to end your session?</p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-red-200"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
