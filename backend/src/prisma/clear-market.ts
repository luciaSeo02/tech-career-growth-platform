import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Clearing Adzuna job market data...');

  const skillsDeleted = await prisma.jobMarketSkill.deleteMany({
    where: { jobMarket: { source: 'adzuna' } },
  });
  console.log(`Deleted ${skillsDeleted.count} job market skills`);

  const jobsDeleted = await prisma.jobMarket.deleteMany({
    where: { source: 'adzuna' },
  });
  console.log(`Deleted ${jobsDeleted.count} job market entries`);

  const demandDeleted = await prisma.skillDemand.deleteMany({});
  console.log(`Deleted ${demandDeleted.count} skill demand records`);

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
