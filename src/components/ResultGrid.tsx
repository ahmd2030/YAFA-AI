import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Sparkles, CheckCircle2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockResults = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1523381235312-da4bdf67ea4e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&q=80&w=600",
];

interface ResultGridProps {
  onRegenerate: () => void;
  prompt?: string;
  results?: string[];
  modelName?: string;
}

export function ResultGrid({ onRegenerate, prompt, results = [], modelName }: ResultGridProps) {
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayResults = results.length > 0 ? results : [];

  if (results.length === 0) {
    return (
      <div className="text-center py-20 px-8 rounded-3xl bg-surface border border-white/5">
        <h3 className="text-xl font-bold text-white mb-2">No results to display</h3>
        <p className="text-muted mb-6">Generated images will appear here.</p>
        <Button onClick={onRegenerate}>Start Generating</Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            Your results are ready <span className="animate-bounce">🔥</span>
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-muted">Generated with {modelName || "AI Studio Pro"}</p>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <p className="text-primary font-medium">{results.length} Variations</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onRegenerate} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Regenerate
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" /> Download All
          </Button>
        </div>
      </div>

      {/* Prompt Display */}
      {prompt && (
        <div className="mb-12 p-6 rounded-3xl bg-surface border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">AI Prompt Used</span>
            </div>
            <div className="flex items-center gap-2">
               <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPrompt(!showPrompt)}
                className="text-xs h-8"
               >
                {showPrompt ? "Hide Details" : "View Prompt"}
               </Button>
               <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="gap-2 text-xs h-8 border-white/10"
               >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy Prompt"}
              </Button>
            </div>
          </div>
          
          <AnimatePresence>
            {showPrompt && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-muted leading-relaxed italic bg-black/40 p-4 rounded-xl border border-white/5 select-all">
                  {prompt}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayResults.map((url, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-surface shadow-2xl"
          >
            <img 
              src={url} 
              alt={`Generated result ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay ... remains same ... */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
               <div className="p-3 rounded-full bg-primary/20 border border-primary/50 text-primary mb-4">
                  <CheckCircle2 className="w-10 h-10" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">High Definition Result</h3>
               <p className="text-muted text-sm mb-6 max-w-[200px]">Enhanced with AI lighting and studio background</p>
               
               <div className="flex items-center gap-2">
                  <Button size="sm" variant="primary" className="h-9 px-4">
                    Download
                  </Button>
                  <Button size="sm" variant="secondary" className="h-9 px-4">
                    View
                  </Button>
               </div>
            </div>

            {/* AI Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded-full flex items-center gap-2">
               <Sparkles className="w-3 h-3 text-primary animate-pulse" />
               <span className="text-[10px] font-bold text-white uppercase tracking-tighter">AI Enhanced</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/20 text-center">
         <h4 className="text-lg font-bold text-white mb-2">Not satisfied with the results?</h4>
         <p className="text-muted mb-6">Try changing the model or the style preset for a completely different look.</p>
         <Button variant="outline" onClick={onRegenerate}>Change Selection</Button>
      </div>
    </div>
  );
}
