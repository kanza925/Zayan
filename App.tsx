
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, Home, Info, BookOpen, Users, 
  Building, Image as ImageIcon, Newspaper, 
  Mail, LogIn, LayoutDashboard, UserCircle, 
  LogOut, ClipboardList, DollarSign, Calendar,
  Bell, MessageSquare, Download, Clock, Menu, X,
  Sparkles, BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types & Mock Data
import { User, UserRole } from './types';
import { INITIAL_USERS } from './constants.tsx';

// Pages (Inline components for speed and single-file focus)
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
      <div className="min-h-screen flex flex-col">
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
      </div>
    </Router>
  );
};

// --- Layout Components ---

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

          {/* Desktop Nav */}
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

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
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
            <div className="flex gap-4">
              {/* Social Icons */}
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Newspaper className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Portal Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex gap-3">
                <Building className="w-5 h-5 shrink-0 text-blue-500" />
                <span>123 Education Street, Knowledge City, ST 560001</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 shrink-0 text-blue-500" />
                <span>info@excellence.edu</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 Excellence Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
