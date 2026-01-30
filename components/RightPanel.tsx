import React from 'react';
import { Mail, Github, Linkedin, MapPin, Twitter } from 'lucide-react';
import { PERSONAL_INFO, SKILLS } from '../constants';

const RightPanel: React.FC = () => {
  return (
    <aside className="hidden xl:flex flex-col w-80 min-w-[320px] p-6 gap-6 sticky top-0 h-screen overflow-y-auto border-l border-white/5 bg-background/50 backdrop-blur-sm">
      
      {/* Contact / Welcome Widget */}
      <div className="glass-panel rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-zinc-200">
          <span className="animate-pulse">👋</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Welcome</span>
        </div>
        <h3 className="text-zinc-100 font-semibold mb-2">Glad to have you here.</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>
        
        <div className="flex flex-col gap-4">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group">
            <Mail size={16} />
            <span className="group-hover:translate-x-1 transition-transform">Send an email</span>
          </a>
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group">
            <Github size={16} />
            <span className="group-hover:translate-x-1 transition-transform">GitHub Profile</span>
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group">
            <Linkedin size={16} />
            <span className="group-hover:translate-x-1 transition-transform">LinkedIn Profile</span>
          </a>
          <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group">
            <Twitter size={16} />
            <span className="group-hover:translate-x-1 transition-transform">Twitter / X</span>
          </a>
        </div>
      </div>

      {/* Skills Widget */}
      <div className="glass-panel rounded-2xl p-6 shadow-sm">
        <h3 className="text-zinc-100 font-semibold mb-5 text-[11px] uppercase tracking-widest">Technical Skills</h3>
        <div className="flex flex-col gap-6">
            {SKILLS.map((skillGroup) => (
                <div key={skillGroup.category}>
                    <h4 className="text-zinc-500 text-[10px] font-bold mb-3 uppercase tracking-wider">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map(skill => (
                            <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 hover:border-zinc-200 hover:text-black hover:bg-zinc-200 transition-all cursor-default shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Location */}
      <div className="mt-auto pt-4 border-t border-white/5 text-center">
         <p className="flex items-center justify-center gap-2 text-zinc-600 text-xs">
            <MapPin size={12} />
            {PERSONAL_INFO.location}
         </p>
      </div>

    </aside>
  );
};

export default RightPanel;