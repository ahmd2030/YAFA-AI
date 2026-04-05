"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Loader2, Wand2, Lightbulb, Image } from "lucide-react";

const messages = [
  { text: "جاري تحليل المنتج الخاص بك...", icon: <Sparkles className="w-5 h-5 text-primary" /> },
  { text: "جاري إنشاء العارض (Model)...", icon: <Wand2 className="w-5 h-5 text-purple-400" /> },
  { text: "تحسين الإضاءة والتفاصيل...", icon: <Lightbulb className="w-5 h-5 text-yellow-300" /> },
  { text: "إتمام الصورة النهائية...", icon: <Image className="w-5 h-5 text-blue-400" /> },
];

export function LoadingScreen() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial progress to show life
    const timer = setInterval(() => {
      setProgress((v) => (v < 98 ? v + 1 : 98));
    }, 150);
    
    const msgTimer = setInterval(() => {
      setCurrentIdx((idx) => (idx + 1) % messages.length);
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
      <div className="relative mb-12">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 bg-purple-500/20 blur-3xl rounded-full"
        />
        
        <div className="relative">
          <Loader2 className="w-20 h-20 text-white animate-spin-slow stroke-[1px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentIdx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex items-center gap-3"
             >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {messages[currentIdx].icon}
                </div>
                <span className="text-lg font-medium text-white">
                  {messages[currentIdx].text}
                </span>
             </motion.div>
           </AnimatePresence>
           <span className="text-lg font-bold text-primary">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-surface border border-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-purple-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
        
        <p className="mt-8 text-sm text-muted animate-pulse">
            يقوم الذكاء الاصطناعي بإنشاء تحفتك الفنية الآن. يستغرق هذا عادة من 5 إلى 15 ثانية.
        </p>
      </div>
    </div>
  );
}
