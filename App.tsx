
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } = ReactRouterDOM as any;
const Router = HashRouter;

import { 
  GraduationCap, Home, Info, BookOpen, Users, 
  Building, Image as ImageIcon, Newspaper, 
  Mail, LogIn, LayoutDashboard, UserCircle, 
  LogOut, ClipboardList, DollarSign, Calendar,
  Bell, MessageSquare, Download, Clock, Menu, X,
  Sparkles, BrainCircuit, Zap, ShieldCheck, ArrowRight
} from 'lucide-react';

import * as FramerMotion from 'framer-motion';
const { motion, AnimatePresence } = FramerMotion as any;

// Types & Mock Data
import { User, UserRole } from './types';
import { INITIAL_USERS } from './constants.tsx';

// Pages
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import AdmissionsPage from './pages/Admissions';
import PortalLayout from './layouts/PortalLayout';
import StudentDashboard from './pages/portals/StudentDashboard';
import TeacherDashboard from './pages/portals/TeacherDashboard';
import AdminDashboard from './pages/portals/AdminDashboard';
import LoginPage from './pages/Login';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ea_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, role: string) => {
    const user = INITIAL_USERS.find(u => u.email === email && u.role === role);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('ea_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ea_user');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout user={currentUser} logout={logout}><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout user={currentUser} logout={logout}><AboutPage /></PublicLayout>} />
          <Route path="/admissions" element={<PublicLayout user={currentUser} logout={logout}><AdmissionsPage /></PublicLayout>} />
          <Route path="/login" element={<LoginPage login={login} user={currentUser} />} />

          {/* Protected Portal Routes */}
          <Route 
            path="/portal/*" 
            element={
              currentUser ? (
                <PortalLayout user={currentUser} logout={logout}>
                  <Routes>
                    <Route path="student" element={<StudentDashboard user={currentUser} />} />
                    <Route path="teacher" element={<TeacherDashboard user={currentUser} />} />
                    <Route path="admin" element={<AdminDashboard user={currentUser} />} />
                    <Route path="*" element={<Navigate to={`/portal/${currentUser.role}`} replace />} />
                  </Routes>
                </PortalLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Floating Demo Toolbar for Testing */}
        <DemoToolbar login={login} />
      </div>
    </Router>
  );
};

const DemoToolbar: React.FC<{ login: (e: string, r: string) => boolean }> = ({ login }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const quickLogin = (email: string, role: string) => {
    login(email, role);
    navigate(`/portal/${role}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-16 left-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <p className="text-white font-black text-[10px] uppercase tracking-widest mb-3 opacity-50">Quick Demo Access</p>
              <div className="space-y-2">
                <DemoButton onClick={() => quickLogin('student@excellence.edu', 'student')} label="Student View" color="bg-blue-600" />
                <DemoButton onClick={() => quickLogin('teacher@excellence.edu', 'teacher')} label="Teacher View" color="bg-indigo-600" />
                <DemoButton onClick={() => quickLogin('admin@excellence.edu', 'admin')} label="Admin View" color="bg-purple-600" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all ${isOpen ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-500'}`}
        >
          {isOpen ? <X className="text-white w-5 h-5" /> : <Zap className="text-white w-5 h-5 fill-white" />}
        </button>
      </div>
    </div>
  );
};

const DemoButton = ({ label, onClick, color }: { label: string, onClick: () => void, color: string }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-between group transition-all ${color} shadow-lg shadow-black/20`}
  >
    {label}
    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
  </button>
);

const PublicLayout: React.FC<{ children: React.ReactNode, user: User | null, logout: () => void }> = ({ children, user, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Admissions', path: '/admissions', icon: BookOpen },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur shadow-sm h-16 flex items-center border-b border-slate-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-900 p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-blue-900 hidden sm:block tracking-tight">EXCELLENCE ACADEMY</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'bg-blue-50 text-blue-900' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/portal" 
                  className="bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Portal
                </Link>
                <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
            )}
          </nav>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 left-0 w-full bg-white border-b border-slate-100 z-40 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <Link 
                to={user ? "/portal" : "/login"} 
                className="flex items-center justify-center gap-3 p-4 bg-blue-900 text-white rounded-xl font-bold mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {user ? 'My Portal' : 'Sign In'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16 flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">EXCELLENCE ACADEMY</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Empowering future leaders since 1998 through world-class education, character building, and innovative learning methodologies.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-3"><Building className="w-4 h-4 text-blue-500" /> 123 Education St, Knowledge City</li>
              <li className="flex gap-3"><Mail className="w-4 h-4 text-blue-500" /> info@excellence.edu</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
