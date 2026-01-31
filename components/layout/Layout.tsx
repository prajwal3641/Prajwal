import React, { useState } from 'react';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import MobileHeader from './MobileHeader';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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

export default Layout;