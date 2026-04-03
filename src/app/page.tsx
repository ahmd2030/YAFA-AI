"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { UploadBox } from "@/components/UploadBox";
import { ModelSelector } from "@/components/ModelSelector";
import { StyleSelector } from "@/components/StyleSelector";
import { ParameterSelector } from "@/components/ParameterSelector";
import { GenerateButton } from "@/components/GenerateButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ResultGrid } from "@/components/ResultGrid";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowLeft, 
  Wand2, 
  Shirt, 
  Sun, 
  Image as ImageIcon, 
  UserCircle, 
  Watch 
} from "lucide-react";
import { 
  generatePrompt, 
  DEFAULT_PROMPT_PARAMS, 
  PromptParams,
  Style,
  Model,
  Clothing,
  Lighting,
  Background,
  Pose,
  Accessory
} from "@/lib/prompt-engine";

type Step = "hero" | "upload" | "generating" | "results";

export default function Home() {
  const [step, setStep] = useState<Step>("hero");
  const [file, setFile] = useState<File | null>(null);
  
  // Prompt States
  const [params, setParams] = useState<PromptParams>(DEFAULT_PROMPT_PARAMS);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const handleStart = () => {
    setStep("upload");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateParam = <K extends keyof PromptParams>(key: K, value: PromptParams[K]) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    const prompt = generatePrompt(params);
    setGeneratedPrompt(prompt);
    setStep("generating");
    
    // Simulate generation time
    setTimeout(() => {
      setStep("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 6000);
  };

  const handleSmartAuto = () => {
    setParams(DEFAULT_PROMPT_PARAMS);
    handleGenerate();
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {step === "hero" ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <div className="flex justify-center pb-32">
                <Button size="lg" className="h-16 px-12 text-xl rounded-2xl" onClick={handleStart}>
                  Get Started Now
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pt-24 pb-32 px-6"
            >
              <div className="max-w-5xl mx-auto">
                {/* Studio Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                  <div>
                    <button 
                      onClick={() => setStep("hero")}
                      className="flex items-center gap-2 text-muted hover:text-white transition-colors mb-4 group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold text-white mb-2 underline decoration-primary decoration-4 underline-offset-8">AI Fashion Studio</h1>
                    <p className="text-muted mt-4">Fine-tune your requirements or let our Prompt Engine handle it.</p>
                  </div>
                  
                  {step === "upload" && file && (
                    <Button 
                      variant="outline" 
                      onClick={handleSmartAuto}
                      className="gap-2 border-primary/30 text-primary hover:bg-primary/5 rounded-full px-6"
                    >
                      <Wand2 className="w-4 h-4" /> Smart Auto Fix
                    </Button>
                  )}
                </div>

                <div className="space-y-12">
                  <AnimatePresence mode="wait">
                    {step === "upload" && (
                      <motion.div
                        key="upload-step"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-12"
                      >
                        {/* Step 1: Upload */}
                        <section className="p-8 rounded-3xl bg-surface/50 border border-white/5">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)]">1</div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Upload Product</h2>
                                <p className="text-sm text-muted">Upload a clear photo of your clothing item.</p>
                            </div>
                          </div>
                          <UploadBox onUpload={setFile} />
                        </section>

                        {/* Step 2: Customization */}
                        {file && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                          >
                            <section className="p-8 rounded-3xl bg-surface/50 border border-white/5 space-y-12">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)]">2</div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Target Model</h2>
                                    <p className="text-sm text-muted">Choose who will wear your clothing.</p>
                                </div>
                              </div>
                              <ModelSelector onSelect={(id) => updateParam("model", id as Model)} />
                            </section>

                            <section className="p-8 rounded-3xl bg-surface/50 border border-white/5 space-y-12">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)]">3</div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Creative Direction</h2>
                                    <p className="text-sm text-muted">Define the aesthetic and environment.</p>
                                </div>
                              </div>
                              
                              <StyleSelector onSelect={(id) => updateParam("style", id as Style)} />
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 bg-black/20 p-8 rounded-3xl border border-white/5">
                                <ParameterSelector 
                                  label="Clothing Type"
                                  selectedId={params.clothing}
                                  onSelect={(id) => updateParam("clothing", id as Clothing)}
                                  options={[
                                    { id: "tshirt", name: "T-Shirt", icon: <Shirt className="w-4 h-4" /> },
                                    { id: "hoodie", name: "Hoodie", icon: <Shirt className="w-4 h-4" /> },
                                    { id: "dress", name: "Dress", icon: <Shirt className="w-4 h-4" /> },
                                    { id: "abaya", name: "Abaya", icon: <Shirt className="w-4 h-4" /> },
                                    { id: "sportswear", name: "Sportswear", icon: <Shirt className="w-4 h-4" /> },
                                  ]}
                                />
                                <ParameterSelector 
                                  label="Studio Lighting"
                                  selectedId={params.lighting}
                                  onSelect={(id) => updateParam("lighting", id as Lighting)}
                                  options={[
                                    { id: "studio", name: "Studio", icon: <Sun className="w-4 h-4" /> },
                                    { id: "natural", name: "Natural", icon: <Sun className="w-4 h-4" /> },
                                    { id: "cinematic", name: "Cinematic", icon: <Sun className="w-4 h-4" /> },
                                  ]}
                                />
                                <ParameterSelector 
                                  label="Background"
                                  selectedId={params.background}
                                  onSelect={(id) => updateParam("background", id as Background)}
                                  options={[
                                    { id: "white", name: "Pure White", icon: <ImageIcon className="w-4 h-4" /> },
                                    { id: "minimal", name: "Minimalist", icon: <ImageIcon className="w-4 h-4" /> },
                                    { id: "city", name: "Urban City", icon: <ImageIcon className="w-4 h-4" /> },
                                    { id: "luxury", name: "Luxury Interior", icon: <ImageIcon className="w-4 h-4" /> },
                                  ]}
                                />
                                <ParameterSelector 
                                  label="Model Pose"
                                  selectedId={params.pose}
                                  onSelect={(id) => updateParam("pose", id as Pose)}
                                  options={[
                                    { id: "front", name: "Frontal", icon: <UserCircle className="w-4 h-4" /> },
                                    { id: "side", name: "Side View", icon: <UserCircle className="w-4 h-4" /> },
                                    { id: "walking", name: "Walking", icon: <UserCircle className="w-4 h-4" /> },
                                    { id: "relaxed", name: "Relaxed", icon: <UserCircle className="w-4 h-4" /> },
                                  ]}
                                />
                                <div className="md:col-span-2">
                                  <ParameterSelector 
                                    label="Accessories"
                                    selectedId={params.accessory}
                                    onSelect={(id) => updateParam("accessory", id as Accessory)}
                                    columns={4}
                                    options={[
                                      { id: "none", name: "None", description: "Minimal look" },
                                      { id: "glasses", name: "Sunglasses", icon: <Watch className="w-4 h-4" /> },
                                      { id: "watch", name: "Luxury Watch", icon: <Watch className="w-4 h-4" /> },
                                      { id: "bag", name: "Handbag", icon: <Watch className="w-4 h-4" /> },
                                    ]}
                                  />
                                </div>
                              </div>
                            </section>

                            <div className="pt-8 flex flex-col items-center">
                              <GenerateButton onClick={handleGenerate} />
                              <div className="mt-6 flex items-center gap-2 text-muted text-sm">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span>Engineered prompt will be optimized for 8K Photorealistic output</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {step === "generating" && (
                      <motion.div
                        key="generating-step"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <LoadingScreen />
                      </motion.div>
                    )}

                    {step === "results" && (
                      <motion.div
                        key="results-step"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ResultGrid onRegenerate={handleReset} prompt={generatedPrompt} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-surface/50 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary" />
            <span className="text-lg font-bold text-white">Yafa<span className="text-primary">AI</span></span>
           </div>
           <p className="text-muted text-sm tracking-wide">© 2026 Yafa AI Engineering. All rights reserved.</p>
           <div className="flex items-center gap-6">
              <a href="#" className="text-muted hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-muted hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-muted hover:text-white transition-colors text-sm">Contact Us</a>
           </div>
        </div>
      </footer>
    </main>
  );
}
