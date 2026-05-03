"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight, 
  Activity, 
  Navigation,
  ArrowRightCircle,
  Zap,
  Info
} from "lucide-react";
import axios from "axios";

// Mock Data for Initial State
const GATES_DATA = [
  { id: "A", name: "North Gate (Main)", crowdLevel: "High", waitTime: "25 min", status: "Slow", occupancy: 85 },
  { id: "B", name: "East Gate", crowdLevel: "Medium", waitTime: "12 min", status: "Steady", occupancy: 60 },
  { id: "C", name: "West Gate", crowdLevel: "Low", waitTime: "4 min", status: "Fast", occupancy: 25 },
  { id: "D", name: "South Gate (VIP)", crowdLevel: "Medium", waitTime: "15 min", status: "Steady", occupancy: 55 },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [analysisActive, setAnalysisActive] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [gates, setGates] = useState(GATES_DATA);

  const getAIRecommendation = async () => {
    setLoading(true);
    try {
      // In a real app, we'd send current crowd data to Gemini
      const response = await axios.post("/api/analyze", { gates });
      setAiRecommendation(response.data.recommendation);
      setAnalysisActive(true);
    } catch (err) {
      console.error("AI Recommendation failed, using fallback.");
      // Fallback logic as requested by user
      setAiRecommendation("Based on current data, Gate C is least crowded and recommended for immediate entry.");
      setAnalysisActive(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 overflow-hidden relative font-outfit">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,150,255,0.2)]">
            <Navigation className="text-black w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
              Smart Stadium <span className="gradient-text">Gate Advisor</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" /> Live Crowd Monitoring
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500"
        >
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
            <Cpu className="w-4 h-4 group-hover:text-blue-400" /> Gemini AI Engine
          </span>
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
            <ShieldCheck className="w-4 h-4 group-hover:text-emerald-400" /> Authorized Access
          </span>
        </motion.nav>
      </header>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!analysisActive ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="mb-12 space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4"
                >
                  <Zap className="w-3 h-3 fill-blue-400" />
                  Real-Time Entry Optimization
                </motion.div>
                
                <h2 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter uppercase italic">
                  Navigate the <br />
                  <span className="gradient-text">Smart Way</span>
                </h2>
                
                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                  Smart Stadium Gate Advisor – Get real-time crowd insights and AI-powered entry suggestions to minimize your wait time.
                </p>
              </div>

              <button 
                onClick={getAIRecommendation}
                disabled={loading}
                className="group relative flex items-center gap-4 px-12 py-6 rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-500 font-black uppercase tracking-widest text-lg hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,150,255,0.3)] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Activity className="w-6 h-6 animate-spin" />
                    Analyzing Crowds...
                  </>
                ) : (
                  <>
                    <ArrowRightCircle className="w-6 h-6" />
                    Find Best Entry Gate
                  </>
                )}
              </button>

              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {[
                  { title: "Real-time Load", icon: Users, desc: "Instant occupancy monitoring across all 12 major stadium entrances.", color: "#3b82f6" },
                  { title: "Wait Predictor", icon: Clock, desc: "AI algorithms forecasting queue times based on live flow patterns.", color: "#10b981" },
                  { title: "Smart Routing", icon: MapPin, desc: "Personalized GPS-enabled directions to the fastest available entry point.", color: "#8b5cf6" }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="glass-card p-8 text-left group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h4 className="text-xl font-bold mb-3 uppercase italic tracking-tight">{feature.title}</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="animate-fade-in"
            >
              {/* AI Recommendation Banner */}
              <div className="glass-card p-1 mb-10 overflow-hidden relative">
                <div className="bg-gradient-to-r from-blue-600/20 via-emerald-500/20 to-blue-600/20 p-8 rounded-[inherit] flex flex-col md:flex-row items-center gap-8 border border-white/5">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Cpu className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-emerald-400 text-black text-[10px] font-black uppercase rounded">AI Recommended</span>
                      <h3 className="text-2xl font-black uppercase italic tracking-tight">Optimal Entrance Suggestion</h3>
                    </div>
                    <p className="text-xl text-emerald-100 font-medium italic">
                      "{aiRecommendation}"
                    </p>
                  </div>
                  <button 
                    onClick={() => setAnalysisActive(false)}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2"
                  >
                    Refresh Analysis
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Gate Status List */}
                <div className="lg:col-span-8 space-y-6">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-blue-400" />
                    Live Gate Status
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gates.map((gate) => (
                      <div key={gate.id} className="glass-card p-6 flex flex-col gap-4 group hover:border-white/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Gate {gate.id}</span>
                            <h4 className="text-xl font-black uppercase italic tracking-tight">{gate.name}</h4>
                          </div>
                          <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            gate.crowdLevel === 'High' ? 'bg-red-500/20 text-red-400' : 
                            gate.crowdLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {gate.crowdLevel} Load
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-8 mt-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-lg font-bold">{gate.waitTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-gray-500" />
                            <span className="text-lg font-bold">{gate.status}</span>
                          </div>
                        </div>

                        <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${gate.occupancy}%` }}
                            className={`h-full ${
                              gate.occupancy > 80 ? 'bg-red-500' : 
                              gate.occupancy > 50 ? 'bg-yellow-500' : 
                              'bg-emerald-500'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info Panel */}
                <div className="lg:col-span-4 space-y-6">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3 mb-6">
                    <Info className="w-6 h-6 text-emerald-400" />
                    Stadium Stats
                  </h3>
                  
                  <div className="glass-card p-8 flex flex-col gap-8">
                    <div className="space-y-2">
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Attendance</p>
                      <p className="text-4xl font-black italic tracking-tighter">42,501 / 55k</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Average Wait Time</p>
                      <p className="text-4xl font-black italic tracking-tighter text-blue-400">14 Min</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <p className="text-xs font-bold text-blue-300 leading-relaxed">
                        Tip: East Gate entry flow has improved significantly in the last 10 minutes.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Current Weather</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold italic">24°C Clear</span>
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="max-w-7xl mx-auto mt-32 pb-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-600 text-xs font-bold uppercase tracking-[0.2em]">
        <p>&copy; 2026 Smart Stadium Advisor • Hackathon Edition</p>
        <p>Powered by Gemini 2.0 AI & Real-time Sensors</p>
      </footer>
    </main>
  );
}
