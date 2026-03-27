"use client"
import { useState } from "react";
import { MoreHorizontal, CheckCircle2, Clock, Database } from "lucide-react";
import { City } from "@prisma/client";
import Pagination from "./Pagination";
import CalendarFiles from "./CalendarFiles";

interface ProcessingTableProps {
  cities: City[];
  externalSelectedDate?: string;
  onExternalDateChange?: (date: string) => void;
}

export default function ProcessingTable({ 
  cities, 
  externalSelectedDate, 
  onExternalDateChange 
}: ProcessingTableProps) {
  const [internalPage, setInternalPage] = useState(1);
  const [internalDate, setInternalDate] = useState<string>("");

  // Select between internal and external state
  const selectedDate = externalSelectedDate !== undefined ? externalSelectedDate : internalDate;
  const setSelectedDate = onExternalDateChange || setInternalDate;
  
  const [currentPage, setCurrentPage] = [internalPage, (p: number) => setInternalPage(p)];
  const itemsPerPage = 9;
  
  // Filter logic: Uses UTC date comparison to match server-side storage
  const filteredCities = selectedDate 
    ? cities.filter(city => {
        const utcDateStr = new Date(city.lastUpdate).toISOString().split('T')[0];
        return utcDateStr === selectedDate;
      })
    : cities;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCities = filteredCities.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 border-t-white/10 mt-10">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="text-cyan-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-3">
            City Processing Log
            <span className="text-[10px] text-slate-500 font-normal normal-case tracking-normal pl-4 border-l border-white/10">
              Real-time Update
            </span>
          </h2>
        </div>
        <CalendarFiles 
          selectedDate={selectedDate} 
          onDateChange={(date) => {
            setSelectedDate(date);
            setCurrentPage(1);
          }} 
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">
              <th className="px-8 py-6">City Name</th>
              <th className="px-8 py-6 text-center">Status</th>
              <th className="px-8 py-6">Progress</th>
              <th className="px-8 py-6 text-right">Total Files</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {currentCities.length === 0 && selectedDate ? (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-2 ${
                      selectedDate > new Date().toISOString().split('T')[0] 
                        ? "bg-cyan-500/10 border-cyan-500/20" 
                        : "bg-amber-500/10 border-amber-500/20"
                    }`}>
                      <Database className={`w-6 h-6 ${
                        selectedDate > new Date().toISOString().split('T')[0] 
                          ? "text-cyan-500/50" 
                          : "text-amber-500/50"
                      }`} />
                    </div>
                    <p className="text-sm font-semibold text-slate-300 uppercase tracking-[0.2em]">
                      {selectedDate > new Date().toISOString().split('T')[0] ? "Coming Soon" : "Notice"}
                    </p>
                    <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed italic">
                      {selectedDate > new Date().toISOString().split('T')[0] 
                        ? "\"We haven't worked on this yet.\"" 
                        : "\"There was a technical malfunction on this day.\""}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentCities.map((city, i) => (
                <tr key={city.id} className="group hover:bg-white/5 transition-colors duration-200">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400/20 border border-cyan-400/30 group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-white uppercase tracking-wider">
                        {city.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {city.status === "WORKING" ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 animate-pulse">
                        <Clock className="w-3 h-3" />
                        WORKING...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        COMPLETED
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 min-w-[300px]">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>{city.completedFiles} / {city.totalFiles} Files</span>
                        <span>{city.totalFiles > 0 ? Math.round((city.completedFiles / city.totalFiles) * 100) : 0}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            city.status === "COMPLETED" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-cyan-500 shadow-[0_0_8px_rgba(14,165,233,0.4)]"
                          }`}
                          style={{ width: `${city.totalFiles > 0 ? (city.completedFiles / city.totalFiles) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      {city.totalFiles} {/* {new Date(city.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        totalItems={filteredCities.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        label="Cities"
      />
    </div>
  );
}
