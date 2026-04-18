import React, { useState, useEffect } from 'react';
import SystemStatus from '../components/SystemStatus';
import Terminal from '../components/Terminal';
import { PERSONAL_INFO } from '../data/constants';
import { ArrowRight, Terminal as TerminalIcon, Zap, Layers, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(true);
    }, 3500); // Show after 3.5 seconds
    // Custom Infinite Typing effect for 'Products'
    const targetText = "Products";
    let isMounted = true;
    
    const animateTyping = async () => {
      while (isMounted) {
        // Typing forward
        for (let j = 0; j <= targetText.length; j++) {
           if (!isMounted) return;
           setTypedText(targetText.slice(0, j));
           await new Promise(r => setTimeout(r, 150));
        }
        if (!isMounted) return;
        await new Promise(r => setTimeout(r, 2000)); // Pause when full word is typed
        
        // Deleting backward
        for (let j = targetText.length; j >= 0; j--) {
           if (!isMounted) return;
           setTypedText(targetText.slice(0, j));
           await new Promise(r => setTimeout(r, 50));
        }
        if (!isMounted) return;
        await new Promise(r => setTimeout(r, 500)); // Short pause before starting over
      }
    };
    
    animateTyping();
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full pt-8 md:pt-20 px-0">
      
      {/* 1. Intro Text - Priority #1 (Identity) */}
      <div className="mb-14 space-y-8 animate-fade-in-up">

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          <span className="relative inline-block text-zinc-600 mb-2">
              Building projects
              <span className="absolute left-0 top-1/2 w-full h-1 lg:h-1.5 bg-red-500/80 -translate-y-1/2 -rotate-2"></span>
          </span>
          <br />
          Building Scalable <br />
          <span className="text-indigo-300">
             {typedText}
             <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
          Hi, I'm <span className="text-zinc-200 font-semibold tracking-wide">{PERSONAL_INFO.name}</span>. <br />
          I am a passionate creator who thrives on building elegant, high-performance web applications and digital experiences. Currently driving scalable architecture as a Software Development Engineer at <span className="text-indigo-300 font-medium">EdgeVerve</span>. <br />
          <span className="text-zinc-300 italic">I'm also actively open to exciting freelance collaborations.</span>
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
           <button onClick={() => {
               document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' });
           }} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-200 text-black hover:bg-white font-semibold transition-all hover:gap-3 shadow-lg shadow-zinc-900/20">
             Ask about me <ArrowRight size={18} />
           </button>
           <Link to="/projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all">
             Projects completed
           </Link>
        </div>
      </div>

      {/* 2. Interactive Terminal - The "Hook" (Interaction) */}
      <div id="terminal-section" className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
      {showSnackbar && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 p-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[100] animate-fade-in-up flex items-start gap-4 ring-1 ring-white/10">
           {/* Notification highlight styling */}
           <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70"></div>
           
           <div className="mt-1 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
               <Zap size={20} />
           </div>
           <div className="flex-1 pr-6">
               <h4 className="text-zinc-100 font-bold text-sm mb-1">Open to Freelance</h4>
               <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                  I am actively seeking freelance opportunities. If you have an exciting project, I'd love to chat!
               </p>
               <div className="flex gap-3">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-zinc-200 transition-colors">
                     Contact Me
                  </a>
                  <button onClick={() => setShowSnackbar(false)} className="text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors">
                     Dismiss
                  </button>
               </div>
           </div>

           {/* Close icon button at top right */}
           <button onClick={() => setShowSnackbar(false)} className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors">
              <X size={16} />
           </button>
        </div>
      )}

    </div>
  );
};

export default Home;