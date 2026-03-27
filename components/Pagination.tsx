"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  label?: string;
}

export default function Pagination({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange,
  label = "Items"
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const goToNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

  return (
    <div className="flex h-16 items-center justify-between px-8 border-t border-white/5 bg-black/20">
      <div className="flex items-center gap-12 mx-auto">
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-500 transition-all group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">Next</span>
          <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xl font-light text-white tracking-tighter tabular-nums">
            {currentPage}
          </span>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            of
          </span>
          <span className="text-xl font-light text-white/40 tracking-tighter tabular-nums">
            {totalPages}
          </span>
        </div>

        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-500 transition-all group"
        >
          <ChevronLeft className="w-4 h-4 opacity-50 group-hover:opacity-100" />
          <span className="group-hover:translate-x-1 transition-transform">Prev</span>
        </button>
      </div>
    </div>
  );
}
