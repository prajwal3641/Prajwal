import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Timer, Grid, ArrowLeft, Play, RotateCcw, Bug } from 'lucide-react';
import { PERSONAL_INFO } from '../data/constants';

// --- GAME 1: MEMORY MATCH ---
const ICONS = ['⚛️', '🐍', '🚀', '💻', '🎨', '🎮', '💾', '🔋'];

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const deck = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      
      if (newCards[firstIdx].content === newCards[secondIdx].content) {
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        
        if (newCards.every(c => c.isMatched)) {
          setIsWon(true);
        }
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(prev => prev.map((c, i) => (i === firstIdx || i === secondIdx) ? {...c, isFlipped: false} : c));
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex gap-4 text-zinc-300 font-mono text-sm">
           <span>Moves: {moves}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {isWon ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-white mb-4">🎉 System Optimized!</h2>
            <p className="text-zinc-400 mb-8">You cleared the memory in {moves} moves.</p>
            <button 
              onClick={initializeGame}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-sm mx-auto">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl flex items-center justify-center transition-all duration-300 transform
                  ${card.isFlipped || card.isMatched 
                    ? 'bg-zinc-800 rotate-y-180 border border-indigo-500/30' 
                    : 'bg-zinc-900 border border-zinc-700 hover:border-zinc-500'
                  }
                `}
              >
                {(card.isFlipped || card.isMatched) ? card.content : ''}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- GAME 2: REFLEX TEST ---
const ReflexTest: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [status, setStatus] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [message, setMessage] = useState("Click to start");
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState(0);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleStart = () => {
    setStatus('waiting');
    setMessage("Wait for green...");
    
    const randomDelay = Math.floor(Math.random() * 2000) + 1500; 
    
    const id = window.setTimeout(() => {
      setStatus('ready');
      setMessage("CLICK NOW!");
      setStartTime(Date.now());
    }, randomDelay);
    
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (status === 'idle') {
      handleStart();
    } else if (status === 'waiting') {
      if (timeoutId) clearTimeout(timeoutId);
      setStatus('result');
      setResult(0); 
      setMessage("Too early! ⚠️");
    } else if (status === 'ready') {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setResult(reaction);
      setStatus('result');
      setMessage(`${reaction}ms`);
    } else if (status === 'result') {
      handleStart();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  let bgClass = 'bg-zinc-900 border-zinc-700';
  if (status === 'waiting') bgClass = 'bg-rose-900/20 border-rose-900/50';
  if (status === 'ready') bgClass = 'bg-emerald-500 border-emerald-400 cursor-pointer';
  if (status === 'result') bgClass = 'bg-zinc-800 border-zinc-600';

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div 
          onClick={handleClick}
          className={`
            w-full max-w-md h-80 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none
            ${bgClass}
          `}
        >
          <div className="text-4xl font-bold text-white mb-2">{message}</div>
          {status === 'idle' && <p className="text-zinc-500">Test your frontend reflexes</p>}
          {status === 'waiting' && <p className="text-rose-400 animate-pulse">Wait for it...</p>}
          {status === 'result' && (
             <div className="flex flex-col items-center mt-4">
               {result === 0 ? (
                 <p className="text-zinc-400">Patience is a virtue.</p>
               ) : (
                 <p className="text-zinc-400">
                    {result < 250 ? "⚡ Blazing fast!" : "Not bad, keep practicing."}
                 </p>
               )}
               <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500 uppercase tracking-widest">
                  <RotateCcw size={14} /> Click to try again
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- GAME 3: WHACK-A-BUG ---
const WhackABug: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [grid, setGrid] = useState(Array(9).fill(false));
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    
    // Refs to manage intervals without re-renders causing issues
    const timerRef = useRef<number | null>(null);
    const bugTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            stopGame();
        };
    }, []);

    const stopGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (bugTimeoutRef.current) clearTimeout(bugTimeoutRef.current);
    };

    const startGame = () => {
        setIsPlaying(true);
        setGameOver(false);
        setScore(0);
        setTimeLeft(30);
        setGrid(Array(9).fill(false));

        // Countdown Timer
        timerRef.current = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        moveBug();
    };

    const endGame = () => {
        stopGame();
        setIsPlaying(false);
        setGameOver(true);
        setGrid(Array(9).fill(false));
    };

    const moveBug = () => {
        const randomDelay = Math.random() * 500 + 400; // 400ms - 900ms
        
        bugTimeoutRef.current = window.setTimeout(() => {
            const newGrid = Array(9).fill(false);
            const randomIdx = Math.floor(Math.random() * 9);
            newGrid[randomIdx] = true;
            setGrid(newGrid);
            
            // Schedule next move only if time remains
            // Note: We check a ref or rely on cleanup, but simple recursion works if stopped correctly
            moveBug();
        }, randomDelay);
    };

    const handleWhack = (index: number) => {
        if (!isPlaying) return;
        
        if (grid[index]) {
            setScore(s => s + 1);
            // Instant hide + respawn logic could go here, 
            // but for simplicity we let the loop handle movement
            // Optionally, clear the bug immediately to prevent double clicks
            const newGrid = [...grid];
            newGrid[index] = false;
            setGrid(newGrid);
        } else {
            setScore(s => Math.max(0, s - 1)); // Penalty for miss?
        }
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={18} /> Back
                </button>
                <div className="flex gap-6 text-zinc-300 font-mono text-sm">
                    <span className="text-rose-400 font-bold">Time: {timeLeft}s</span>
                    <span className="text-white font-bold">Score: {score}</span>
                </div>
            </div>

            <div className="flex flex-col items-center w-full max-w-md mx-auto">
                {gameOver ? (
                    <div className="text-center py-12 bg-surface border border-zinc-800 rounded-2xl w-full">
                        <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500 mb-4">
                            <Bug size={40} />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2">{score} Bugs</h2>
                        <p className="text-zinc-400 mb-8">Squashed successfully!</p>
                        <button 
                            onClick={startGame}
                            className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                        >
                            <RotateCcw size={18} /> Play Again
                        </button>
                    </div>
                ) : (
                    <>
                       {!isPlaying && (
                           <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl" style={{top: '160px', bottom: 0}}>
                                <button 
                                    onClick={startGame}
                                    className="px-8 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                >
                                    START GAME
                                </button>
                           </div>
                       )}

                       <div className="grid grid-cols-3 gap-4 w-full p-4 bg-zinc-900 rounded-2xl border border-zinc-800 relative">
                            {/* Overlay wrapper to position the Start button nicely relative to grid if needed */}
                           
                            {grid.map((hasBug, index) => (
                                <button
                                    key={index}
                                    onMouseDown={() => handleWhack(index)} // MouseDown feels faster for games
                                    className={`
                                        aspect-square rounded-xl flex items-center justify-center transition-all duration-100
                                        ${hasBug 
                                            ? 'bg-rose-500/20 border-2 border-rose-500 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                                            : 'bg-zinc-800 border border-zinc-700'
                                        }
                                        active:scale-95
                                    `}
                                >
                                    {hasBug && <Bug size={32} className="text-rose-500 animate-bounce" />}
                                </button>
                            ))}
                       </div>
                       <p className="mt-6 text-zinc-500 text-sm">Click the bugs before they disappear!</p>
                    </>
                )}
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'memory' | 'reflex' | 'whack' | null>(null);

  if (activeGame === 'memory') return <MemoryMatch onBack={() => setActiveGame(null)} />;
  if (activeGame === 'reflex') return <ReflexTest onBack={() => setActiveGame(null)} />;
  if (activeGame === 'whack') return <WhackABug onBack={() => setActiveGame(null)} />;

  return (
    <div className="max-w-4xl mx-auto w-full pt-4 md:pt-8 px-0 mb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Chill Zone</h1>
        <p className="text-zinc-400">Take a break from the code. Frontend-friendly mini games.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Memory Game Card */}
        <div 
            onClick={() => setActiveGame('memory')}
            className="group relative h-64 bg-surface border border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
        >
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors"></div>
            
            <div className="relative z-10">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-indigo-400 mb-4 border border-zinc-800 group-hover:scale-110 transition-transform">
                    <Grid size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Memory Match</h3>
                <p className="text-sm text-zinc-400">Test your short-term memory with this classic icon matching game.</p>
            </div>
            
            <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-white transition-colors">
                <Play size={14} className="fill-current" /> Play Now
            </div>
        </div>

        {/* Reflex Game Card */}
        <div 
            onClick={() => setActiveGame('reflex')}
            className="group relative h-64 bg-surface border border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
        >
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors"></div>
            
            <div className="relative z-10">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-emerald-400 mb-4 border border-zinc-800 group-hover:scale-110 transition-transform">
                    <Timer size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Reflex Test</h3>
                <p className="text-sm text-zinc-400">How fast can you click? Measure your reaction time in milliseconds.</p>
            </div>
            
            <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-white transition-colors">
                <Play size={14} className="fill-current" /> Play Now
            </div>
        </div>

        {/* Whack-a-Bug Card */}
        <div 
            onClick={() => setActiveGame('whack')}
            className="group relative h-64 bg-surface border border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
        >
            <div className="absolute top-0 right-0 p-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose-500/20 transition-colors"></div>
            
            <div className="relative z-10">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-rose-400 mb-4 border border-zinc-800 group-hover:scale-110 transition-transform">
                    <Bug size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Whack-a-Bug</h3>
                <p className="text-sm text-zinc-400">Squash the bugs before they crash production! A stress reliever.</p>
            </div>
            
            <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-white transition-colors">
                <Play size={14} className="fill-current" /> Play Now
            </div>
        </div>

      </div>
    </div>
  );
};

export default Games;