import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

interface FloatingAITriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FloatingAITrigger: React.FC<FloatingAITriggerProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
      {/* Pulse Beacon Badge */}
      <button
        onClick={onClick}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-[#061e47] via-[#063A91] to-[#0757D9] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl hover:shadow-blue-500/30 border border-white/30 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Open BantayAI Assistant"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white" />
          </span>
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-tight">Ask BantayAI</span>
            <span className="bg-yellow-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full uppercase">
              Gemini
            </span>
          </div>
          <span className="text-[10px] text-blue-100/90 font-medium leading-none">
            Politician & Project Intel
          </span>
        </div>
      </button>
    </div>
  );
};
