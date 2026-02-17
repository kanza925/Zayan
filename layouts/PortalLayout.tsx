
import React, { useState } from 'react';
// Fix: Bypassing type errors for react-router-dom by any-casting imports
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useLocation } = ReactRouterDOM as any;

import { 
  User, LayoutDashboard, ClipboardList, DollarSign, 
  Calendar, Bell, MessageSquare, Download, LogOut, 
  Menu, X, Sparkles, BrainCircuit, GraduationCap
} from 'lucide-react';
import { UserRole, User as UserType } from '../types';

interface PortalLayoutProps {
  children: React.ReactNode;
  user: UserType;
  logout: () => void;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children, user, logout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getNavItems = () => {
    const items = [
      { label: 'Overview', icon: LayoutDashboard, path: `/portal/${user.role}` },
      { label: 'Attendance', icon: ClipboardList, path: '/portal/attendance' },
      { label: 'Academics', icon: GraduationCap, path: '/portal/academics' },
    ];

    if (user.role === UserRole.STUDENT || user.role === UserRole.PARENT) {
      items.push({ label: 'Fees', icon: DollarSign, path: '/portal/fees' });
    }

    items.push(
      { label: 'Calendar', icon: Calendar, path: '/portal/calendar' },
      { label: 'Notices', icon: Bell, path: '/portal/notices' },
      { label: 'Messages', icon: MessageSquare, path: '/portal/messages' },
      { label: 'Downloads', icon: Download, path: '/portal/downloads' }
    );

    return items;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 flex flex-col h-screen
      `}>
        <div className="p-8 flex justify-between items-center h-24 border-b border-slate-800">
           <Link to="/" className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">EXCELLENCE</span>
           </Link>
           <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
             <X />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 py-8">
           <div className="flex items-center gap-4 px-4 mb-10 pb-10 border-b border-slate-800">
              <div className="relative">
                <img src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=1e3a8a&color=fff`} className="w-12 h-12 rounded-2xl border-2 border-blue-600" alt="Profile" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div className="overflow-hidden">
                 <p className="font-bold text-white truncate leading-tight">{user.name}</p>
                 <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-bold">{user.role}</p>
              </div>
           </div>

           <nav className="space-y-1">
              {navItems.map(item => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-bold ${
                    location.pathname === item.path ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-white' : 'text-slate-500'}`} />
                  {item.label}
                </Link>
              ))}
           </nav>
        </div>

        <div className="p-6 border-t border-slate-800">
           <button 
            onClick={logout}
            className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 font-bold transition-all"
           >
             <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen max-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white h-24 border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30">
           <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsSidebarOpen(true)}>
                <Menu />
              </button>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight hidden sm:block">Dashboard</h1>
           </div>

           <div className="flex items-center gap-4 sm:gap-8">
              <div className="relative group cursor-pointer">
                 <Bell className="text-slate-400 hover:text-blue-900 transition-colors" />
                 <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
                <img src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=1e3a8a&color=fff`} className="w-8 h-8 rounded-xl" alt="Mini Profile" />
                <span className="text-sm font-bold text-slate-700 hidden md:inline">{user.name.split(' ')[0]}</span>
              </div>
           </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative">
           <div className="max-w-7xl mx-auto">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
