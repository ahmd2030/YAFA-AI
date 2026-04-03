"use client";

import { cn } from "@/lib/utils";
import { User, Users, Baby } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ModelOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
}

const models: ModelOption[] = [
  { id: "male", name: "Male", icon: <User className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&q=80&w=400" },
  { id: "female", name: "Female", icon: <User className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
  { id: "child", name: "Child", icon: <Baby className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=400" },
];

export function ModelSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const [selected, setSelected] = useState<string>("female");

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {models.map((model) => (
        <motion.div
          key={model.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(model.id)}
          className={cn(
            "relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all p-4 group",
            selected === model.id
              ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
              : "border-white/5 bg-surface hover:border-white/20"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "p-2 rounded-xl text-muted transition-colors",
              selected === model.id ? "bg-primary text-white" : "bg-white/5 group-hover:text-white"
            )}>
              {model.icon}
            </div>
            <span className="font-semibold text-white">{model.name}</span>
          </div>
          
          <div className="relative aspect-square w-full rounded-xl overflow-hidden">
            <img 
              src={model.image} 
              alt={model.name} 
              className={cn(
                "w-full h-full object-cover transition-transform duration-500",
                selected === model.id ? "scale-110" : "group-hover:scale-105"
              )}
            />
            {selected === model.id && (
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                <div className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                  Selected
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
