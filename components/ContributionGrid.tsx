import React, { useEffect, useState } from 'react';

const ContributionGrid: React.FC = () => {
  const [grid, setGrid] = useState<number[]>([]);

  useEffect(() => {
    // Generate a random grid
    // 0 = empty, 1 = low, 2 = med, 3 = high, 4 = accent
    const cols = 40; 
    const rows = 7;
    const total = cols * rows;
    const newGrid = Array.from({ length: total }, () => {
       const rand = Math.random();
       if (rand > 0.92) return 4; // Rare accent
       if (rand > 0.7) return 3;
       if (rand > 0.5) return 2;
       if (rand > 0.3) return 1;
       return 0;
    });
    setGrid(newGrid);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-2xl glass-panel p-1 mb-8 shadow-sm border border-zinc-800/50">
      <div className="flex flex-wrap gap-1 justify-center p-2 opacity-80 hover:opacity-100 transition-opacity duration-700">
        {grid.map((val, i) => {
           let colorClass = 'bg-[#27272a]'; // Level 0 (Zinc 800)

           // Monochromatic Blue-Grey Scale
           if (val === 1) colorClass = 'bg-slate-800'; 
           if (val === 2) colorClass = 'bg-slate-700'; 
           if (val === 3) colorClass = 'bg-slate-600'; 
           if (val === 4) colorClass = 'bg-slate-500'; // Brightest
           
           return (
             <div 
               key={i} 
               className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[2px] ${colorClass} transition-colors duration-500`}
             />
           );
        })}
      </div>
    </div>
  );
};

export default ContributionGrid;