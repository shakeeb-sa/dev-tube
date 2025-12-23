import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../data/videos';
import { 
  Code, Palette, Layout, Server, Atom, Home, Terminal, Globe, Database, Bookmark, X
} from 'lucide-react';

const iconMap = {
  Home: Home, Code: Code, Palette: Palette, Layout: Layout, React: Atom,
  Server: Server, Atom: Atom, Terminal: Terminal, Globe: Globe, Database: Database
};

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay (Click to close) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-slate-850 h-screen flex flex-col border-r border-slate-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500/10 p-2 rounded-lg">
              <Code className="w-6 h-6 text-primary-500" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              All About Coding
            </span>
          </div>
          {/* Close Button (Mobile Only) */}
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavLink
            to="/library"
            onClick={onClose} // Close menu when clicked
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 mb-4 border border-transparent
              ${isActive 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20 border-primary-500' 
                : 'text-slate-100 bg-slate-800/50 hover:bg-slate-800 hover:text-white border-slate-700/50'}
            `}
          >
            <div className="bg-white/10 p-1 rounded">
              <Bookmark className="w-4 h-4" />
            </div>
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

        {/* User Area */}
        <div className="p-4 border-t border-slate-800">
          <a href="https://shakeeb-sa.github.io" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">SA</div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Shakeeb Ahmed</span>
              <span className="text-xs text-slate-500">View Portfolio</span>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;