import React, { useState, useEffect } from 'react';

const GREETINGS = [
  "Hello",           // English
  "नमस्ते",          // Hindi
  "नमस्कार",         // Marathi
  "ನಮಸ್ಕಾರ",         // Kannada
  "నమస్కారం",        // Telugu
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",    // Punjabi
  "வணக்கம்",         // Tamil
  "നമസ്കാരം",        // Malayalam
  "Bonjour",         // French
  "Hallo",           // German
  "Hola",            // Spanish
  "Olá"              // Portuguese
];

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Cycle through greetings
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === GREETINGS.length - 1) {
          clearInterval(interval);
          // Wait a bit on the last word, then exit
          setTimeout(() => {
            setIsExiting(true);
            // Wait for slide-up animation to finish
            setTimeout(onComplete, 800);
          }, 1000);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 150); // Speed of switching (ms)

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#101012] cursor-default
        transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)]
        ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}
    >
        <div className="flex items-center gap-4 relative">
             <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]"></span>
             
             {/* Greeting Text */}
             <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight min-w-[200px] select-none">
                {GREETINGS[index]}
             </h1>
        </div>
    </div>
  );
};

export default IntroScreen;