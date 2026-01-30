import React from 'react';
import { EXPERIENCE, EDUCATION, ACHIEVEMENTS, CERTIFICATIONS, SKILLS } from '../constants';
import { Briefcase, GraduationCap, Trophy, Award, Layers } from 'lucide-react';

const Resume: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto w-full pt-4 md:pt-8 px-0 mb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">My Resume</h1>
        <p className="text-zinc-400">My educational and professional journey so far.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content: Experience & Education */}
        <div className="lg:col-span-3 space-y-12">
            
            {/* Skills Section - Premium Monochrome Style */}
            <section>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700">
                        <Layers size={20} />
                    </div>
                    Technical Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SKILLS.map((skillGroup) => (
                        <div key={skillGroup.category} className="bg-surface border border-zinc-800/60 p-5 rounded-xl hover:border-zinc-600 transition-colors group">
                            <h4 className="text-zinc-400 font-medium mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                                {skillGroup.category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-medium transition-all duration-200 hover:bg-zinc-200 hover:text-black hover:border-zinc-200 cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700">
                        <Briefcase size={20} />
                    </div>
                    Work Experience
                </h2>
                <div className="relative border-l border-zinc-800 ml-4 space-y-10 pl-8 pb-4">
                    {EXPERIENCE.map((job) => (
                        <div key={job.id} className="relative">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-zinc-900 border-2 border-zinc-600 ring-4 ring-zinc-900 z-10"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="text-lg font-bold text-white">{job.role}</h3>
                                <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800">{job.period}</span>
                            </div>
                            <div className="text-zinc-200 font-medium text-sm mb-4">{job.company} &middot; <span className="text-zinc-500">{job.location}</span></div>
                            
                            <ul className="space-y-2">
                                {job.description.map((point, idx) => (
                                    <li key={idx} className="text-zinc-400 text-sm leading-relaxed pl-4 border-l-2 border-zinc-800 hover:border-zinc-500 transition-colors">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

             {/* Education Section */}
             <section>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700">
                        <GraduationCap size={20} />
                    </div>
                    Education
                </h2>
                <div className="relative border-l border-zinc-800 ml-4 space-y-10 pl-8 pb-4">
                    {EDUCATION.map((edu) => (
                        <div key={edu.id} className="relative">
                            <div className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-zinc-900 border-2 border-zinc-600 ring-4 ring-zinc-900 z-10"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                                <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800">{edu.period}</span>
                            </div>
                            <div className="text-zinc-200 font-medium text-sm mb-2">{edu.degree}</div>
                            <p className="text-zinc-400 text-sm">{edu.score} &middot; {edu.location}</p>
                        </div>
                    ))}
                </div>
            </section>

             {/* Achievements Section */}
             <section>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700">
                        <Trophy size={20} />
                    </div>
                    Achievements
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {ACHIEVEMENTS.map((ach) => (
                        <div key={ach.id} className="p-4 bg-surface border border-zinc-800 rounded-xl hover:border-zinc-500 transition-colors group hover:bg-zinc-800/80">
                            <h4 className="text-white font-bold text-sm mb-1 group-hover:text-white transition-colors">{ach.title}</h4>
                            <p className="text-zinc-400 text-xs">{ach.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications Section */}
            <section>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700">
                        <Award size={20} />
                    </div>
                    Certifications
                </h2>
                <div className="flex flex-wrap gap-3">
                    {CERTIFICATIONS.map((cert) => (
                        <div key={cert.id} className="px-4 py-2 bg-surface border border-zinc-800 rounded-full flex items-center gap-2 hover:border-zinc-500 hover:bg-zinc-800 transition-all">
                            <span className="text-zinc-200 text-sm font-medium">{cert.name}</span>
                            <span className="text-zinc-500 text-xs">— {cert.provider}</span>
                        </div>
                    ))}
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};

export default Resume;