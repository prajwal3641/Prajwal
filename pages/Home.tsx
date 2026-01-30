import React from 'react';
import SystemStatus from '../components/SystemStatus';
import Terminal from '../components/Terminal';
import { PERSONAL_INFO } from '../constants';
import { ArrowRight, Terminal as TerminalIcon, Zap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full pt-8 md:pt-20 px-0">
      
      {/* 1. Intro Text - Priority #1 (Identity) */}
      <div className="mb-14 space-y-8 animate-fade-in-up">
        <div className="flex items-center gap-3">
             <div className="h-px bg-zinc-700 w-8"></div>
             <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest font-medium">Product Developer</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Building scalable <br />
          <span className="text-indigo-300">Distributed Systems</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Hi, I'm <span className="text-zinc-200 font-semibold">{PERSONAL_INFO.name}</span>. <br />
          {PERSONAL_INFO.bio} Currently optimizing high-throughput architecture at <span className="text-zinc-200">EdgeVerve</span>.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
           <Link to="/projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-200 text-black hover:bg-white font-semibold transition-all hover:gap-3 shadow-lg shadow-zinc-900/20">
             View Work <ArrowRight size={18} />
           </Link>
           <Link to="/resume" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all">
             Resume
           </Link>
        </div>
      </div>

      {/* 2. Interactive Terminal - The "Hook" (Interaction) */}
      <div className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
         <div className="flex items-center gap-3 mb-4 opacity-70">
            <TerminalIcon size={14} className="text-zinc-500" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Interactive Session</span>
            <div className="h-px bg-zinc-800 flex-1" />
         </div>
         <Terminal />
      </div>

      {/* 3. Highlights / Social Proof */}
      <div className="grid md:grid-cols-2 gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="glass-panel p-6 rounded-2xl hover:border-zinc-600 transition-all group cursor-pointer bg-surface/50">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-zinc-800 rounded-xl text-zinc-400 group-hover:text-zinc-200 transition-colors border border-zinc-700/50">
                    <TerminalIcon size={24} />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-white tabular-nums">1804</span>
                    <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-wider">LeetCode Rating</span>
                </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-200 mb-2 group-hover:text-white transition-colors">Global Top 1.6%</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
                Consistent performance in biweekly contests. Ranked 489 worldwide in Contest 148.
            </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover:border-zinc-600 transition-all group cursor-pointer bg-surface/50">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-zinc-800 rounded-xl text-zinc-400 group-hover:text-zinc-200 transition-colors border border-zinc-700/50">
                    <Zap size={24} />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-white tabular-nums">Top 5</span>
                    <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-wider">Rabbit AI Hackathon</span>
                </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-200 mb-2 group-hover:text-white transition-colors">Elite Finalist</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
                Selected as a finalist among 100+ competing teams for innovative AI implementation.
            </p>
        </div>
      </div>

      {/* 4. Technical Proficiency - (Formerly System Status) */}
       <div className="space-y-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
         <div className="flex items-center gap-3 opacity-70">
            <Layers size={14} className="text-zinc-500" />
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Technical Proficiency</h3>
            <div className="h-px bg-zinc-800 flex-1" />
         </div>
         <SystemStatus />
      </div>

    </div>
  );
};

export default Home;