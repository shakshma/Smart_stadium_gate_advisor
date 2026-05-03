"use client";

import React from "react";
import { Clock, Target, Zap, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface Event {
  timestamp: string;
  ballType: string;
  shotName: string;
  runs: number;
  trajectory: string;
  description: string;
}

interface MatchLogProps {
  events: Event[];
}

export default function MatchLog({ events }: MatchLogProps) {
  return (
    <div className="glass-card p-8 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--secondary)]/5 blur-3xl rounded-full group-hover:bg-[var(--secondary)]/10 transition-colors" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
          <Clock className="w-6 h-6 text-[var(--primary)]" />
          Match Timeline
        </h3>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          {events.length} Events Logged
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar relative z-10 max-h-[500px]">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-gray-700" />
            </div>
            <p className="text-gray-600 font-bold uppercase tracking-widest text-xs italic">
              Awaiting data stream...
            </p>
          </div>
        ) : (
          events.map((event, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-8 border-l border-white/5 pb-2 group/item"
            >
              <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-white/20 group-hover/item:border-[var(--primary)] group-hover/item:scale-125 transition-all" />
              
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group-hover/item:bg-white/[0.04] group-hover/item:border-white/10 transition-all shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--primary)] font-black text-xs tracking-widest">{event.timestamp}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{event.ballType}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg ${getRunBg(event.runs)}`}>
                    {event.runs} Runs
                  </div>
                </div>
                
                <h4 className="text-xl font-black text-white mb-2 uppercase italic tracking-tight group-hover/item:text-[var(--primary)] transition-colors">
                  {event.shotName}
                </h4>
                
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                  <span className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-gray-700" /> {event.trajectory} Trajectory
                  </span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all text-[var(--primary)]" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function getRunBg(runs: number) {
  if (runs >= 6) return "bg-gradient-to-br from-[var(--accent)] to-[#ff4d94] text-white shadow-[0_0_15px_rgba(255,0,119,0.3)]";
  if (runs >= 4) return "bg-gradient-to-br from-[var(--secondary)] to-[#00a3ff] text-black shadow-[0_0_15px_rgba(0,212,255,0.3)]";
  if (runs >= 1) return "bg-gradient-to-br from-[var(--primary)] to-[#00cc6a] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]";
  return "bg-white/5 text-gray-500 border border-white/5";
}
