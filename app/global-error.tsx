"use client";

import { AlertTriangle, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0D14] min-h-screen flex items-center justify-center font-sans">
        <div className="max-w-md w-full text-center p-8">
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Critical System Error</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            A critical error occurred in the application core. Please try again or contact support if the issue persists.
          </p>

          <button
            onClick={() => reset()}
            className="w-full px-8 py-4 bg-[#00B4FF] text-white font-bold uppercase tracking-widest text-xs rounded-full hover:opacity-90 transition-opacity"
          >
            Attempt Recovery
          </button>
        </div>
      </body>
    </html>
  );
}
