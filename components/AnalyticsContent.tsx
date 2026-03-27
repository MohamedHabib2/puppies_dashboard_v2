"use client"

import { useState, useEffect } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import StatsCard from "./StatsCard";

interface AnalyticsContentProps {
  chartData: {
    name: string;
    value: number;
    completed: number;
  }[];
  dailyData: {
    name: string;
    completed: number;
  }[];
  stats: {
    avgTime: string;
    successRate: string;
    throughput: string;
    totalProcessed: string;
  };
}

export default function AnalyticsContent({
  chartData,
  dailyData,
  stats,
}: AnalyticsContentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log("Analytics Stats:", stats);
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
            Key Performance Indicators
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Avg. Processing Time"
            value={stats.avgTime}
            label="Per File"
            icon={Clock}
            variant="cyan"
          />

          <StatsCard
            title="Success Rate"
            value={stats.successRate}
            label="Stable"
            icon={TrendingUp}
            variant="emerald"
          />
          {/* total files */}
          <StatsCard
            title="Total Processed"
            value={stats.totalProcessed}
            label="Total"
            icon={Users}
            variant="gold"
          />
          {/* avg daily load  */}
          <StatsCard
            title="Avg. Daily Load"
            value={stats.throughput}
            label="Files/Day"
            icon={BarChart3}
            variant="cyan"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="glass p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white">
              Monthly Processing Volume
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-xs text-slate-400">Total Files</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff10"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #ffffff10",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#22d3ee" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="glass p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white">
              Weekly Processing Volume
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400">Completed</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff10"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #ffffff10",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#10b981" }}
                />
                <Bar
                  dataKey="completed"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
