"use client";

import { cn } from "@/lib/utils";
import { Upload, X, CheckCircle2 } from "lucide-react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadBoxProps {
  onUpload: (file: File) => void;
}

export function UploadBox({ onUpload }: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onUpload(droppedFile);
    }
  }, [onUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.label
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300",
              isDragging 
                ? "border-primary bg-primary/10 scale-[1.02]" 
                : "border-white/10 bg-surface hover:border-primary/50 hover:bg-white/5"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className={cn(
                "p-4 rounded-2xl mb-4 transition-colors",
                isDragging ? "bg-primary text-white" : "bg-white/5 text-muted"
              )}>
                <Upload className="w-8 h-8" />
              </div>
              <p className="mb-2 text-lg font-medium text-white">
                Drag & drop your clothing image
              </p>
              <p className="text-sm text-muted">
                or click to browse from files
              </p>
              <div className="mt-4 px-4 py-2 rounded-lg bg-white/5 text-xs text-muted border border-white/5">
                PNG, JPG or WEBP (Max 10MB)
              </div>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
          </motion.label>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex flex-col items-center justify-center w-full p-8 border border-white/10 rounded-3xl bg-surface group"
          >
            <button 
              onClick={removeFile}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative w-full aspect-square max-w-[200px] rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
               <img 
                src={URL.createObjectURL(file)} 
                alt="Upload preview" 
                className="w-full h-full object-contain"
               />
               <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <CheckCircle2 className="text-white w-10 h-10" />
               </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">{file.name}</h3>
            <p className="text-sm text-primary font-medium">Ready for generation</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
