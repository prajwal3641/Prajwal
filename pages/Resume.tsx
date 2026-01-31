import React from 'react';
import { EXPERIENCE, EDUCATION, ACHIEVEMENTS, CERTIFICATIONS, SKILLS, PERSONAL_INFO } from '../data/constants';
import { Briefcase, GraduationCap, Trophy, Award, Layers, Printer, FileText } from 'lucide-react';

const Resume: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto w-full pt-4 md:pt-8 px-0 mb-20 print:p-0 print:m-0 print:max-w-none">
      
      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 1cm;
          }
          body {
            background-color: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
          }
          /* Hide non-resume elements */
          nav, aside, .bg-noise, button[aria-label="Enlarge QR Code"], .download-btn, .mobile-header, .chill-zone-link {
            display: none !important;
          }
          /* Reset layout for print */
          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .glass-panel, .bg-surface {
            background: none !important;
            border: none !important;
            box-shadow: none !important;
            color: black !important;
          }
          * {
            text-shadow: none !important;
          }
          .text-zinc-400, .text-zinc-500, .text-zinc-200, .text-zinc-300 {
            color: #333 !important;
          }
          h1, h2, h3, h4 {
            color: black !important;
          }
          /* Layout adjustments */
          .grid-cols-1 {
             display: block !important;
          }
          .gap-10 {
            gap: 1.5rem !important;
          }
          .space-y-12 {
            margin-bottom: 2rem !important;
          }
        }
      `}</style>

      {/* Header with Download Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 print:mb-8 print:flex-row print:items-start print:border-b print:border-gray-300 print:pb-6">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2 print:text-4xl print:mb-1">{PERSONAL_INFO.name}</h1>
            <p className="text-zinc-400 print:text-sm print:font-medium">{PERSONAL_INFO.role} &bull; {PERSONAL_INFO.location}</p>
            {/* Print Only Contact Info */}
            <div className="hidden print:flex print:flex-wrap print:gap-4 print:text-xs print:mt-2 print:text-gray-600">
                <span>{PERSONAL_INFO.email}</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>{PERSONAL_INFO.linkedin}</span>
                <span>{PERSONAL_INFO.github}</span>
            </div>
        </div>
        
        <button 
            onClick={handlePrint}
            className="download-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] group"
        >
            <Printer size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Print / Save as PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 print:block">
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12 print:space-y-8">
            
            {/* Skills Section */}
            <section className="print:mb-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 print:mb-3 print:border-b print:border-gray-800 print:pb-1 print:text-lg print:uppercase print:tracking-widest">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700 print:hidden">
                        <Layers size={20} />
                    </div>
                    Technical Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-1 print:gap-2">
                    {SKILLS.map((skillGroup) => (
                        <div key={skillGroup.category} className="bg-surface border border-zinc-800/60 p-5 rounded-xl transition-colors group relative overflow-hidden print:p-0 print:border-none">
                            <h4 className="text-zinc-400 font-medium mb-4 text-xs uppercase tracking-widest flex items-center gap-2 print:mb-1 print:font-bold print:text-black print:text-sm">
                                {skillGroup.category}:
                            </h4>
                            <div className="flex flex-wrap gap-2 relative z-10 print:gap-1">
                                {skillGroup.items.map((skill, i) => (
                                    <span key={skill} className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-medium print:bg-transparent print:border-none print:p-0 print:text-black print:text-sm">
                                        {skill}{i < skillGroup.items.length - 1 ? ',' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="print:mb-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 print:mb-3 print:border-b print:border-gray-800 print:pb-1 print:text-lg print:uppercase print:tracking-widest">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700 print:hidden">
                        <Briefcase size={20} />
                    </div>
                    Work Experience
                </h2>
                <div className="relative border-l border-zinc-800 ml-4 space-y-12 pl-8 pb-4 print:border-none print:ml-0 print:pl-0 print:space-y-6">
                    {EXPERIENCE.map((job) => (
                        <div key={job.id} className="relative group print:mb-4">
                            {/* Timeline Dot - Hide in print */}
                            <div className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-zinc-900 border-2 border-zinc-600 ring-4 ring-zinc-900 z-10 group-hover:border-indigo-500 transition-colors print:hidden"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 print:mb-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors print:text-black print:text-base">{job.role}</h3>
                                <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800 whitespace-nowrap print:bg-transparent print:border-none print:p-0 print:text-gray-600">{job.period}</span>
                            </div>
                            <div className="text-zinc-200 font-medium text-sm mb-4 print:mb-2 print:text-black">{job.company} &middot; <span className="text-zinc-500 print:text-gray-600">{job.location}</span></div>
                            
                            <ul className="space-y-3 print:space-y-1">
                                {job.description.map((point, idx) => (
                                    <li key={idx} className="text-zinc-400 text-sm leading-relaxed pl-0 flex gap-3 print:text-black print:block print:pl-4 print:relative">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0 group-hover:bg-indigo-500/50 transition-colors print:absolute print:left-0 print:top-2 print:w-1.5 print:h-1.5 print:bg-black print:rounded-full"></span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

             {/* Education Section */}
             <section className="print:mb-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 print:mb-3 print:border-b print:border-gray-800 print:pb-1 print:text-lg print:uppercase print:tracking-widest">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700 print:hidden">
                        <GraduationCap size={20} />
                    </div>
                    Education
                </h2>
                <div className="relative border-l border-zinc-800 ml-4 space-y-10 pl-8 pb-4 print:border-none print:ml-0 print:pl-0">
                    {EDUCATION.map((edu) => (
                        <div key={edu.id} className="relative group">
                            <div className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-zinc-900 border-2 border-zinc-600 ring-4 ring-zinc-900 z-10 group-hover:border-emerald-500 transition-colors print:hidden"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 print:mb-0">
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors print:text-black print:text-base">{edu.institution}</h3>
                                <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800 whitespace-nowrap print:bg-transparent print:border-none print:p-0 print:text-gray-600">{edu.period}</span>
                            </div>
                            <div className="text-zinc-200 font-medium text-sm mb-2 print:text-black">{edu.degree}</div>
                            <p className="text-zinc-400 text-sm print:text-gray-700">{edu.score} &middot; {edu.location}</p>
                        </div>
                    ))}
                </div>
            </section>

             {/* Achievements Section */}
             <section className="print:mb-6 print:break-inside-avoid">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 print:mb-3 print:border-b print:border-gray-800 print:pb-1 print:text-lg print:uppercase print:tracking-widest">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700 print:hidden">
                        <Trophy size={20} />
                    </div>
                    Achievements
                </h2>
                <div className="grid md:grid-cols-2 gap-4 print:block print:space-y-2">
                    {ACHIEVEMENTS.map((ach) => (
                        <div key={ach.id} className="p-5 bg-surface border border-zinc-800 rounded-xl hover:border-amber-500/50 transition-all group hover:bg-zinc-800/80 hover:-translate-y-1 print:p-0 print:border-none print:bg-transparent">
                            <h4 className="text-white font-bold text-sm mb-2 group-hover:text-amber-400 transition-colors print:text-black print:inline-block print:mr-2 print:text-sm">{ach.title}:</h4>
                            <span className="text-zinc-400 text-xs leading-relaxed print:text-black print:text-sm">{ach.description}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications Section */}
            <section className="print:break-inside-avoid">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 print:mb-3 print:border-b print:border-gray-800 print:pb-1 print:text-lg print:uppercase print:tracking-widest">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100 border border-zinc-700 print:hidden">
                        <Award size={20} />
                    </div>
                    Certifications
                </h2>
                <div className="flex flex-wrap gap-3 print:block print:space-y-1">
                    {CERTIFICATIONS.map((cert) => (
                        <div key={cert.id} className="px-4 py-3 bg-surface border border-zinc-800 rounded-lg flex items-center gap-3 hover:border-zinc-500 hover:bg-zinc-800 transition-all print:p-0 print:border-none print:bg-transparent print:flex-none print:block">
                             <FileText size={16} className="text-zinc-500 print:hidden" />
                             <div className="flex flex-col print:flex-row print:gap-2">
                                <span className="text-zinc-200 text-sm font-medium print:text-black print:text-sm">&bull; {cert.name}</span>
                                <span className="text-zinc-500 text-[10px] uppercase tracking-wider print:text-gray-600 print:text-sm print:normal-case">&mdash; {cert.provider}</span>
                             </div>
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