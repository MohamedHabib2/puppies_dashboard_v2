import { prisma } from "./lib/prisma.js";

async function main() {
  const stats = await prisma.city.aggregate({
    _sum: {
      totalFiles: true,
      completedFiles: true
    },
    _count: {
      id: true
    }
  });
  
  const cities = await prisma.city.findMany({
    select: {
      lastUpdate: true
    }
  });
  
  console.log("Stats:", stats);
  console.log("Last Updates:", cities.map(c => c.lastUpdate));
}

main();
