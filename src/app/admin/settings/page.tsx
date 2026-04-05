"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Key, Database, RefreshCw, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, isDbReady } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [dbStatus, setDbStatus] = useState<"connecting" | "connected" | "error">("connecting");
  const [mounted, setMounted] = useState(false);

  // Load existing settings
  useEffect(() => {
    setMounted(true);
    async function fetchSettings() {
      if (!isDbReady() || !db) {
        console.warn("Firebase DB not initialized yet.");
        setDbStatus("error");
        return;
      }
      try {
        const docRef = doc(db, "configs", "replicate");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setApiKey(docSnap.data().apiKey || "");
        }
        setDbStatus("connected");
      } catch (err) {
        console.error("Firebase connection error:", err);
        setDbStatus("error");
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDbReady()) {
      alert("Firebase is not initialized. Please ensure NEXT_PUBLIC_FIREBASE environment variables are set in Vercel.");
      setSaveStatus("error");
      return;
    }

    if (!apiKey.trim()) {
      alert("Please enter a valid API key.");
      return;
    }

    setSaveStatus("saving");
    try {
      if (!db) throw new Error("Database not initialized");
      
      const savePromise = setDoc(doc(db, "configs", "replicate"), {
        apiKey: apiKey.trim(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout: لم تتم الاستجابة من السيرفر. قد يكون هناك حظر من إضافات المتصفح أو مشكلة في صلاحيات Firestore.")), 10000)
      );

      await Promise.race([savePromise, timeoutPromise]);
      
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Save error:", err);
      if (err.code === "permission-denied" || err.message?.includes("Missing or insufficient permissions")) {
        alert("الرجاء تحديث قواعد Firestore (Rules) للسماح بالكتابة: allow read, write: if true;");
      } else {
        alert(`Error: ${err.message}`);
      }
      setSaveStatus("error");
    }
  };
  if (!mounted) return null;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 underline decoration-primary decoration-2 underline-offset-8">Admin Settings</h1>
        <p className="text-muted">Manage your API keys and background services.</p>
      </header>

      {/* Connection Status Card */}
      <section className="bg-surface/50 border border-white/5 rounded-3xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-2xl">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Database Connection</h3>
            <p className="text-sm text-muted">Verification of Firebase Firestore linkage</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/5 mx-4">
          {dbStatus === "connecting" && (
            <>
              <RefreshCw className="w-3 h-3 text-yellow-500 animate-spin" />
              <span className="text-xs text-yellow-500 font-medium">Connecting...</span>
            </>
          )}
          {dbStatus === "connected" && (
            <>
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500 font-medium">Synced & Live</span>
            </>
          )}
          {dbStatus === "error" && (
            <>
              <XCircle className="w-3 h-3 text-red-500" />
              <span className="text-xs text-red-500 font-medium">Connect Failed</span>
            </>
          )}
        </div>

        <div className="text-[10px] text-muted flex flex-col items-start bg-black/20 p-2 rounded-lg border border-white/5">
          <span className="font-mono text-primary">Project ID:</span> 
          <span>{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "MISSING!"}</span>
          <span className="font-mono text-primary mt-1">API Key Ends With:</span>
          <span>{process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.slice(-4) || "MISSING!"}</span>
        </div>
      </section>

      {/* API Key Form */}
      <section className="bg-surface/50 border border-white/5 rounded-3xl p-8 space-y-8">
        <div className="flex items-center gap-3">
          <Key className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-white">AI API Configuration</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted uppercase tracking-wider pl-1">
              Replicate API Token
            </label>
            <div className="relative group">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all pr-12"
              />
              <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/30 group-focus-within:text-primary transition-colors" />
            </div>
            <p className="text-[11px] text-muted leading-relaxed pl-1">
              Your API key is used on the server side via Cloud Functions. It is stored securely in encrypted Firestore rules.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <Button 
              type="submit" 
              disabled={saveStatus === "saving"}
              className="gap-2 px-8 py-6 rounded-2xl text-base shadow-[0_4px_15px_rgba(124,58,237,0.2)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.3)] transition-all"
            >
              {saveStatus === "saving" ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : saveStatus === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saveStatus === "saving" ? "Saving..." : saveStatus === "success" ? "Saved!" : "Save Changes"}</span>
            </Button>

            {saveStatus === "error" && (
              <span className="text-red-500 text-sm font-medium">Failed to save settings. Check your console.</span>
            )}
          </div>
        </form>
      </section>

      {/* Helpful Info */}
      <section className="bg-primary/5 rounded-3xl p-8 border border-primary/20">
         <h3 className="text-primary font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Developer Tip
         </h3>
         <p className="text-sm text-muted leading-relaxed">
            Once you add your **Replicate API key**, the "Get Started" studio will automatically start using real AI models. 
            We recommend setting up a **Vercel Cron Job** for heavy generations to ensure zero-timeout experience.
         </p>
      </section>
    </div>
  );
}
