
import React, { useState, useEffect } from 'react';
// Fix: Bypassing type errors for react-router-dom and framer-motion by any-casting imports
import * as ReactRouterDOM from 'react-router-dom';
import * as FramerMotion from 'framer-motion';
const { useNavigate, Link } = ReactRouterDOM as any;
const { motion } = FramerMotion as any;

import { GraduationCap, Mail, Lock, ArrowRight, UserCircle, ShieldCheck } from 'lucide-react';
import { UserRole, User } from '../types';

interface LoginProps {
  login: (email: string, role: string) => boolean;
  user: User | null;
}

const LoginPage: React.FC<LoginProps> = ({ login, user }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>(UserRole.STUDENT);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate(`/portal/${user.role}`);
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, role);
    if (success) {
      navigate(`/portal/${role}`);
    } else {
      setError('Invalid credentials. Check demo notes below.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-yellow-500/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-8 sm:p-12">
          <div className="flex flex-col items-center mb-10 text-center">
            <Link to="/" className="bg-blue-900 p-4 rounded-2xl mb-6 shadow-xl shadow-blue-900/20 hover:scale-110 transition-transform">
              <GraduationCap className="text-white w-10 h-10" />
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900">Portal Access</h1>
            <p className="text-slate-500 mt-2">Manage your academic journey</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
             <RoleButton active={role === UserRole.STUDENT} onClick={() => setRole(UserRole.STUDENT)} label="Student" />
             <RoleButton active={role === UserRole.TEACHER} onClick={() => setRole(UserRole.TEACHER)} label="Teacher" />
             <RoleButton active={role === UserRole.ADMIN} onClick={() => setRole(UserRole.ADMIN)} label="Admin" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Institutional Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  required
                  placeholder="name@excellence.edu"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}

            <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white p-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 group">
              Login to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
             <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-blue-600" /> Demo Credentials:
             </h4>
             <ul className="text-xs text-slate-600 space-y-2">
                <li><span className="font-bold">Student:</span> student@excellence.edu</li>
                <li><span className="font-bold">Teacher:</span> teacher@excellence.edu</li>
                <li><span className="font-bold">Admin:</span> admin@excellence.edu</li>
             </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RoleButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${
      active ? 'bg-blue-900 border-blue-900 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
    }`}
  >
    {label}
  </button>
);

export default LoginPage;
