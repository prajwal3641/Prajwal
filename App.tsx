import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import IntroScreen from './components/IntroScreen';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Games from './pages/Games';
import Contact from './pages/Contact';
import { PERSONAL_INFO } from './constants';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const MobileHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    return (
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-zinc-800 z-40 px-4 flex items-center justify-between">
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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-zinc-200 selection:bg-indigo-500/30">
      
      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Sidebar (Mobile + Desktop) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-20 flex justify-center w-full pt-16 md:pt-0">
         <div className="w-full max-w-7xl flex">
            
            {/* Center Column */}
            <div className="flex-1 px-4 md:px-8 py-6 w-full max-w-full xl:max-w-[calc(100%-340px)]">
               {children}
            </div>

            {/* Right Sidebar (Desktop XL+) */}
            <RightPanel />
            
         </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/games" element={<Games />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </HashRouter>
    </>
  );
};

export default App;