import React from 'react';
import { Home, User, FolderGit2, X, Gamepad2, Fingerprint } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PERSONAL_INFO } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: User, label: "Resume", path: "/resume" },
    { icon: FolderGit2, label: "Projects", path: "/projects" },
    { icon: Gamepad2, label: "Games", path: "/games" },
    { icon: Fingerprint, label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <nav className={`
        fixed top-0 left-0 h-full z-50 
        bg-background/80 backdrop-blur-xl border-r border-white/5
        transition-transform duration-300 ease-in-out
        flex flex-col items-center py-6 gap-8
        md:translate-x-0 md:w-20
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
      `}>
        
        {/* Logo Area */}
        <div className="flex items-center justify-between w-full px-6 md:px-0 md:justify-center mb-4 pt-2">
          <Link to="/" className="relative group cursor-pointer block" onClick={onClose}>
            {/* Animated Glow Background - Cyberpunk Style */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>
            
            {/* Main Icon Container */}
            <div className="relative w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800/50 overflow-hidden shadow-2xl">
                <img 
                   src={PERSONAL_INFO.avatar}
                   alt="Profile" 
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 bg-indigo-900/20"
                />
            </div>

            {/* Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full flex items-center justify-center border-2 border-zinc-900">
                 <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
            </div>
          </Link>
          
          {/* Close button only on mobile */}
          <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation Items */}
        <div className="flex flex-col gap-4 w-full px-4 md:px-0 md:items-center">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={onClose}
              className={`group relative flex items-center gap-4 px-4 md:px-0 md:justify-center h-10 rounded-lg transition-all duration-200
                ${isActive(item.path) 
                  ? 'bg-white/5 text-indigo-400 shadow-inner' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                } md:w-10 md:h-10`}
            >
              <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              
              {/* Text Label - Visible on Mobile, Tooltip on Desktop */}
              <span className="font-medium text-sm md:hidden">{item.label}</span>
              
              {/* Tooltip (Desktop Only) */}
              <span className="hidden md:block absolute left-14 bg-zinc-900 border border-white/10 text-white text-xs px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </span>
              
              {/* Active Indicator (Desktop) */}
              {isActive(item.path) && (
                <div className="hidden md:block absolute -left-[1px] top-2 bottom-2 w-0.5 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;