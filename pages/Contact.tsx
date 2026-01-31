import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { PERSONAL_INFO } from '../data/constants';
import { Github, Linkedin, Mail, Phone, Copy, Check, Fingerprint, Shield, Cpu, X, ScanLine, Maximize2, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const copyToClipboard = (text: string, field: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Generate vCard Data
  const qrCodeUrl = useMemo(() => {
      const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${PERSONAL_INFO.name}
N:${PERSONAL_INFO.name};;;;
TITLE:${PERSONAL_INFO.role}
TEL:${PERSONAL_INFO.phone}
EMAIL:${PERSONAL_INFO.email}
URL:${PERSONAL_INFO.linkedin}
NOTE:${PERSONAL_INFO.bio}
END:VCARD`;
      
      // High resolution for both card (scaled down) and modal (full size)
      return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(vCardData)}&bgcolor=ffffff&color=000000&margin=2`;
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto w-full pt-4 md:pt-8 px-0 mb-20 flex flex-col items-center">
        <div className="mb-12 text-center w-full">
          <h1 className="text-3xl font-bold text-white mb-2">Developer Identity</h1>
          <p className="text-zinc-400">Access granted. Official credentials.</p>
        </div>

        {/* 3D Card Container */}
        <div className="relative w-full max-w-[420px] aspect-[1.58/1] perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`relative w-full h-full transition-all duration-700 transform preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* FRONT OF CARD */}
            <div className="absolute inset-0 backface-hidden">
              {/* Card Background & Texture */}
              <div className="w-full h-full bg-[#18181b] rounded-2xl border border-zinc-700/50 overflow-hidden shadow-2xl relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-16 -mb-16 pointer-events-none"></div>
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                {/* Card Content */}
                <div className="relative z-10 h-full p-6 flex flex-col">
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center border border-zinc-700">
                             <Cpu size={18} className="text-indigo-400" />
                          </div>
                          <div className="flex flex-col">
                              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest leading-none mb-0.5">Clearance Lvl 5</span>
                              <span className="text-xs font-bold text-white tracking-wide">ENGINEERING</span>
                          </div>
                      </div>
                      <Fingerprint size={32} className="text-zinc-700 opacity-50" />
                  </div>

                  {/* Main Identity Area */}
                  <div className="flex items-start gap-5 flex-1">
                      {/* Photo */}
                      <div className="relative">
                          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-zinc-700 bg-zinc-800 shadow-inner">
                              <img 
                                  src={PERSONAL_INFO.avatar} 
                                  alt="ID Photo"
                                  className="w-full h-full object-cover bg-indigo-900/20"
                              />
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm whitespace-nowrap">
                              Active
                          </div>
                      </div>

                      {/* Text Details */}
                      <div className="flex-1 space-y-3 pt-1">
                          <div>
                              <h2 className="text-2xl font-bold text-white leading-tight tracking-tight">{PERSONAL_INFO.name.toUpperCase()}</h2>
                              <p className="text-indigo-400 font-mono text-xs uppercase tracking-wide">{PERSONAL_INFO.role}</p>
                          </div>
                          
                          <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-zinc-400">
                                  <span className="font-mono text-zinc-600 w-12 uppercase">ID No</span>
                                  <span className="text-zinc-300 font-mono">DEV-2025-8X</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-zinc-400">
                                  <span className="font-mono text-zinc-600 w-12 uppercase">Loc</span>
                                  <span className="text-zinc-300 truncate">{PERSONAL_INFO.location}</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Footer / Barcode Area */}
                  <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-end">
                      <div className="h-8 w-48 opacity-40" style={{
                          backgroundImage: `repeating-linear-gradient(90deg, 
                              transparent 0px, transparent 2px, 
                              #fff 2px, #fff 4px, 
                              transparent 4px, transparent 5px, 
                              #fff 5px, #fff 8px)`,
                      }}></div>
                      <div className="text-[10px] text-zinc-600 font-mono">
                          EXP: NEVER
                      </div>
                  </div>

                </div>
                
                {/* Holographic Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div className="absolute inset-0 rotate-y-180 backface-hidden">
               <div className="w-full h-full bg-[#18181b] rounded-2xl border border-zinc-700/50 overflow-hidden shadow-2xl relative p-6 flex flex-col">
                  
                  {/* Magnetic Strip Visual */}
                  <div className="absolute top-8 left-0 right-0 h-10 bg-[#000] z-0"></div>

                  <div className="relative z-10 mt-16 flex-1 flex flex-col gap-4">
                      
                      <div className="grid grid-cols-2 gap-3">
                          {/* Contact Actions */}
                          <div className="col-span-2 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 flex items-center justify-between group/item">
                               <div className="flex items-center gap-3 overflow-hidden">
                                   <div className="p-1.5 bg-zinc-800 rounded text-zinc-400">
                                       <Mail size={14} />
                                   </div>
                                   <div className="flex flex-col overflow-hidden">
                                       <span className="text-[10px] text-zinc-500 uppercase font-bold">Email</span>
                                       <span className="text-xs text-zinc-300 truncate font-mono">{PERSONAL_INFO.email}</span>
                                   </div>
                               </div>
                               <button 
                                  onClick={(e) => copyToClipboard(PERSONAL_INFO.email, 'email', e)}
                                  className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors"
                               >
                                   {copiedField === 'email' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                               </button>
                          </div>

                          <div className="col-span-2 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 flex items-center justify-between group/item">
                               <div className="flex items-center gap-3 overflow-hidden">
                                   <div className="p-1.5 bg-zinc-800 rounded text-zinc-400">
                                       <Phone size={14} />
                                   </div>
                                   <div className="flex flex-col overflow-hidden">
                                       <span className="text-[10px] text-zinc-500 uppercase font-bold">Phone</span>
                                       <span className="text-xs text-zinc-300 truncate font-mono">{PERSONAL_INFO.phone}</span>
                                   </div>
                               </div>
                               <button 
                                  onClick={(e) => copyToClipboard(PERSONAL_INFO.phone, 'phone', e)}
                                  className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors"
                               >
                                   {copiedField === 'phone' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                               </button>
                          </div>
                      </div>

                      {/* Social Icons Row + QR */}
                      <div className="mt-auto flex justify-between items-center pt-4 border-t border-zinc-800">
                          <div className="flex gap-2">
                              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 hover:text-white text-zinc-400 transition-colors border border-zinc-700">
                                  <Github size={16} />
                              </a>
                              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 hover:text-white text-zinc-400 transition-colors border border-zinc-700">
                                  <Linkedin size={16} />
                              </a>
                              <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 hover:text-white text-zinc-400 transition-colors border border-zinc-700">
                                  <Twitter size={16} />
                              </a>
                          </div>
                          
                          {/* FUNCTIONAL QR CODE BUTTON - Card View */}
                          <div className="flex items-center gap-3">
                               <div className="flex flex-col items-end">
                                   <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider animate-pulse whitespace-nowrap">Tap for QR</span>
                               </div>
                               <button 
                                  onClick={(e) => { 
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setShowQrModal(true); 
                                  }}
                                  className="relative group/qr p-1.5 bg-white rounded-lg hover:scale-105 transition-transform shadow-lg cursor-zoom-in border-2 border-transparent hover:border-indigo-500 z-50"
                                  aria-label="Enlarge QR Code"
                              >
                                  <img src={qrCodeUrl} alt="Contact QR" className="w-12 h-12 object-contain" />
                                  
                                  {/* Hover overlay hint */}
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md opacity-0 group-hover/qr:opacity-100 transition-opacity">
                                      <Maximize2 size={20} className="text-black drop-shadow-md" />
                                  </div>
                              </button>
                          </div>
                      </div>

                  </div>
               </div>
            </div>

          </div>
        </div>
        
        <p className="mt-8 text-zinc-500 text-sm flex items-center gap-2 animate-pulse">
          <Shield size={14} /> Tap card to flip for details
        </p>

      </div>

      {/* FULLSCREEN QR OVERLAY - Portal to Body for maximum z-index safety */}
      {showQrModal && createPortal(
        <div 
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in" 
            onClick={() => setShowQrModal(false)}
        >
            {/* Close Button */}
            <button 
                onClick={(e) => { e.stopPropagation(); setShowQrModal(false); }}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors border border-zinc-700 z-50"
            >
                <X size={24} />
            </button>

            <div 
                className="flex flex-col items-center gap-6 w-full max-w-sm md:max-w-xl animate-scale-up" 
                onClick={e => e.stopPropagation()}
            >
                <div className="text-center space-y-2">
                    <h3 className="text-white font-bold text-2xl md:text-3xl tracking-tight">Scan to Connect</h3>
                    <p className="text-zinc-400 font-medium">Point your camera at the code</p>
                </div>

                {/* Massive White Container for QR */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_0_100px_rgba(255,255,255,0.15)] w-full aspect-square relative flex items-center justify-center border-8 border-zinc-900">
                    <img src={qrCodeUrl} alt="Fullscreen Contact QR" className="w-full h-full object-contain mix-blend-multiply" />
                    
                    {/* Corner accents for framing */}
                    <div className="absolute top-5 left-5 w-8 h-8 border-t-4 border-l-4 border-black rounded-tl-sm opacity-60"></div>
                    <div className="absolute top-5 right-5 w-8 h-8 border-t-4 border-r-4 border-black rounded-tr-sm opacity-60"></div>
                    <div className="absolute bottom-5 left-5 w-8 h-8 border-b-4 border-l-4 border-black rounded-bl-sm opacity-60"></div>
                    <div className="absolute bottom-5 right-5 w-8 h-8 border-b-4 border-r-4 border-black rounded-br-sm opacity-60"></div>
                </div>
                
                <div className="inline-flex items-center gap-3 text-zinc-500 text-sm font-mono bg-zinc-900/80 px-5 py-2.5 rounded-full border border-zinc-800 backdrop-blur-sm">
                    <ScanLine size={16} className="text-emerald-500" /> 
                    <span className="text-zinc-300">vCard Format Ready</span>
                </div>
            </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Add styles for 3D flip and animations if not in global CSS
const style = document.createElement('style');
style.innerHTML = `
  .preserve-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .perspective-1000 { perspective: 1000px; }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }

  @keyframes scale-up {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .animate-scale-up { animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
`;
document.head.appendChild(style);

export default Contact;