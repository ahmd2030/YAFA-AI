"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Hero() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium border rounded-full border-primary/20 bg-primary/5 text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: Realistic Studio Lighting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Transform your clothing <br />
            into <span className="text-primary italic">professional ads</span> in seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-muted mb-10 leading-relaxed"
          >
            The world&apos;s first AI studio dedicated to fashion brands. Upload an image, choose a model, and get stunning results instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4 mb-20"
          >
            <Button size="lg" className="gap-2">
              Start Free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" className="gap-2">
              <Play className="h-4 w-4 fill-current" /> Watch Demo
            </Button>
          </motion.div>

          {/* Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-full max-w-4xl aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-ew-resize"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
          >
            {/* After (Full) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
            
            {/* Before (Clipped) */}
            <div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523381235312-da4bdf67ea4e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            />

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-0.5 h-3 bg-zinc-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-zinc-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur text-xs font-bold text-white uppercase tracking-widest z-10">
              Original Clothing
            </div>
            <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded-lg bg-primary/50 backdrop-blur text-xs font-bold text-white uppercase tracking-widest z-10">
              AI Professional Result
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
