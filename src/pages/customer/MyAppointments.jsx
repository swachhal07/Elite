import { useState, useEffect } from 'react';
import { 
  Plus, CalendarCheck, Clock, CheckCircle, 
  XCircle, Calendar, ArrowRight, MousePointer2, Wrench,
  Award, Gift 
} from 'lucide-react';
import Layout from '../../components/Layout';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { showSuccess, showError } from '../../services/toast';
import carSvg from '../../assets/car Repair (1).svg?url';
import logo from '../../assets/car Repair (1).svg?url';
import bgImage from '../../assets/iris.webp';

export default function MyAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    appointmentDate: '',
    serviceType: '',
    notes: '',
  });

  useEffect(() => {
    fetchCustomerAndData();
  }, []);

  const fetchCustomerAndData = async () => {
    try {
      const email = localStorage.getItem('email');
      const res = await API.get(`/customers/by-email/${email}`);
      setCustomer(res.data);
      setCustomerId(res.data.id);
      fetchAppointments(res.data.id);
      fetchOrders(res.data.id);
    } catch (err) {
      console.error('Customer not found:', err);
    }
  };

  const fetchAppointments = async (id) => {
    try {
      const res = await API.get(`/appointments/customer/${id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async (id) => {
    try {
      const res = await API.get(`/orders/customer/${id}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate total spent for loyalty points (1 point per 10 currency units as an example)
  const totalSpent = orders.reduce((sum, order) => sum + order.finalAmount, 0);
  const loyaltyPoints = Math.floor(totalSpent / 10);
  const progressToNext = (totalSpent % 5000) / 5000;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentDate = new Date(form.appointmentDate).toISOString();
      await API.post('/appointments', {
        customerId: parseInt(customerId),
        appointmentDate: appointmentDate,
        serviceType: form.serviceType,
        notes: form.notes,
        status: "Pending"
      });
      showSuccess('Appointment booked successfully!');
      resetForm();
      fetchAppointments(customerId);
    } catch (err) {
      showError('Failed to book appointment!');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setForm({
      appointmentDate: '',
      serviceType: '',
      notes: '',
    });
  };

  const services = [
    'Oil Change', 'Brake Service', 'Engine Check', 
    'Tire Replacement', 'General Service', 
    'Battery Replacement', 'AC Service', 'Other'
  ];

  return (
    <Layout>
      <div className="p-4 lg:p-8 max-w-[1600px] mx-auto h-full overflow-hidden bg-[#f8fafc] flex flex-col gap-6">
        {/* Dashboard Grid - Top */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 max-h-[44%]">
          {/* Welcome Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-50/50 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-red-100/30 transition-colors duration-1000"></div>
            <div className="relative z-10">
              <span className="text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6 block">Elite Status Active</span>
              <h2 className="text-4xl font-medium text-dark leading-tight tracking-tighter">
                Welcome back, <br />
                <span className="font-black capitalize block mt-2 text-6xl text-dark tracking-tighter">{customer?.fullName || user?.email?.split('@')[0]}</span>
              </h2>
              <p className="text-gray-400 mt-6 text-xl font-medium max-w-[300px]">
                Ready for your next adventure?
              </p>
            </div>
            
            <button 
              onClick={() => setShowForm(true)}
              className="relative z-10 flex items-center justify-center gap-4 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-xl shadow-red-500/20 group/btn w-full max-w-[240px]"
            >
              <Calendar size={22} />
              <span>Quick Book</span>
            </button>
          </div>

          {/* Elite Rewards Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 h-full relative overflow-hidden group flex flex-col">
            <div className="flex justify-between items-start mb-6 relative z-30 shrink-0">
              <div>
                <h3 className="text-lg font-black text-dark tracking-tighter">Elite Rewards</h3>
                <p className="text-blue-950 text-[10px] font-bold uppercase tracking-widest mt-0.5 opacity-60">Platinum Status</p>
              </div>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-950">
                <Gift size={16} />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              {/* Progress Ring */}
              <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-50" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 * (1 - progressToNext)} className="text-dark transition-all duration-1000 drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-dark tracking-tighter">{loyaltyPoints}</span>
                  <span className="text-[8px] font-black text-blue-900/60 uppercase tracking-[0.5em] mt-1">Points</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-auto pt-6">
              <div className="flex items-center justify-center gap-4 bg-gray-50/50 w-[300px] py-3 rounded-full border border-gray-100/50 shadow-sm">
                <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">Next Reward</p>
                <div className="h-[12px] w-[1px] bg-gray-200"></div>
                <p className="text-dark text-[11px] font-black uppercase tracking-[0.2em]">15% Discount</p>
              </div>
            </div>
          </div>

          {/* Maintenance Score Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 h-full relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-6 shrink-0">
              <div>
                <h3 className="text-lg font-black text-dark tracking-tighter">Maintenance Score</h3>
                <p className="text-blue-950 text-[10px] font-bold uppercase tracking-widest mt-0.5 opacity-60">AI: {customer?.aiAnalysisNotes || 'Analyzing Vehicle...'}</p>
              </div>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-900">
                <Award size={16} />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-50" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 * (1 - (customer?.maintenanceScore || 100) / 100)} className="text-dark transition-all duration-1000 drop-shadow-[0_0_10px_rgba(23,37,84,0.15)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-dark tracking-tighter">{customer?.maintenanceScore || 100}</span>
                  <span className="text-[8px] font-black text-blue-900/60 uppercase tracking-[0.5em] mt-1">Health</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-auto pt-6">
              <div className="flex items-center justify-center gap-3 bg-gray-50/50 w-[300px] py-3 rounded-full border border-gray-100/50 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900 animate-pulse"></span>
                <p className="text-blue-950 font-black uppercase tracking-[0.2em] text-[11px]">
                  {(customer?.maintenanceScore || 100) > 80 ? 'Excellent' : 'Needs Attention'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid - Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 mb-4">
          {/* Service Status */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-start mb-6 shrink-0">
              <h3 className="text-xl font-black text-dark uppercase tracking-tighter">Service Status</h3>
              <div className="px-3 py-1.5 bg-gray-50 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">Live Update</div>
            </div>
            
            <div className="space-y-5 pl-4 overflow-y-auto pr-6 scrollbar-hide flex-1 pb-2">
              {[
                { label: 'Check-in', status: 'Done', color: 'text-dark', done: true },
                { label: 'Diagnostics', status: 'In Progress', color: 'text-dark', active: true },
                { label: 'Repairs', status: 'Pending', color: 'text-gray-300' },
                { label: 'Quality Check', status: 'Pending', color: 'text-gray-300' },
                { label: 'Ready for Pickup', status: 'Pending', color: 'text-gray-300' },
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-8 relative group/step">
                  {i < arr.length - 1 && (
                    <div className={`absolute left-[13px] top-10 w-[2.5px] h-full ${step.done ? 'bg-dark/20' : 'bg-gray-100'}`}>
                      {step.done && <div className="w-full h-full bg-dark/40 origin-top scale-y-100 transition-transform duration-1000"></div>}
                    </div>
                  )}
                  <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center border-[4px] border-white shadow-lg transition-all duration-500 ${step.done ? 'bg-dark' : step.active ? 'bg-white ring-2 ring-blue-50' : 'bg-gray-100'}`}>
                    {step.done && <CheckCircle size={14} className="text-white" />}
                    {step.active && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_6px_rgba(37,99,235,0.4)]"></div>}
                  </div>
                  <div className="-mt-1">
                    <p className={`font-black uppercase tracking-[0.15em] text-[10px] ${step.color}`}>{step.label}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mt-1 opacity-60">{step.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-start mb-6 shrink-0">
              <h3 className="text-xl font-black text-dark uppercase tracking-tighter">Recent Activity</h3>
              <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 hover:bg-dark hover:text-white transition-colors cursor-pointer">
                <ArrowRight size={16} />
              </div>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-2 scrollbar-hide flex-1 pb-2">
              {[...orders.slice(0, 3), ...appointments.slice(0, 3)].length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-300 font-bold uppercase tracking-widest text-[10px]">No activity yet</div>
              ) : (
                [...orders.map(o => ({ label: `Purchase #${o.id} - ${o.finalAmount} Rs`, date: new Date(o.createdAt).toLocaleDateString(), icon: Gift, type: 'Order' })),
                 ...appointments.map(a => ({ label: `${a.serviceType} - ${a.status}`, date: new Date(a.appointmentDate).toLocaleDateString(), icon: Wrench, type: 'Service' }))]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50/80 transition-all group cursor-pointer border border-transparent hover:border-gray-100 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-1 bg-transparent group-hover:bg-red-500 transition-all"></div>
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-lg transition-all duration-500 group-hover:text-dark">
                      <item.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-dark tracking-tight mb-0.5 group-hover:translate-x-1 transition-transform">{item.label}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{item.type}</p>
                        <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Elite Gearworks</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-dark tabular-nums uppercase tracking-widest mb-0.5">{item.date}</p>
                      <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Verified</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {showForm && customerId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-dark/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="bg-[#dc2626] p-8 text-white relative overflow-hidden">
                <h3 className="text-2xl font-black tracking-tight relative z-10 flex items-center gap-3">
                  <CalendarCheck size={28} />
                  Book Your Service
                </h3>
                <p className="text-white/80 font-medium relative z-10 mt-1">Select your preferred date and service type.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-dark font-black text-xs uppercase tracking-widest mb-3 block">Preferred Date & Time</label>
                    <input
                      name="appointmentDate"
                      type="datetime-local"
                      value={form.appointmentDate}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-dark font-bold focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-dark font-black text-xs uppercase tracking-widest mb-3 block">Type of Service</label>
                    <select
                      name="serviceType"
                      value={form.serviceType}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-dark font-bold appearance-none focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all"
                      required
                    >
                      <option value="">Choose Service...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-dark font-black text-xs uppercase tracking-widest mb-3 block">Special Instructions</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="e.g. Unusual noise from front brakes..."
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-dark font-medium focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-[2] bg-[#dc2626] hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-200"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 py-5 rounded-2xl font-black uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}