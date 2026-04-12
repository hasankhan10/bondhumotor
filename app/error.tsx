"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center relative z-10"
      >
        <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black font-heading text-white mb-4 tracking-tight">
          Oops! Something <br />
          <span className="text-gradient">Went Wrong.</span>
        </h1>
        
        <p className="text-text-muted mb-12 text-lg leading-relaxed">
          Don&apos;t worry, we&apos;ve logged the issue. You can try refreshing the page or head back home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 px-8 py-4 bg-brand-blue text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-brand-blue/80 transition-all flex items-center justify-center gap-2 group shadow-glow-blue/20"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex-1 px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-12 text-[10px] font-mono text-gray-600 uppercase tracking-tighter">
            Error ID: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  );
}
