"use client";

import React from "react";
import { motion } from "framer-motion";

interface Shot {
  timestamp: string;
  runs: number;
  coordinates: { x: number; y: number };
}

interface WagonWheelProps {
  shots: Shot[];
}

export default function WagonWheel({ shots }: WagonWheelProps) {
  return (
    <div className="glass-card p-8 flex flex-col items-center h-full relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)]/5 blur-3xl rounded-full group-hover:bg-[var(--primary)]/10 transition-colors" />
      
      <div className="w-full flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-xl font-black uppercase italic tracking-tighter">Wagon Wheel</h3>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] animate-pulse [animation-delay:200ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse [animation-delay:400ms]" />
        </div>
      </div>
      
      <div className="relative w-72 h-72 md:w-80 md:h-80 bg-[#0a0a0a] rounded-full border-2 border-white/5 overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-28 bg-[#151515] border border-white/10 rounded-sm shadow-2xl relative z-20">
            <div className="absolute top-2 left-0 right-0 h-[1px] bg-white/10" />
            <div className="absolute bottom-2 left-0 right-0 h-[1px] bg-white/10" />
          </div>
          
          <div className="absolute w-[98%] h-[98%] border border-white/10 rounded-full" />
          <div className="absolute w-[65%] h-[65%] border border-white/5 border-dashed rounded-full" />
          <div className="absolute w-[35%] h-[35%] border border-white/5 rounded-full" />
          
          <div className="absolute w-full h-[1px] bg-white/5 rotate-45" />
          <div className="absolute w-full h-[1px] bg-white/5 rotate-90" />
          <div className="absolute w-full h-[1px] bg-white/5 rotate-135" />
          <div className="absolute w-full h-[1px] bg-white/5 rotate-0" />
        </div>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] z-10">Straight</div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] z-10">Behind</div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] -rotate-90 z-10">Leg Side</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] rotate-90 z-10">Off Side</div>

        {shots.map((shot, i) => {
          const x = typeof shot.coordinates?.x === 'number' ? shot.coordinates.x : 0;
          const y = typeof shot.coordinates?.y === 'number' ? shot.coordinates.y : 0;
          
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              className="absolute w-3.5 h-3.5 rounded-full border border-white/50 shadow-2xl cursor-pointer hover:scale-150 hover:z-50 transition-all group/shot"
              style={{
                left: `calc(50% + ${x}%)`,
                top: `calc(50% - ${y}%)`,
                backgroundColor: getRunColor(shot.runs),
                boxShadow: `0 0 15px ${getRunColor(shot.runs)}44`,
              }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover/shot:opacity-100 transition-opacity pointer-events-none z-[100]">
                {shot.runs} Runs • {shot.timestamp}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 w-full relative z-10">
        {[
          { label: "1 Run", color: "var(--primary)" },
          { label: "2 Runs", color: "#88ffcc" },
          { label: "4 Runs", color: "var(--secondary)" },
          { label: "6 Runs", color: "var(--accent)" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}66` }} />
            <span className="text-[8px] text-gray-500 font-black uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRunColor(runs: number) {
  if (runs >= 6) return "#ff0077"; // Accent
  if (runs >= 4) return "#00d4ff"; // Secondary
  if (runs >= 2) return "#88ffcc"; // Mint
  if (runs >= 1) return "#00ff88"; // Primary
  return "#333333";
}
