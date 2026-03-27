"use client"
import { useState } from "react";
import { Map, Terminal, CheckCircle2 } from "lucide-react";
import StatsCard from "./StatsCard";
import ProcessingTable from "./ProcessingTable";
import { City } from "@prisma/client";

interface DashboardContentProps {
  initialCities: City[];
}

export default function DashboardContent({ initialCities }: DashboardContentProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Filtering Logic (Matching ProcessingTable's logic)
  const filteredCities = selectedDate 
    ? initialCities.filter(city => {
        const utcDateStr = new Date(city.lastUpdate).toISOString().split('T')[0];
        return utcDateStr === selectedDate;
      })
    : initialCities;

  // Stats Calculations (Summing total and completed files)
  const totalFilesCount = filteredCities.reduce((acc, city) => acc + city.totalFiles, 0);
  const activeTasksCount = filteredCities.filter(c => c.status === "WORKING").length;
  const completedFilesCount = filteredCities.reduce((acc, city) => acc + city.completedFiles, 0);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
            Overview {selectedDate && <span className="text-cyan-400 font-bold ml-2">— {selectedDate}</span>}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard 
            title={selectedDate ? "Files in Selection" : "Total Files Processed"} 
            value={totalFilesCount.toLocaleString()} 
            label="Files" 
            icon={Map} 
            variant="cyan"
          />
          <StatsCard 
            title={selectedDate ? "Active in Selection" : "Active Script Tasks"} 
            value={activeTasksCount.toString()} 
            label="Working" 
            icon={Terminal} 
            variant="gold"
          />
          <StatsCard 
            title={selectedDate ? "Completed in Selection" : "Files Completed"} 
            value={completedFilesCount.toLocaleString()} 
            label="Done" 
            icon={CheckCircle2} 
            variant="emerald"
          />
        </div>
      </section>

      <section>
        <ProcessingTable 
          cities={initialCities} 
          externalSelectedDate={selectedDate}
          onExternalDateChange={setSelectedDate}
        />
      </section>
    </div>
  );
}
