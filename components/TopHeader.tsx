import { Monitor, RefreshCcw, Users } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div className="flex items-center gap-4">
        <div className="bg-white/5 p-2 rounded-lg border border-white/10">
          <Monitor className="text-cyan-400 w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
          Script Progress Dashboard
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-400">Developers:</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            4 Active
          </span>
        </div>
        
        <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-slate-400">Sync Status:</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            Real-time
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </span>
        </div>
      </div>
    </div>
  );
}
