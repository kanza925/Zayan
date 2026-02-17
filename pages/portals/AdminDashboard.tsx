
import React from 'react';
import { User } from '../../types';
import { 
  Users, UserCheck, DollarSign, Image as ImageIcon, 
  Settings, ShieldCheck, Download, Plus, Search 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  const enrollmentData = [
    { month: 'Jan', students: 2100 },
    { month: 'Feb', students: 2200 },
    { month: 'Mar', students: 2350 },
    { month: 'Apr', students: 2300 },
    { month: 'May', students: 2450 },
    { month: 'Jun', students: 2500 }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Control Panel</h2>
          <p className="text-slate-500 mt-2 font-medium">Monitoring all academic and administrative operations.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Logs
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-blue-600/20 hover:scale-105 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<Users className="text-blue-600" />} label="Total Users" value="2,800" trend="+12%" />
        <MetricCard icon={<UserCheck className="text-green-600" />} label="Admissions" value="142" trend="+5%" />
        <MetricCard icon={<DollarSign className="text-yellow-600" />} label="Revenue" value="$420k" trend="+18%" />
        <MetricCard icon={<Settings className="text-slate-600" />} label="System Uptime" value="99.9%" trend="Stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           {/* Enrollment Growth */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
             <h3 className="text-2xl font-black text-slate-900 mb-8">Enrollment Trends</h3>
             <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={enrollmentData}>
                   <defs>
                     <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                   <Tooltip />
                   <Area type="monotone" dataKey="students" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
           </div>

           {/* Recent Inquiries Table */}
           <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-10 flex justify-between items-center border-b border-slate-100">
                 <h3 className="text-2xl font-black text-slate-900">Recent Inquiries</h3>
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                   <input type="text" placeholder="Search inquiries..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 outline-none" />
                 </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest">
                          <th className="px-10 py-5">Student</th>
                          <th className="px-10 py-5">Grade</th>
                          <th className="px-10 py-5">Parent</th>
                          <th className="px-10 py-5">Status</th>
                          <th className="px-10 py-5 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       <InquiryRow name="Alice Chen" grade="Grade 6" parent="Michael C." status="New" />
                       <InquiryRow name="Bob Smith" grade="Grade 11" parent="Robert S." status="Reviewed" />
                       <InquiryRow name="Charlie Day" grade="Grade 1" parent="Frank D." status="Contacted" />
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="space-y-10">
           {/* Quick Actions Grid */}
           <div className="bg-indigo-950 p-10 rounded-[3rem] text-white">
              <h3 className="text-xl font-bold mb-8">Quick Management</h3>
              <div className="grid grid-cols-2 gap-4">
                 <AdminAction icon={<Users />} label="Users" />
                 <AdminAction icon={<ImageIcon />} label="Gallery" />
                 <AdminAction icon={<DollarSign />} label="Fees" />
                 <AdminAction icon={<ShieldCheck />} label="Security" />
              </div>
           </div>

           {/* System Messages */}
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">System Notifications</h3>
              <div className="space-y-4">
                 <Notification type="info" msg="Server maintenance tonight at 02:00 AM." />
                 <Notification type="success" msg="Database backup completed successfully." />
                 <Notification type="warning" msg="3 unauthorized login attempts detected." />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, trend }: { icon: any, label: string, value: string, trend: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">{icon}</div>
       <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{trend}</span>
    </div>
    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{label}</p>
    <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
  </div>
);

const InquiryRow = ({ name, grade, parent, status }: { name: string, grade: string, parent: string, status: string }) => (
  <tr className="hover:bg-slate-50 transition-colors group">
    <td className="px-10 py-6 font-bold text-slate-900">{name}</td>
    <td className="px-10 py-6 text-slate-600 text-sm">{grade}</td>
    <td className="px-10 py-6 text-slate-600 text-sm">{parent}</td>
    <td className="px-10 py-6">
       <span className={`text-xs font-bold px-3 py-1 rounded-full ${
         status === 'New' ? 'bg-blue-100 text-blue-700' : 
         status === 'Reviewed' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
       }`}>{status}</span>
    </td>
    <td className="px-10 py-6 text-right">
       <button className="text-blue-600 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Review</button>
    </td>
  </tr>
);

const AdminAction = ({ icon, label }: { icon: any, label: string }) => (
  <button className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl hover:bg-white/10 transition-all border border-white/10 group">
     <div className="mb-3 text-blue-400 group-hover:scale-110 transition-transform">{icon}</div>
     <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{label}</span>
  </button>
);

const Notification = ({ type, msg }: { type: string, msg: string }) => (
  <div className={`p-4 rounded-2xl text-sm font-medium border-l-4 ${
    type === 'info' ? 'bg-blue-50 text-blue-700 border-blue-400' : 
    type === 'success' ? 'bg-green-50 text-green-700 border-green-400' : 'bg-red-50 text-red-700 border-red-400'
  }`}>
    {msg}
  </div>
);

export default AdminDashboard;
