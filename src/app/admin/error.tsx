"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Admin Boundary Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-6 bg-red-500/10 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-4">حدث خطأ غير متوقع</h1>
      <p className="text-muted max-w-md mb-2 leading-relaxed">
        تعذر تحميل هذه الصفحة حالياً. قد يكون هناك مشكلة في الاتصال أو في الإعدادات الخاصة بـ Firebase.
      </p>
      <div className="bg-black/40 text-red-400 p-4 rounded-xl font-mono text-sm mb-10 max-w-lg overflow-auto border border-red-500/20 text-left" dir="ltr">
        {error?.message || "Unknown error occurred"}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => reset()}
          className="gap-2 px-8 py-6 rounded-2xl text-base shadow-[0_4px_15px_rgba(124,58,237,0.2)]"
        >
          <RefreshCw className="w-4 h-4" />
          إعادة المحاولة
        </Button>
        <Link 
          href="/admin"
          className="flex items-center justify-center gap-2 px-8 py-6 rounded-2xl text-base font-medium border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          العودة للرئيسية
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 text-xs text-muted/40 font-mono">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
