import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Folder, Server, Video, Github } from 'lucide-react';

const Projects: React.FC = () => {
  
  const getIcon = (type?: string) => {
    switch(type) {
        case 'server': return <Server size={24} />;
        case 'video': return <Video size={24} />;
        default: return <Folder size={24} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full pt-4 md:pt-8 px-0 mb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Some cool stuff I've built</h1>
        <p className="text-zinc-400">A collection of projects showcasing distributed systems and real-time apps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group bg-surface hover:bg-surfaceHover border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-zinc-400 group-hover:text-indigo-400" />
            </div>

            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800/50 text-indigo-400 border border-zinc-700/50 group-hover:scale-110 transition-transform duration-300">
               {getIcon(project.icon)}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>

            <div className="space-y-2 mb-6 flex-grow">
               {project.description.map((desc, idx) => (
                   <p key={idx} className="text-zinc-400 text-sm leading-relaxed">
                     • {desc}
                   </p>
               ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
               {project.tech.map((t) => (
                   <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                       {t}
                   </span>
               ))}
            </div>

            <div className="flex gap-4 mt-6 pt-4 border-t border-zinc-800/50">
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
        ))}
      </div>
    </div>
  );
};

export default Projects;