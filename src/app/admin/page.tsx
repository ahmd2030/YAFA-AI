"use client";

import { motion } from "framer-motion";
import { Sparkles, Image as ImageIcon, Zap, TrendingUp, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Generations", value: "1,280", icon: <ImageIcon className="w-5 h-5" />, color: "text-blue-500" },
    { name: "Total Credits Used", value: "4,500", icon: <Zap className="w-5 h-5" />, color: "text-yellow-500" },
    { name: "Active Users", value: "342", icon: <Users className="w-5 h-5" />, color: "text-green-500" },
    { name: "Average Queue Time", value: "12.4s", icon: <Clock className="w-5 h-5" />, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 underline decoration-primary decoration-2 underline-offset-8">Admin Dashboard</h1>
        <p className="text-muted">Welcome back. Everything is running smoothly.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-surface/50 border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className={`p-3 bg-white/5 rounded-2xl w-fit mb-4 ${stat.color} group-hover:bg-primary/20 transition-colors`}>
              {stat.icon}
            </div>
            <div className="text-sm font-medium text-muted uppercase tracking-wider">{stat.name}</div>
            <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Detailed View */}
      <section className="bg-surface/50 border border-white/5 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" /> Recent Generation Activity
        </h3>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center overflow-hidden">
                   <ImageIcon className="w-5 h-5 text-muted" />
                </div>
                <div>
                   <div className="text-sm font-bold text-white">Generation #ID_{8429 + i}</div>
                   <div className="text-xs text-muted italic">Luxury Fashion Campaign • {i * 2}m ago</div>
                </div>
              </div>
              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/10 text-green-500">Success</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Setup Alert */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl border border-primary/20">
         <div>
            <h3 className="text-lg font-bold text-white mb-1">Finish API Setup</h3>
            <p className="text-sm text-muted max-w-md">To enable real AI generation, you must provide your Replicate API key in the settings.</p>
         </div>
         <Button onClick={() => window.location.href = '/admin/settings'} className="px-8 h-12 rounded-2xl gap-2 font-bold whitespace-nowrap shadow-[0_4px_15px_rgba(124,58,237,0.2)]">
            <Sparkles className="w-4 h-4" /> Go to Settings
         </Button>
      </section>
    </div>
  );
}
