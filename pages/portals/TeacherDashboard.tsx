
import React from 'react';
import { User } from '../../types';
import { 
  Users, BookOpen, GraduationCap, ClipboardList, 
  Calendar, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';
// Fix: Bypassing type errors for framer-motion by any-casting imports
import * as FramerMotion from 'framer-motion';
const { motion } = FramerMotion as any;

const TeacherDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Hello, {user.name.split(' ')[0]}</h2>
          <p className="text-slate-500 mt-2 font-medium">You have 4 classes today. Don't forget to mark attendance for Class 10-A.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20 hover:scale-105 transition-all">
          Schedule New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsTile icon={<Users className="text-blue-600" />} label="Total Students" value="124" sub="Across 3 sections" />
        <StatsTile icon={<BookOpen className="text-indigo-600" />} label="Ongoing Courses" value="4" sub="2 New this term" />
        <StatsTile icon={<ClipboardList className="text-yellow-600" />} label="Ungraded" value="18" sub="Assignments" />
        <StatsTile icon={<AlertCircle className="text-red-600" />} label="Leaves" value="3" sub="Staff notices" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            {/* My Classes Grid */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <h3 className="text-2xl font-black text-slate-900 mb-8">Current Courses</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <CourseCard title="Advanced Physics" code="PHY-402" students={42} avg="88%" />
                  <CourseCard title="Applied Chemistry" code="CHM-301" students={38} avg="76%" />
                  <CourseCard title="Quantum Mechanics" code="PHY-505" students={24} avg="92%" />
                  <CourseCard title="Lab Session" code="LAB-101" students={20} avg="N/A" />
               </div>
            </div>

            {/* Attendance Quick Action */}
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
               <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Pending Attendance</h3>
                    <p className="text-slate-400">Class 10-A Physics session ended at 11:30 AM.</p>
                  </div>
                  <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" /> Mark Now
                  </button>
               </div>
            </div>
         </div>

         {/* Right Column: Mini Calendar/Tasks */}
         <div className="space-y-10">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> Next Session
               </h3>
               <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <p className="text-blue-900 font-black text-xl mb-1">Applied Chemistry</p>
                  <p className="text-blue-700 text-sm font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> 01:30 PM - 03:00 PM
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                     <div className="flex -space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                     </div>
                     <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">38 Students waiting</span>
                  </div>
               </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-600/20">
               <h3 className="text-xl font-black mb-6">Teaching Tasks</h3>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="font-bold text-sm">Upload Quiz 4 Materials</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="font-bold text-sm">Submit Term Grades</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="font-bold text-sm">Update Lesson Plan</span>
                  </li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatsTile = ({ icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">{icon}</div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-900">{value}</p>
    <p className="text-xs text-slate-400 mt-1">{sub}</p>
  </div>
);

const CourseCard = ({ title, code, students, avg }: { title: string, code: string, students: number, avg: string }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{code}</span>
      <GraduationCap className="text-slate-300 group-hover:text-blue-900 transition-colors" />
    </div>
    <h4 className="text-xl font-bold text-slate-900 mb-6">{title}</h4>
    <div className="flex justify-between border-t border-slate-200 pt-4">
       <div>
          <p className="text-xs font-bold text-slate-400 uppercase">Students</p>
          <p className="font-bold text-slate-900">{students}</p>
       </div>
       <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase">Avg Grade</p>
          <p className="font-bold text-green-600">{avg}</p>
       </div>
    </div>
  </motion.div>
);

export default TeacherDashboard;
