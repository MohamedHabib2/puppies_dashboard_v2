import TopHeader from "@/components/TopHeader";
import AnalyticsContent from "@/components/AnalyticsContent";
import { prisma } from "@/lib/prisma";

export default async function AnalyticsPage() {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 2);
  threeMonthsAgo.setDate(1);
  threeMonthsAgo.setHours(0, 0, 0, 0);

  const cities = await prisma.city.findMany({
    where: {
      lastUpdate: {
        gte: threeMonthsAgo,
      },
    },
    orderBy: {
        lastUpdate: 'asc',
    }
  });

  // Group by month
  const monthlyData: Record<string, { name: string; value: number; completed: number; monthIndex: number; year: number }> = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Initialize last 3 months
  for (let i = 0; i < 3; i++) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const m = d.getMonth();
    const y = d.getFullYear();
    const key = `${y}-${m.toString().padStart(2, '0')}`;
    monthlyData[key] = {
      name: monthNames[m],
      value: 0,
      completed: 0,
      monthIndex: m,
      year: y
    };
  }

  cities.forEach((city:any) => {
    const date = new Date(city.lastUpdate);
    const monthKey = `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}`;

    if (monthlyData[monthKey]) {
      monthlyData[monthKey].value += city.totalFiles;
      monthlyData[monthKey].completed += city.completedFiles;
    }
  });

  const chartData = Object.keys(monthlyData)
    .sort()
    .map(key => ({
      name: monthlyData[key].name,
      value: monthlyData[key].value,
      completed: monthlyData[key].completed
    }));

  // Group by day for the last 7 days
  const dailyDataMap: Record<string, { name: string; completed: number; dateKey: string }> = {};
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const dayName = dayNames[d.getDay()];
    const dateKey = d.toISOString().split('T')[0];
    dailyDataMap[dateKey] = {
      name: dayName,
      completed: 0,
      dateKey: dateKey
    };
  }

  cities.forEach(city => {
    const date = new Date(city.lastUpdate);
    const dateKey = date.toISOString().split('T')[0];

    if (dailyDataMap[dateKey]) {
      dailyDataMap[dateKey].completed += city.completedFiles;
    }
  });

  const dailyData = Object.values(dailyDataMap).sort((a, b) => a.dateKey.localeCompare(b.dateKey));

  // Stats Calculations
  const totalProcessed = cities.reduce((acc, c) => acc + c.totalFiles, 0);
  const totalCompleted = cities.reduce((acc, c) => acc + c.completedFiles, 0);
  const successRate = totalProcessed > 0 ? (totalCompleted / totalProcessed) * 100 : 0;
  
  let totalTime = 0;
  let totalTimedCities = 0;
  cities.forEach(c => {
    if (c.startedAt && c.finishedAt) {
      totalTime += c.finishedAt.getTime() - c.startedAt.getTime();
      totalTimedCities += 1;
    }
  });

  const avgTimePerFile = totalProcessed > 0 ? (totalTime / totalProcessed) / 1000 : 0; // In seconds

  const stats = {
    avgTime: avgTimePerFile.toFixed(2) + "s",
    successRate: successRate.toFixed(1) + "%",
    throughput: (totalProcessed / 90).toFixed(1) + "K", // Daily average placeholder calculation
    totalProcessed: totalProcessed.toLocaleString()
  };

  return (
    <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <TopHeader />
      <AnalyticsContent 
        chartData={chartData} 
        dailyData={dailyData}
        stats={stats} 
      />
    </div>
  );
}
