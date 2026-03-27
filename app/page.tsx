import TopHeader from "@/components/TopHeader";
import DashboardContent from "@/components/DashboardContent";
import { prisma } from "@/lib/prisma";



export default async function Overview() {
  const cities = await prisma.city.findMany({
    orderBy: {
      lastUpdate: 'desc'
    }
  });

  return (
    <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <TopHeader />
      <DashboardContent initialCities={cities} />
    </div>
  );
}
