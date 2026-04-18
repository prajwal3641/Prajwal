import React, { useState, useRef, MouseEvent } from 'react';
import { PROJECTS } from '../data/constants';
import { ArrowUpRight, Folder, Server, Video, Github, ChevronDown } from 'lucide-react';
import { Project } from '../types/index';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Interactive 3D tilt and mouse spotlight
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (!isExpanded) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3; 
        const rotateY = ((x - centerX) / centerX) * 3;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    } else {
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const getIcon = (type?: string) => {
    switch(type) {
        case 'server': return <Server size={24} />;
        case 'video': return <Video size={24} />;
        default: return <Folder size={24} />;
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
        "from-indigo-900/40 via-purple-900/20 to-zinc-900",
        "from-emerald-900/40 via-teal-900/20 to-zinc-900",
        "from-rose-900/40 via-orange-900/20 to-zinc-900",
        "from-sky-900/40 via-blue-900/20 to-zinc-900",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col border border-zinc-800 rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer
       ${isExpanded ? 'bg-zinc-900/80 shadow-[0_0_40px_rgba(79,70,229,0.1)]' : 'bg-surface hover:bg-surfaceHover hover:border-zinc-700'}`}
      style={{
         transition: 'transform 0.1s ease-out, box-shadow 0.3s ease, background-color 0.3s ease',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)',
        }}
      />
      
      <div className={`w-full bg-gradient-to-br ${getGradient(index)} relative border-b border-zinc-800/50 transition-all duration-500 z-10 ${isExpanded ? 'h-32' : 'h-24'}`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
          <div className="absolute -bottom-6 left-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 text-indigo-400 border border-zinc-700 shadow-xl group-hover:scale-110 transition-transform duration-300">
              {getIcon(project.icon)}
          </div>
          <div className="absolute bottom-4 right-6 text-zinc-500 transform transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDown size={20} className="group-hover:text-white transition-colors" />
          </div>
      </div>

      <div className="p-6 pt-8 flex flex-col flex-grow relative z-10">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center flex-wrap gap-3">
              {project.title}
              {project.title.toLowerCase().includes('intervie.co') && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      200+ Users
                  </span>
              )}
            </h3>
            {!isExpanded && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="text-zinc-400 group-hover:text-indigo-400" />
                </div>
            )}
          </div>

          <div className="space-y-2 mb-6">
          {project.description.map((desc, idx) => (
              <p key={idx} className="text-zinc-400 text-sm leading-relaxed flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-600 shrink-0"></span>
                  {desc}
              </p>
          ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-auto mb-2">
          {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono group-hover:border-zinc-700 transition-colors">
                  {t}
              </span>
          ))}
          </div>

          <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
             <div className="overflow-hidden">
                <div className="pt-6 border-t border-zinc-800 flex flex-col gap-8">
                    
                    {project.link ? (
                        <a href={project.link} target="_blank" rel="noreferrer" className="block w-full rounded-xl overflow-hidden border border-zinc-800 shadow-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] bg-zinc-950 transition-all duration-300 group/card cursor-pointer isolate">
                           {/* Card Top: Browser Bar */}
                           <div className="h-6 bg-zinc-900 border-b border-zinc-800 flex items-center px-3 gap-1.5 relative z-20">
                                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                <div className="ml-2 text-[10px] text-zinc-500 font-mono truncate max-w-[200px]">{project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div>
                           </div>
                           
                           {/* Card Middle: Mini Live Iframe Preview */}
                           <div className="w-full h-48 sm:h-64 overflow-hidden relative bg-zinc-900 z-10 border-b border-zinc-800/50 group/iframe">
                               <div className="absolute top-0 left-0 w-[300%] h-[300%] origin-top-left bg-zinc-50" style={{ transform: 'scale(0.333333)' }}>
                                    <iframe src={project.link} className="w-full h-full border-none pointer-events-none opacity-90 group-hover/card:opacity-100 transition-opacity duration-500" tabIndex={-1} aria-hidden="true" title={`${project.title} Preview`} referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin"/>
                               </div>
                               <div className="absolute inset-0 bg-transparent transition-colors duration-300 z-20 pointer-events-none"></div>
                           </div>

                           {/* Card Bottom: Metadata */}
                           <div className="p-4 sm:p-5 flex flex-col justify-center bg-zinc-900/40 group-hover/card:bg-zinc-800/60 transition-colors">
                               <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1.5">Live Demo</span>
                               <h4 className="text-zinc-200 font-bold text-sm sm:text-base leading-tight group-hover/card:text-indigo-400 transition-colors">
                                   {project.title}
                               </h4>
                               <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed">
                                   {project.description[0]}
                               </p>
                           </div>
                        </a>
                    ) : project.previewImage ? (
                        <a href={project.link || "#"} target="_blank" rel="noreferrer" className="block w-full rounded-xl overflow-hidden border border-zinc-800 shadow-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] bg-zinc-900/40 hover:bg-zinc-800/60 transition-all duration-300 group/card cursor-pointer">
                           {/* Card Top: Image */}
                           <div className="w-full h-48 sm:h-64 overflow-hidden relative bg-zinc-950 border-b border-zinc-800/50">
                               <img src={project.previewImage} alt={`${project.title} Preview`} className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700" />
                               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent pointer-events-none"></div>
                           </div>
                           {/* Card Bottom: Metadata */}
                           <div className="p-4 sm:p-5 flex flex-col justify-center">
                               <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                   {project.link ? project.link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'View Project'}
                               </span>
                               <h4 className="text-zinc-200 font-bold text-sm sm:text-base leading-tight group-hover/card:text-indigo-400 transition-colors">
                                   {project.title}
                               </h4>
                               <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed">
                                   {project.description[0]}
                               </p>
                           </div>
                        </a>
                    ) : null}

                    {project.timeline && project.timeline.length > 0 && (
                        <div className="flex flex-col gap-0 relative pl-4 mt-2">
                             <h4 className="text-xs font-bold text-zinc-500 mb-4 uppercase tracking-widest pl-3 flex items-center gap-2">
                                <ChevronDown size={14} className="text-indigo-400"/> Milestones
                             </h4>
                             
                             <div className="relative pl-3 pr-2 max-h-[250px] min-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-500 scrollbar-track-transparent">
                                 {/* Vertical Connecting Line inside Scroll Container */}
                                 <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500/50 via-zinc-800 to-transparent"></div>
                                 
                                 {project.timeline.map((item, i) => (
                                     <div key={i} className="relative pl-8 pb-8 group/timeline last:pb-4">
                                         <div className="absolute left-[-2px] top-1 w-3 h-3 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover/timeline:border-indigo-400 group-hover/timeline:shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover/timeline:scale-125 group-hover/timeline:bg-indigo-400 transition-all z-10"></div>
                                         <div className="flex flex-col">
                                            <span className="text-xs font-mono text-indigo-400 mb-1">{item.date}</span>
                                            <span className="text-sm font-bold text-zinc-200 mb-1">{item.title}</span>
                                            <p className="text-sm text-zinc-500 leading-relaxed pr-2">{item.description}</p>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                             
                             {/* Scroll indicator mask */}
                             <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none rounded-b-xl"></div>
                        </div>
                    )}

                </div>
             </div>
          </div>

          <div className="flex gap-4 mt-6 pt-4 border-t border-zinc-800/50" onClick={(e) => e.stopPropagation()}>
              {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                      <Github size={14} /> Source Code
                  </a>
              )}
              {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                      <ArrowUpRight size={14} /> Live Demo
                  </a>
              )}
          </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto w-full pt-4 md:pt-8 px-0 mb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Some cool stuff I've built</h1>
        <p className="text-zinc-400 font-mono text-sm">A collection of projects showcasing distributed systems and real-time apps.</p>
        <p className="text-zinc-500 font-mono text-[11px] mt-1.5 uppercase tracking-wider font-semibold">Note: These are my main two projects. My other work and open-source contributions are available on GitHub.</p>
        <div className="flex gap-2 items-center mt-4">
             <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Click cards to expand timeline</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
        {PROJECTS.map((project, idx) => (
           <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default Projects;