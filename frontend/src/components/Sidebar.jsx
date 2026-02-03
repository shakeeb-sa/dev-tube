import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../data/videos';
import { useAuth } from '../context/AuthContext'; // ADDED
import { 
  Code, Palette, Layout, Server, Atom, Home, Terminal, Globe, Database, 
  Bookmark, X, PlusCircle, LogOut, LogIn // ADDED ICONS
} from 'lucide-react';

const iconMap = {
  Home: Home, Code: Code, Palette: Palette, Layout: Layout, React: Atom,
  Server: Server, Atom: Atom, Terminal: Terminal, Globe: Globe, Database: Database
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth(); // ADDED

  return (
    <>
      {/* ... (keep overlay) ... */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-slate-850 h-screen flex flex-col border-r border-slate-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* ... (keep Logo Area code) ... */}

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          
          {/* 1. ADMIN ONLY LINK */}
          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 mb-2 border border-dashed
                ${isActive 
                  ? 'bg-primary-500/10 text-primary-400 border-primary-500/50' 
                  : 'text-primary-500 border-primary-500/30 hover:bg-primary-500/5'}
              `}
            >
              <PlusCircle className="w-5 h-5" />
              <span className="font-bold">Post New Video</span>
            </NavLink>
          )}

          <NavLink
            to="/library"
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 mb-4 border border-transparent
              ${isActive 
                ? 'bg-slate-800 text-white shadow-lg border-slate-700' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <Bookmark className="w-4 h-4" />
            <span className="font-medium">My Library</span>
          </NavLink>

          <div className="px-3 mb-2 mt-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Browse Categories</span>
          </div>

          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Code;
            return (
              <NavLink
                key={cat.id}
                to={cat.id === 'all' ? '/' : `/category/${cat.id}`}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary-500/10 text-primary-400 font-medium' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                `}
              >
                <IconComponent className="w-5 h-5" />
                <span>{cat.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User / Auth Area */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-900/20">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-white truncate">{user.username}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">{user.role} Account</span>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all shadow-lg shadow-primary-900/40"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-bold">Sign In</span>
            </NavLink>
          )}
        </div>
              </aside>
    </>
  );
};

export default Sidebar;