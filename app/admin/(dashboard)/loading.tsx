import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-blue/20 blur-[30px] rounded-full animate-pulse" />
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin relative z-10" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-white font-bold tracking-widest uppercase text-[10px] animate-pulse">
          Fetching Data
        </p>
        <div className="w-20 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-brand-blue animate-[loading_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
}
