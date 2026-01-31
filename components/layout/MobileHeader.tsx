import React from 'react';
import { Menu } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/constants';

interface MobileHeaderProps {
    onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
    return (
        <div className="mobile-header md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-zinc-800 z-40 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg blur opacity-30"></div>
                    <img 
                        src={PERSONAL_INFO.avatar}
                        alt="Profile" 
                        className="relative w-9 h-9 rounded-lg bg-indigo-900/20 border border-zinc-700 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-900">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    </div>
                 </div>
                 <span className="text-sm font-bold text-zinc-200 tracking-tight">Prajwal Rode</span>
            </div>
            <button 
                onClick={onMenuClick}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
                <Menu size={24} />
            </button>
        </div>
    )
}

export default MobileHeader;