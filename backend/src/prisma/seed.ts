import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seed running...');

  const categoryNames = [
    'Frontend',
    'Backend',
    'Mobile',
    'DevOps',
    'Cloud',
    'Database',
    'Data & AI',
    'Testing',
    'Security',
    'Programming Language',
  ];

  for (const name of categoryNames) {
    await prisma.skillCategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Load all categories into a map for easy lookup
  const categories = await prisma.skillCategory.findMany();
  const cat = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  const skills: { name: string; categoryId: string }[] = [
    // Frontend
    { name: 'React', categoryId: cat['Frontend'] },
    { name: 'Next.js', categoryId: cat['Frontend'] },
    { name: 'Vue.js', categoryId: cat['Frontend'] },
    { name: 'Nuxt.js', categoryId: cat['Frontend'] },
    { name: 'Angular', categoryId: cat['Frontend'] },
    { name: 'Svelte', categoryId: cat['Frontend'] },
    { name: 'Tailwind CSS', categoryId: cat['Frontend'] },
    { name: 'TypeScript', categoryId: cat['Frontend'] },
    { name: 'JavaScript', categoryId: cat['Frontend'] },
    { name: 'HTML', categoryId: cat['Frontend'] },
    { name: 'CSS', categoryId: cat['Frontend'] },
    { name: 'Redux', categoryId: cat['Frontend'] },
    { name: 'Zustand', categoryId: cat['Frontend'] },
    { name: 'GraphQL Client', categoryId: cat['Frontend'] },
    { name: 'Vite', categoryId: cat['Frontend'] },
    { name: 'Webpack', categoryId: cat['Frontend'] },

    // Backend
    { name: 'Node.js', categoryId: cat['Backend'] },
    { name: 'NestJS', categoryId: cat['Backend'] },
    { name: 'Express', categoryId: cat['Backend'] },
    { name: 'Fastify', categoryId: cat['Backend'] },
    { name: 'Django', categoryId: cat['Backend'] },
    { name: 'FastAPI', categoryId: cat['Backend'] },
    { name: 'Spring Boot', categoryId: cat['Backend'] },
    { name: 'Laravel', categoryId: cat['Backend'] },
    { name: 'Ruby on Rails', categoryId: cat['Backend'] },
    { name: 'GraphQL Server', categoryId: cat['Backend'] },
    { name: 'REST API', categoryId: cat['Backend'] },
    { name: 'gRPC', categoryId: cat['Backend'] },
    { name: 'WebSockets', categoryId: cat['Backend'] },
    { name: 'Prisma ORM', categoryId: cat['Backend'] },
    { name: 'TypeORM', categoryId: cat['Backend'] },

    // Mobile
    { name: 'React Native', categoryId: cat['Mobile'] },
    { name: 'Flutter', categoryId: cat['Mobile'] },
    { name: 'Swift', categoryId: cat['Mobile'] },
    { name: 'Kotlin', categoryId: cat['Mobile'] },
    { name: 'Expo', categoryId: cat['Mobile'] },

    // DevOps
    { name: 'Docker', categoryId: cat['DevOps'] },
    { name: 'Kubernetes', categoryId: cat['DevOps'] },
    { name: 'GitHub Actions', categoryId: cat['DevOps'] },
    { name: 'GitLab CI/CD', categoryId: cat['DevOps'] },
    { name: 'Jenkins', categoryId: cat['DevOps'] },
    { name: 'Terraform', categoryId: cat['DevOps'] },
    { name: 'Ansible', categoryId: cat['DevOps'] },
    { name: 'Linux', categoryId: cat['DevOps'] },
    { name: 'Nginx', categoryId: cat['DevOps'] },

    // Cloud
    { name: 'AWS', categoryId: cat['Cloud'] },
    { name: 'Google Cloud', categoryId: cat['Cloud'] },
    { name: 'Azure', categoryId: cat['Cloud'] },
    { name: 'Vercel', categoryId: cat['Cloud'] },
    { name: 'Railway', categoryId: cat['Cloud'] },
    { name: 'Supabase', categoryId: cat['Cloud'] },
    { name: 'Firebase', categoryId: cat['Cloud'] },

    // Database
    { name: 'PostgreSQL', categoryId: cat['Database'] },
    { name: 'MySQL', categoryId: cat['Database'] },
    { name: 'MongoDB', categoryId: cat['Database'] },
    { name: 'Redis', categoryId: cat['Database'] },
    { name: 'SQLite', categoryId: cat['Database'] },
    { name: 'Elasticsearch', categoryId: cat['Database'] },
    { name: 'Cassandra', categoryId: cat['Database'] },

    // Data & AI
    { name: 'Python', categoryId: cat['Data & AI'] },
    { name: 'TensorFlow', categoryId: cat['Data & AI'] },
    { name: 'PyTorch', categoryId: cat['Data & AI'] },
    { name: 'Pandas', categoryId: cat['Data & AI'] },
    { name: 'NumPy', categoryId: cat['Data & AI'] },
    { name: 'LangChain', categoryId: cat['Data & AI'] },
    { name: 'OpenAI API', categoryId: cat['Data & AI'] },
    { name: 'Scikit-learn', categoryId: cat['Data & AI'] },

    // Testing
    { name: 'Jest', categoryId: cat['Testing'] },
    { name: 'Vitest', categoryId: cat['Testing'] },
    { name: 'Cypress', categoryId: cat['Testing'] },
    { name: 'Playwright', categoryId: cat['Testing'] },
    { name: 'Testing Library', categoryId: cat['Testing'] },
    { name: 'Supertest', categoryId: cat['Testing'] },

    // Security
    { name: 'OAuth2', categoryId: cat['Security'] },
    { name: 'JWT', categoryId: cat['Security'] },
    { name: 'OWASP', categoryId: cat['Security'] },
    { name: 'SSL/TLS', categoryId: cat['Security'] },

    // Programming Language
    { name: 'Rust', categoryId: cat['Programming Language'] },
    { name: 'Go', categoryId: cat['Programming Language'] },
    { name: 'Java', categoryId: cat['Programming Language'] },
    { name: 'C#', categoryId: cat['Programming Language'] },
    { name: 'C++', categoryId: cat['Programming Language'] },
    { name: 'PHP', categoryId: cat['Programming Language'] },
    { name: 'Ruby', categoryId: cat['Programming Language'] },
    { name: 'Scala', categoryId: cat['Programming Language'] },
    { name: 'Elixir', categoryId: cat['Programming Language'] },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: { categoryId: skill.categoryId },
      create: skill,
    });
  }

  console.log(
    `Seed completed — ${skills.length} skills in ${categoryNames.length} categories`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
