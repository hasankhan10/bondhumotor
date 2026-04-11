import Link from "next/link";
import { ArrowLeft, Plug } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-24 min-h-[70vh]">
      <div className="text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-brand-blue/10 flex items-center justify-center mb-8 border border-brand-blue/30 relative">
          <Plug className="w-10 h-10 text-brand-blue animate-pulse" />
          <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full animate-pulse" />
        </div>
        <h1 className="font-heading font-black text-6xl md:text-8xl mb-4 tracking-tighter">404</h1>
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-text-primary">Looks like the battery died!</h2>
        <p className="text-text-muted max-w-md mx-auto mb-10">
          The page you are looking for has been moved or doesn't exist. Let's get you back on the road.
        </p>
        <Link 
          href="/"
          className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all border border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
