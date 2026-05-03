"use client";

import React from "react";
import { TrendingUp, Target, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface SummaryData {
  totalRuns: number;
  strikeRate: number;
  shotEfficiency: number;
  totalBalls: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Runs",
      value: data.totalRuns,
      icon: TrendingUp,
      color: "var(--primary)",
      bg: "rgba(0, 255, 136, 0.1)",
    },
    {
      label: "Strike Rate",
      value: data.strikeRate.toFixed(1),
      icon: Zap,
      color: "var(--secondary)",
      bg: "rgba(0, 212, 255, 0.1)",
    },
    {
      label: "Shot Efficiency",
      value: `${data.shotEfficiency}%`,
      icon: Target,
      color: "var(--accent)",
      bg: "rgba(255, 0, 119, 0.1)",
    },
    {
      label: "Balls Analyzed",
      value: data.totalBalls,
      icon: Activity,
      color: "#888",
      bg: "rgba(255, 255, 255, 0.05)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {cards.map((card, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6 flex items-center gap-5 group"
        >
          <div className="relative">
            <div 
              className="absolute inset-0 blur-lg opacity-40 group-hover:opacity-100 transition-opacity rounded-full" 
              style={{ backgroundColor: card.color }}
            />
            <div 
              className="relative p-4 rounded-2xl border border-white/5 z-10" 
              style={{ backgroundColor: card.bg, color: card.color }}
            >
              <card.icon className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{card.label}</p>
            <p className="text-3xl font-black text-white tracking-tighter italic">{card.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
