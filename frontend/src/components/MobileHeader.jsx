import React from 'react';
import { Menu, Code } from 'lucide-react';

const MobileHeader = ({ onMenuClick }) => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-slate-850 border-b border-slate-800 sticky top-0 z-30">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="bg-primary-500/10 p-1.5 rounded-lg">
          <Code className="w-5 h-5 text-primary-500" />
        </div>
        <span className="font-bold text-base tracking-tight text-white">
          All About Coding
        </span>
      </div>

      {/* Menu Button */}
      <button 
        onClick={onMenuClick}
        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MobileHeader;