"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Terminal, Settings, Database, Activity, Map, X, BarChart3 } from "lucide-react";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/" },
    { name: "Analytics", icon: BarChart3, href: "/analytics" },
    // { name: "Script Tasks", icon: Terminal, href: "/tasks" },
    // { name: "Processing Logs", icon: Activity, href: "/logs" },
    // { name: "Database", icon: Database, href: "/database" },
    // { name: "Cities Map", icon: Map, href: "/map" },
    // { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r flex flex-col h-screen transition-all duration-500 md:sticky md:top-0 ${
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    }`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Terminal className="text-cyan-400 w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-wider text-sm">PUPPIES</span>
            <span className="text-[10px] text-cyan-400 font-medium tracking-[0.2em]">DASHBOARD</span>
          </div>
        </div>
        <button onClick={onClose} className="md:hidden text-slate-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"}`} />
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 glow-cyan" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>System Health</span>
            <span className="text-emerald-400">98%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[98%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
