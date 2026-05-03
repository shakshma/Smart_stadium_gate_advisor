"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface FileUploadProps {
  onAnalysisComplete: (data: any[]) => void;
}

export default function FileUpload({ onAnalysisComplete }: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setStatus("Syncing with Gemini Cluster...");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/analyze", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percentCompleted);
          if (percentCompleted === 100) {
            setStatus("AI Processing in Progress...");
          }
        },
      });

      setStatus("Analysis Complete");
      onAnalysisComplete(response.data);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Neural processing failed. Please retry.");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, [onAnalysisComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
    },
    multiple: false,
    disabled: loading,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative group cursor-pointer overflow-hidden glass-card p-16 text-center transition-all duration-500 ${
          isDragActive ? "border-[var(--primary)] scale-[1.02] bg-white/[0.05]" : "border-white/5"
        } ${loading ? "cursor-wait" : ""}`}
      >
        <input {...getInputProps()} />
        
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
          <div className="w-64 h-64 border border-[var(--primary)]/20 rounded-full animate-ping [animation-duration:3s]" />
          <div className="absolute w-48 h-48 border border-[var(--secondary)]/20 rounded-full animate-ping [animation-duration:4s]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <motion.div 
            animate={loading ? { rotate: 360 } : {}}
            transition={loading ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
            className={`p-6 rounded-3xl transition-all duration-500 ${
              loading ? "bg-white/5" : "bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 text-[var(--primary)] group-hover:scale-110 shadow-[0_0_30px_rgba(0,255,136,0.1)]"
            }`}
          >
            {loading ? (
              <Loader2 className="w-10 h-10 text-[var(--primary)]" />
            ) : (
              <Upload className="w-10 h-10" />
            )}
          </motion.div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              {isDragActive ? "Release to Analyze" : loading ? "Uploading Stream" : "Initialize Analysis"}
            </h2>
            <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">
              {loading ? "Decrypting frames and mapping trajectories..." : "Drag match footage or click to select elite training sessions."}
            </p>
          </div>
          
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full mt-6 space-y-4"
              >
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] shadow-[0_0_10px_var(--primary-glow)]"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[var(--primary)] animate-pulse" />
                    {status}
                  </span>
                  <span>{progress}%</span>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mt-4"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            {!loading && status === "Analysis Complete" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-[var(--primary)] text-xs font-black uppercase tracking-widest mt-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                Data Synchronized
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="shimmer absolute inset-0 pointer-events-none opacity-30" />
      </div>
    </div>
  );
}
