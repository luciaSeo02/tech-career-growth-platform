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

  // ============================================
  // JOB MARKET DATA
  // ============================================
  console.log('Seeding job market data...');

  const regions = ['Spain', 'UK', 'Germany', 'France', 'Netherlands', 'Remote'];

  const jobMarketData: {
    title: string;
    company: string;
    location: string;
    region: string;
    workMode: 'REMOTE' | 'HYBRID' | 'ONSITE';
    salaryMin: number;
    salaryMax: number;
    source: string;
    skills: string[];
  }[] = [
    // ---- SPAIN ----
    {
      title: 'Frontend Developer',
      company: 'Cabify',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 35000,
      salaryMax: 50000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'CSS', 'Next.js', 'Jest'],
    },
    {
      title: 'Backend Developer',
      company: 'Glovo',
      location: 'Barcelona, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 40000,
      salaryMax: 55000,
      source: 'linkedin',
      skills: ['Node.js', 'PostgreSQL', 'Docker', 'Redis', 'NestJS'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Idealista',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 38000,
      salaryMax: 52000,
      source: 'infojobs',
      skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker'],
    },
    {
      title: 'DevOps Engineer',
      company: 'Banco Santander',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 45000,
      salaryMax: 65000,
      source: 'linkedin',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'GitHub Actions'],
    },
    {
      title: 'Data Engineer',
      company: 'Telefonica',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 42000,
      salaryMax: 60000,
      source: 'linkedin',
      skills: ['Python', 'PostgreSQL', 'Elasticsearch', 'Docker', 'AWS'],
    },
    {
      title: 'Mobile Developer',
      company: 'BBVA',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 40000,
      salaryMax: 58000,
      source: 'infojobs',
      skills: ['React Native', 'TypeScript', 'Jest', 'Redux', 'Node.js'],
    },
    {
      title: 'Frontend Developer',
      company: 'Tuenti',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'REMOTE',
      salaryMin: 32000,
      salaryMax: 45000,
      source: 'linkedin',
      skills: ['Vue.js', 'TypeScript', 'CSS', 'Jest', 'Vite'],
    },
    {
      title: 'Backend Developer',
      company: 'Mercadona Tech',
      location: 'Valencia, Spain',
      region: 'Spain',
      workMode: 'ONSITE',
      salaryMin: 38000,
      salaryMax: 52000,
      source: 'company_site',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Flywire',
      location: 'Barcelona, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 42000,
      salaryMax: 58000,
      source: 'linkedin',
      skills: ['React', 'Ruby on Rails', 'PostgreSQL', 'TypeScript', 'Docker'],
    },
    {
      title: 'DevOps Engineer',
      company: 'King',
      location: 'Barcelona, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 50000,
      salaryMax: 70000,
      source: 'linkedin',
      skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'GitHub Actions'],
    },
    {
      title: 'Data Engineer',
      company: 'Fever',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 40000,
      salaryMax: 55000,
      source: 'linkedin',
      skills: ['Python', 'Pandas', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      title: 'Backend Developer',
      company: 'Typeform',
      location: 'Barcelona, Spain',
      region: 'Spain',
      workMode: 'REMOTE',
      salaryMin: 45000,
      salaryMax: 62000,
      source: 'linkedin',
      skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      title: 'Frontend Developer',
      company: 'Holaluz',
      location: 'Barcelona, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 35000,
      salaryMax: 48000,
      source: 'infojobs',
      skills: ['Vue.js', 'TypeScript', 'Jest', 'CSS', 'Vite'],
    },
    {
      title: 'Mobile Developer',
      company: 'Wallapop',
      location: 'Barcelona, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 42000,
      salaryMax: 58000,
      source: 'linkedin',
      skills: ['React Native', 'TypeScript', 'Redux', 'Jest', 'GraphQL Client'],
    },
    {
      title: 'Full Stack Developer',
      company: 'JobandTalent',
      location: 'Madrid, Spain',
      region: 'Spain',
      workMode: 'HYBRID',
      salaryMin: 40000,
      salaryMax: 55000,
      source: 'linkedin',
      skills: ['React', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    },

    // ---- UK ----
    {
      title: 'Frontend Developer',
      company: 'Monzo',
      location: 'London, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 60000,
      salaryMax: 85000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'Next.js', 'Jest', 'GraphQL Client'],
    },
    {
      title: 'Backend Developer',
      company: 'Revolut',
      location: 'London, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 70000,
      salaryMax: 95000,
      source: 'linkedin',
      skills: ['Kotlin', 'PostgreSQL', 'Redis', 'Kubernetes', 'Docker'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Deliveroo',
      location: 'London, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 65000,
      salaryMax: 90000,
      source: 'linkedin',
      skills: ['React', 'Ruby on Rails', 'PostgreSQL', 'Docker', 'TypeScript'],
    },
    {
      title: 'DevOps Engineer',
      company: 'Darktrace',
      location: 'Cambridge, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 75000,
      salaryMax: 100000,
      source: 'linkedin',
      skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'GitHub Actions'],
    },
    {
      title: 'Data Engineer',
      company: 'Wise',
      location: 'London, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 70000,
      salaryMax: 90000,
      source: 'linkedin',
      skills: ['Python', 'Pandas', 'PostgreSQL', 'AWS', 'Elasticsearch'],
    },
    {
      title: 'Mobile Developer',
      company: 'Starling Bank',
      location: 'London, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 65000,
      salaryMax: 88000,
      source: 'linkedin',
      skills: ['Swift', 'Kotlin', 'React Native', 'TypeScript', 'Jest'],
    },
    {
      title: 'Frontend Developer',
      company: 'Babylon Health',
      location: 'London, UK',
      region: 'UK',
      workMode: 'REMOTE',
      salaryMin: 58000,
      salaryMax: 78000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'GraphQL Client', 'Jest', 'CSS'],
    },
    {
      title: 'Backend Developer',
      company: 'OVO Energy',
      location: 'Bristol, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 60000,
      salaryMax: 80000,
      source: 'linkedin',
      skills: ['Scala', 'PostgreSQL', 'Kubernetes', 'Docker', 'AWS'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Cazoo',
      location: 'London, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 62000,
      salaryMax: 85000,
      source: 'linkedin',
      skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
    },
    {
      title: 'DevOps Engineer',
      company: 'Ocado Technology',
      location: 'Hatfield, UK',
      region: 'UK',
      workMode: 'HYBRID',
      salaryMin: 70000,
      salaryMax: 95000,
      source: 'company_site',
      skills: ['Kubernetes', 'Google Cloud', 'Terraform', 'Docker', 'Jenkins'],
    },

    // ---- GERMANY ----
    {
      title: 'Frontend Developer',
      company: 'N26',
      location: 'Berlin, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 55000,
      salaryMax: 75000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'Next.js', 'Jest', 'CSS'],
    },
    {
      title: 'Backend Developer',
      company: 'Zalando',
      location: 'Berlin, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 65000,
      salaryMax: 85000,
      source: 'linkedin',
      skills: ['Kotlin', 'Java', 'PostgreSQL', 'Kubernetes', 'Docker'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Delivery Hero',
      location: 'Berlin, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 60000,
      salaryMax: 80000,
      source: 'linkedin',
      skills: ['React', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      title: 'DevOps Engineer',
      company: 'SAP',
      location: 'Munich, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 70000,
      salaryMax: 95000,
      source: 'company_site',
      skills: ['Kubernetes', 'Azure', 'Terraform', 'Docker', 'Jenkins'],
    },
    {
      title: 'Data Engineer',
      company: 'Celonis',
      location: 'Munich, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 65000,
      salaryMax: 85000,
      source: 'linkedin',
      skills: ['Python', 'Pandas', 'PostgreSQL', 'Elasticsearch', 'Docker'],
    },
    {
      title: 'Mobile Developer',
      company: 'SumUp',
      location: 'Berlin, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 58000,
      salaryMax: 78000,
      source: 'linkedin',
      skills: ['React Native', 'TypeScript', 'Kotlin', 'Swift', 'Jest'],
    },
    {
      title: 'Frontend Developer',
      company: 'AUTO1 Group',
      location: 'Berlin, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 52000,
      salaryMax: 70000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'Vite'],
    },
    {
      title: 'Backend Developer',
      company: 'Contentful',
      location: 'Berlin, Germany',
      region: 'Germany',
      workMode: 'REMOTE',
      salaryMin: 62000,
      salaryMax: 82000,
      source: 'linkedin',
      skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      title: 'Full Stack Developer',
      company: 'HelloFresh',
      location: 'Berlin, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 58000,
      salaryMax: 78000,
      source: 'linkedin',
      skills: ['React', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    },
    {
      title: 'DevOps Engineer',
      company: 'Siemens',
      location: 'Munich, Germany',
      region: 'Germany',
      workMode: 'HYBRID',
      salaryMin: 68000,
      salaryMax: 90000,
      source: 'company_site',
      skills: ['Kubernetes', 'Azure', 'Terraform', 'Docker', 'Ansible'],
    },

    // ---- FRANCE ----
    {
      title: 'Frontend Developer',
      company: 'BlaBlaCar',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 48000,
      salaryMax: 65000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'Next.js', 'Jest', 'CSS'],
    },
    {
      title: 'Backend Developer',
      company: 'Doctolib',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 52000,
      salaryMax: 70000,
      source: 'linkedin',
      skills: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Deezer',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 50000,
      salaryMax: 68000,
      source: 'linkedin',
      skills: ['React', 'Python', 'PostgreSQL', 'Docker', 'Redis'],
    },
    {
      title: 'DevOps Engineer',
      company: 'OVHcloud',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 58000,
      salaryMax: 78000,
      source: 'linkedin',
      skills: ['Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Linux'],
    },
    {
      title: 'Data Engineer',
      company: 'Criteo',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 55000,
      salaryMax: 72000,
      source: 'linkedin',
      skills: ['Python', 'Pandas', 'Elasticsearch', 'PostgreSQL', 'Docker'],
    },
    {
      title: 'Mobile Developer',
      company: 'Meetic',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 48000,
      salaryMax: 65000,
      source: 'linkedin',
      skills: ['React Native', 'TypeScript', 'Swift', 'Kotlin', 'Redux'],
    },
    {
      title: 'Frontend Developer',
      company: 'Leboncoin',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 45000,
      salaryMax: 62000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'Jest'],
    },
    {
      title: 'Backend Developer',
      company: 'Algolia',
      location: 'Paris, France',
      region: 'France',
      workMode: 'REMOTE',
      salaryMin: 55000,
      salaryMax: 75000,
      source: 'linkedin',
      skills: ['Go', 'PostgreSQL', 'Elasticsearch', 'Docker', 'Kubernetes'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Ledger',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 52000,
      salaryMax: 70000,
      source: 'linkedin',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    },
    {
      title: 'DevOps Engineer',
      company: 'Contentsquare',
      location: 'Paris, France',
      region: 'France',
      workMode: 'HYBRID',
      salaryMin: 60000,
      salaryMax: 80000,
      source: 'linkedin',
      skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'GitHub Actions'],
    },

    // ---- NETHERLANDS ----
    {
      title: 'Frontend Developer',
      company: 'Booking.com',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 60000,
      salaryMax: 80000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'Next.js', 'Jest', 'GraphQL Client'],
    },
    {
      title: 'Backend Developer',
      company: 'Adyen',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 70000,
      salaryMax: 92000,
      source: 'linkedin',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Kubernetes', 'Docker'],
    },
    {
      title: 'Full Stack Developer',
      company: 'TomTom',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 62000,
      salaryMax: 82000,
      source: 'company_site',
      skills: ['React', 'C#', 'PostgreSQL', 'Docker', 'Azure'],
    },
    {
      title: 'DevOps Engineer',
      company: 'ASML',
      location: 'Eindhoven, Netherlands',
      region: 'Netherlands',
      workMode: 'ONSITE',
      salaryMin: 75000,
      salaryMax: 100000,
      source: 'company_site',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins'],
    },
    {
      title: 'Data Engineer',
      company: 'Philips',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 65000,
      salaryMax: 85000,
      source: 'linkedin',
      skills: ['Python', 'Pandas', 'PostgreSQL', 'AWS', 'Docker'],
    },
    {
      title: 'Mobile Developer',
      company: 'WeTransfer',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 58000,
      salaryMax: 78000,
      source: 'linkedin',
      skills: ['React Native', 'TypeScript', 'Swift', 'Kotlin', 'Jest'],
    },
    {
      title: 'Frontend Developer',
      company: 'Takeaway.com',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 55000,
      salaryMax: 75000,
      source: 'linkedin',
      skills: ['React', 'TypeScript', 'CSS', 'Next.js', 'Jest'],
    },
    {
      title: 'Backend Developer',
      company: 'Catawiki',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 60000,
      salaryMax: 80000,
      source: 'linkedin',
      skills: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Mollie',
      location: 'Amsterdam, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 62000,
      salaryMax: 82000,
      source: 'linkedin',
      skills: ['React', 'PHP', 'PostgreSQL', 'Docker', 'TypeScript'],
    },
    {
      title: 'DevOps Engineer',
      company: 'bol.com',
      location: 'Utrecht, Netherlands',
      region: 'Netherlands',
      workMode: 'HYBRID',
      salaryMin: 68000,
      salaryMax: 88000,
      source: 'company_site',
      skills: [
        'Kubernetes',
        'Google Cloud',
        'Terraform',
        'Docker',
        'GitHub Actions',
      ],
    },

    // ---- REMOTE ----
    {
      title: 'Frontend Developer',
      company: 'GitLab',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 65000,
      salaryMax: 90000,
      source: 'company_site',
      skills: ['Vue.js', 'TypeScript', 'GraphQL Client', 'Jest', 'CSS'],
    },
    {
      title: 'Backend Developer',
      company: 'Remote.com',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 70000,
      salaryMax: 95000,
      source: 'company_site',
      skills: ['Elixir', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Toggl',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 60000,
      salaryMax: 80000,
      source: 'company_site',
      skills: ['React', 'Go', 'PostgreSQL', 'Docker', 'TypeScript'],
    },
    {
      title: 'DevOps Engineer',
      company: 'Elastic',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 80000,
      salaryMax: 110000,
      source: 'company_site',
      skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'Elasticsearch'],
    },
    {
      title: 'Data Engineer',
      company: 'Hotjar',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 65000,
      salaryMax: 85000,
      source: 'company_site',
      skills: ['Python', 'Pandas', 'PostgreSQL', 'AWS', 'Docker'],
    },
    {
      title: 'Mobile Developer',
      company: 'Doist',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 60000,
      salaryMax: 82000,
      source: 'company_site',
      skills: ['React Native', 'TypeScript', 'Redux', 'Jest', 'GraphQL Client'],
    },
    {
      title: 'Frontend Developer',
      company: 'Whereby',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 62000,
      salaryMax: 82000,
      source: 'company_site',
      skills: ['React', 'TypeScript', 'WebSockets', 'Jest', 'CSS'],
    },
    {
      title: 'Backend Developer',
      company: 'Supermetrics',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 65000,
      salaryMax: 88000,
      source: 'company_site',
      skills: ['Python', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Basecamp',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 70000,
      salaryMax: 95000,
      source: 'company_site',
      skills: ['Ruby on Rails', 'React', 'PostgreSQL', 'Docker', 'TypeScript'],
    },
    {
      title: 'DevOps Engineer',
      company: 'Automattic',
      location: 'Remote, Europe',
      region: 'Remote',
      workMode: 'REMOTE',
      salaryMin: 75000,
      salaryMax: 100000,
      source: 'company_site',
      skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'Linux'],
    },
  ];

  for (const job of jobMarketData) {
    const skillRecords = await Promise.all(
      job.skills.map((skillName) =>
        prisma.skill.findUnique({ where: { name: skillName } }),
      ),
    );

    const validSkills = skillRecords.filter(Boolean);

    const existingJob = await prisma.jobMarket.findUnique({
      where: {
        sourceUrl: `${job.source}/${job.company.toLowerCase().replace(/\s/g, '-')}/${job.title.toLowerCase().replace(/\s/g, '-')}`,
      },
    });

    if (!existingJob) {
      await prisma.jobMarket.create({
        data: {
          title: job.title,
          company: job.company,
          location: job.location,
          workMode: job.workMode,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          source: job.source,
          sourceUrl: `${job.source}/${job.company.toLowerCase().replace(/\s/g, '-')}/${job.title.toLowerCase().replace(/\s/g, '-')}`,
          publishedAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
          ),
          skills: {
            create: validSkills.map((skill) => ({
              skillId: skill!.id,
            })),
          },
        },
      });
    }
  }

  const currentPeriod = new Date().toISOString().slice(0, 7);

  for (const region of regions) {
    const jobsInRegion = await prisma.jobMarket.findMany({
      where: {
        location: { contains: region === 'Remote' ? 'Remote' : region },
      },
      include: { skills: { include: { skill: true } } },
    });

    const skillCount: Record<string, number> = {};
    for (const job of jobsInRegion) {
      for (const js of job.skills) {
        const name = js.skill.name;
        skillCount[name] = (skillCount[name] ?? 0) + 1;
      }
    }

    for (const [skillName, count] of Object.entries(skillCount)) {
      const skill = await prisma.skill.findUnique({
        where: { name: skillName },
      });
      if (!skill) continue;

      await prisma.skillDemand.upsert({
        where: {
          skillId_region_period: {
            skillId: skill.id,
            region,
            period: currentPeriod,
          },
        },
        update: { count },
        create: {
          skillId: skill.id,
          region,
          period: currentPeriod,
          count,
        },
      });
    }
  }

  const allJobs = await prisma.jobMarket.findMany({
    include: { skills: { include: { skill: true } } },
  });

  const globalSkillCount: Record<string, number> = {};
  for (const job of allJobs) {
    for (const js of job.skills) {
      const name = js.skill.name;
      globalSkillCount[name] = (globalSkillCount[name] ?? 0) + 1;
    }
  }

  for (const [skillName, count] of Object.entries(globalSkillCount)) {
    const skill = await prisma.skill.findUnique({ where: { name: skillName } });
    if (!skill) continue;

    await prisma.skillDemand.upsert({
      where: {
        skillId_region_period: {
          skillId: skill.id,
          region: 'Global',
          period: currentPeriod,
        },
      },
      update: { count },
      create: {
        skillId: skill.id,
        region: 'Global',
        period: currentPeriod,
        count,
      },
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
