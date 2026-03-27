import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  label: string;
  icon: LucideIcon;
  variant?: "cyan" | "gold" | "emerald";
}

export default function StatsCard({ title, value, label, icon: Icon, variant = "cyan" }: StatsCardProps) {
  const variants = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/10",
    gold: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10",
  };

  return (
    <div className="glass-card flex-1 p-6 rounded-[2rem] relative overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
      {/* Background Icon Glow */}
      <div className={`absolute -right-6 -bottom-6 opacity-[0.05] group-hover:opacity-10 transition-opacity duration-500`}>
        <Icon className="w-32 h-32" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {title}
        </span>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{value}</span>
              <span className={`text-sm font-bold uppercase ${variants[variant].split(' ')[0]}`}>
                {label}
              </span>
            </div>
          </div>
          
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ${variants[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
