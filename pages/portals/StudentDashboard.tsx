
import React, { useState } from 'react';
import { User } from '../../types';
import { 
  BookOpen, Clock, Calendar, GraduationCap, 
  MessageCircle, Send, BrainCircuit, Sparkles, Bell 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { askStudyBuddy } from '../../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StudentDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const performanceData = [
    { subject: 'Math', score: 92 },
    { subject: 'Physics', score: 85 },
    { subject: 'Chemistry', score: 78 },
    { subject: 'English', score: 95 },
    { subject: 'History', score: 88 }
  ];

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsLoading(true);
    setAiResponse(null);
    const resp = await askStudyBuddy('General Studies', question);
    setAiResponse(resp);
    setIsLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500 mt-2 font-medium">You have 3 classes today and 2 assignments due.</p>
        </div>
        <div className="bg-blue-600 px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2 shadow-xl shadow-blue-600/20">
          <Calendar className="w-5 h-5" /> Jan 25, 2026
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatsCard label="Attendance" value="94%" color="text-blue-600" sub="Excellent" />
            <StatsCard label="Avg Grade" value="A+" color="text-green-600" sub="Top 5%" />
            <StatsCard label="Assignments" value="12/14" color="text-yellow-600" sub="2 Pending" />
          </div>

          {/* AI Tutor Integration - The Gemini Special */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <BrainCircuit className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                    <Sparkles className="text-yellow-400 w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight">Study Buddy AI</h3>
              </div>
              <p className="text-blue-100 mb-8 leading-relaxed max-w-lg">
                Stuck on a homework problem or need a concept explained? Ask our AI Tutor powered by Gemini.
              </p>
              
              <form onSubmit={handleAiAsk} className="flex gap-3">
                 <input 
                    type="text" 
                    className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/20 transition-all placeholder:text-blue-300"
                    placeholder="Ask anything about your subjects..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                 />
                 <button 
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-400 text-indigo-950 p-4 rounded-2xl font-black transition-all disabled:opacity-50"
                 >
                    {isLoading ? <div className="w-6 h-6 border-2 border-indigo-950 border-t-transparent animate-spin rounded-full"></div> : <Send className="w-6 h-6" />}
                 </button>
              </form>

              <AnimatePresence>
                {aiResponse && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-8 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl"
                  >
                     <p className="text-blue-50 leading-relaxed italic">"{aiResponse}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Performance Chart */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Performance</h3>
               <select className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold">
                 <option>Mid-Term 2026</option>
                 <option>Final 2025</option>
               </select>
             </div>
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={[0, 100]} />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={40}>
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1e3a8a' : '#ca8a04'} />
                      ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-10">
          {/* Today's Classes */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
             <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
               <Clock className="w-5 h-5 text-blue-600" /> Today's Schedule
             </h3>
             <div className="space-y-4">
                <ScheduleItem time="08:30" subject="Calculus I" teacher="Prof. Michael" active />
                <ScheduleItem time="10:15" subject="Quantum Physics" teacher="Dr. Sarah" />
                <ScheduleItem time="11:30" subject="Lunch Break" teacher="Campus Hall" isBreak />
                <ScheduleItem time="13:00" subject="Macro Economics" teacher="Mrs. Emily" />
             </div>
             <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-bold text-slate-600 transition-colors">
               View Full Timetable
             </button>
          </div>

          {/* Announcements */}
          <div className="bg-yellow-500 p-8 rounded-[3rem] text-indigo-950 shadow-xl shadow-yellow-500/20">
             <h3 className="text-xl font-black mb-6 flex items-center gap-2">
               <Bell className="w-5 h-5" /> Recent Notices
             </h3>
             <div className="space-y-6">
                <div className="pb-6 border-b border-indigo-950/10">
                   <p className="text-xs font-bold uppercase tracking-widest opacity-60">Jan 22, 2026</p>
                   <p className="font-bold text-lg mt-1">Science Fair Registration now open.</p>
                </div>
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest opacity-60">Jan 20, 2026</p>
                   <p className="font-bold text-lg mt-1">Exam prep holidays start next week.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, color, sub }: { label: string, value: string, color: string, sub: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{label}</p>
    <p className={`text-3xl font-black ${color} mb-1`}>{value}</p>
    <p className="text-xs text-slate-400 font-medium">{sub}</p>
  </div>
);

const ScheduleItem = ({ time, subject, teacher, active, isBreak }: { time: string, subject: string, teacher: string, active?: boolean, isBreak?: boolean }) => (
  <div className={`p-5 rounded-2xl border transition-all flex items-center gap-4 ${
    active ? 'bg-blue-900 border-blue-900 text-white' : 
    isBreak ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-100 text-slate-600'
  }`}>
    <div className={`text-xs font-bold ${active ? 'text-blue-200' : 'text-slate-400'}`}>{time}</div>
    <div className="overflow-hidden">
       <p className="font-bold truncate leading-none mb-1">{subject}</p>
       <p className={`text-xs truncate ${active ? 'text-blue-300' : 'text-slate-400'}`}>{teacher}</p>
    </div>
  </div>
);

export default StudentDashboard;
