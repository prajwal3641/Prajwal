import React from 'react';
import { Server, Database, Cloud, Code2, Trophy, GitBranch } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';

const SystemStatus: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        
        {/* 1. Backend & Architecture (Primary Focus) */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Server size={18} />
                </div>
                <h3 className="text-sm font-bold text-zinc-200">Backend Engineering</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'System Design', 'Rust'].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md">
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        {/* 2. Data & Infrastructure */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Database size={18} />
                </div>
                <h3 className="text-sm font-bold text-zinc-200">Data & Infrastructure</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {['PostgreSQL', 'Redis', 'MongoDB', 'Docker', 'Kubernetes', 'AWS'].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md">
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        {/* 3. Problem Solving Stats (Recruiter Highlight) */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Trophy size={18} />
                </div>
                <h3 className="text-sm font-bold text-zinc-200">Problem Solving</h3>
            </div>
            <div className="flex justify-between items-center px-2">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white tracking-tight">1804</span>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">LeetCode Rating</span>
                </div>
                <div className="w-px h-8 bg-zinc-800"></div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-white tracking-tight">400+</span>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Problems Solved</span>
                </div>
            </div>
        </div>

        {/* 4. Development Tools */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 hover:border-zinc-700 transition-colors">
             <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                    <Code2 size={18} />
                </div>
                <h3 className="text-sm font-bold text-zinc-200">Tools & Workflow</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
                 <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <GitBranch size={14} /> Git & GitHub
                 </div>
                 <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Cloud size={14} /> CI/CD Pipelines
                 </div>
                 <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Server size={14} /> Linux / Bash
                 </div>
                 <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Database size={14} /> Postman
                 </div>
            </div>
        </div>

    </div>
  );
};

export default SystemStatus;