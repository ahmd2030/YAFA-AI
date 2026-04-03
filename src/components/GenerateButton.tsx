"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function GenerateButton({ onClick, disabled }: GenerateButtonProps) {
  return (
    <div className="relative group w-full max-w-md mx-auto">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-400 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
      
      <Button 
        onClick={onClick}
        disabled={disabled}
        size="lg"
        className="relative w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl flex items-center justify-center gap-3 overflow-hidden shadow-2xl disabled:opacity-50 disabled:grayscale transition-all"
      >
        <motion.div
           animate={{ 
             rotate: [0, 5, -5, 0],
             scale: [1, 1.1, 1.1, 1] 
           }}
           transition={{ 
             duration: 2, 
             repeat: Infinity,
             ease: "easeInOut" 
           }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        ✨ Generate Images
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
      </Button>
    </div>
  );
}
