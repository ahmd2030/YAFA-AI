"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Option {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ParameterSelectorProps {
  label: string;
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  columns?: number;
}

export function ParameterSelector({
  label,
  options,
  selectedId,
  onSelect,
  columns = 2,
}: ParameterSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted px-1">
        {label}
      </h3>
      <div 
        className={cn(
          "grid gap-3",
          columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left group",
              selectedId === option.id
                ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                : "border-white/5 bg-surface hover:border-white/20"
            )}
          >
            <div className="flex items-center gap-3">
              {option.icon && (
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  selectedId === option.id ? "bg-primary text-white" : "bg-white/5 text-muted group-hover:text-white"
                )}>
                  {option.icon}
                </div>
              )}
              <div>
                <div className="font-bold text-white text-sm">{option.name}</div>
                {option.description && (
                  <div className="text-[10px] text-muted line-clamp-1">{option.description}</div>
                )}
              </div>
            </div>
            
            {selectedId === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-5 w-5 rounded-full bg-primary flex items-center justify-center"
              >
                <Check className="h-3 w-3 text-white" strokeWidth={4} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
