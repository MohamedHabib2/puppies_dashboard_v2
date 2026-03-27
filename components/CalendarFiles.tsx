"use client"
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarFilesProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function CalendarFiles({ selectedDate, onDateChange }: CalendarFilesProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calendar Logic
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const totalDays = daysInMonth(currentYear, currentMonth);
  const startOffset = firstDayOfMonth(currentYear, currentMonth);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleMonthChange = (offset: number) => {
    setViewDate(new Date(currentYear, currentMonth + offset, 1));
  };

  const handleDateSelect = (day: number) => {
    const yyyy = currentYear;
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);
    setShowCalendar(false);
  };

  // Update position when opening
  useEffect(() => {
    if (showCalendar && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [showCalendar]);

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        onClick={() => setShowCalendar(!showCalendar)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 transition-all duration-300 ${
          showCalendar || selectedDate 
            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
            : "text-slate-500 hover:text-white hover:bg-white/5"
        }`}
      >
        <MoreHorizontal className="w-5 h-5" />
        {selectedDate && (
          <span className="text-[10px] font-bold uppercase tracking-widest pl-2 border-l border-white/10">
            {new Date(selectedDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </span>
        )}
      </button>

      {/* Calendar Portal - Opens ABOVE and OVER everything */}
      {showCalendar && createPortal(
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setShowCalendar(false)} />
          <div 
            className="absolute z-[101] glass-card p-5 rounded-[2rem] border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300"
            style={{ 
              bottom: `calc(100vh - ${coords.top}px + 16px)`,
              right: `calc(100vw - ${coords.left + coords.width}px)`,
              width: '280px'
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <button onClick={() => handleMonthChange(-1)} className="p-1 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                  {months[currentMonth]} {currentYear}
                </h3>
                <button onClick={() => handleMonthChange(1)} className="p-1 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid Days */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-[9px] font-bold text-slate-600 mb-1">{day}</div>
                ))}
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`offset-${i}`} className="h-8" />
                ))}
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const y = currentYear;
                  const m = String(currentMonth + 1).padStart(2, '0');
                  const d = String(day).padStart(2, '0');
                  const dateStr = `${y}-${m}-${d}`;

                  const isSelected = selectedDate === dateStr;
                  
                  // Today check
                  const now = new Date();
                  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                  const isToday = todayStr === dateStr;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      className={`h-8 w-8 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center ${
                        isSelected 
                          ? "bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]" 
                          : isToday
                          ? "text-cyan-400 border border-cyan-500/30"
                          : "text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <button 
                  onClick={() => { onDateChange(""); setShowCalendar(false); }}
                  className="w-full py-2 border-t border-white/5 mt-1 text-[9px] font-bold text-slate-500 hover:text-white uppercase tracking-wider transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
