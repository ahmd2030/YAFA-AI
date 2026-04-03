"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Mountain, ShoppingBag, Palette } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface StyleOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
}

const styles: StyleOption[] = [
  { id: "casual", name: "Casual", icon: <Mountain className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" },
  { id: "luxury", name: "Luxury", icon: <Sparkles className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400" },
  { id: "street", name: "Street", icon: <ShoppingBag className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1523381235312-da4bdf67ea4e?auto=format&fit=crop&q=80&w=400" },
  { id: "kids", name: "Kids Playful", icon: <Palette className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=400" },
];

export function StyleSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const [selected, setSelected] = useState<string>("luxury");

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {styles.map((style) => (
        <motion.div
          key={style.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect(style.id)}
          className={cn(
            "relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all p-3 group",
            selected === style.id
              ? "border-primary bg-primary/5"
              : "border-white/5 bg-surface hover:border-white/20"
          )}
        >
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-3">
             <img 
              src={style.image} 
              alt={style.name} 
              className={cn(
                "w-full h-full object-cover transition-transform duration-700",
                selected === style.id ? "scale-110" : "group-hover:scale-110"
              )}
             />
             <div className={cn(
               "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity",
               selected === style.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
             )}>
                <div className="flex items-center gap-2 text-white">
                  {style.icon}
                  <span className="font-bold text-sm">{style.name}</span>
                </div>
             </div>
          </div>
          
          <div className="flex items-center justify-between px-1">
             <span className="text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-white transition-colors">{style.name}</span>
             {selected === style.id && (
               <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(124,58,237,1)]" />
             )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
