import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type AdzunaJob = {
  id: string;
  title: string;
  description: string;
  created: string;
  redirect_url: string;
  company: { display_name: string };
  location: { display_name: string; area: string[] };
  salary_min?: number;
  salary_max?: number;
};

type AdzunaResponse = {
  results: AdzunaJob[];
  count: number;
};

const COUNTRY_REGION_MAP: Record<string, string> = {
  es: 'Spain',
  gb: 'UK',
  de: 'Germany',
  fr: 'France',
  nl: 'Netherlands',
};

const SKILL_KEYWORDS: Record<string, string[]> = {
  React: ['react', 'reactjs', 'react.js'],
  'Next.js': ['next.js', 'nextjs'],
  'Vue.js': ['vue', 'vuejs', 'vue.js'],
  Angular: ['angular'],
  TypeScript: ['typescript'],
  JavaScript: ['javascript'],
  'Node.js': ['node.js', 'nodejs', 'node '],
  NestJS: ['nestjs', 'nest.js'],
  Express: ['express', 'expressjs'],
  Python: ['python'],
  Django: ['django'],
  FastAPI: ['fastapi'],
  Java: ['java'],
  'Spring Boot': ['spring boot', 'spring-boot'],
  Go: ['golang'],
  Rust: ['rust'],
  'Ruby on Rails': ['ruby on rails', 'rails'],
  PHP: ['php'],
  'C#': ['c#', '.net', 'dotnet'],
  Kotlin: ['kotlin'],
  Swift: ['swift'],
  Flutter: ['flutter'],
  'React Native': ['react native'],
  PostgreSQL: ['postgresql', 'postgres'],
  MySQL: ['mysql'],
  MongoDB: ['mongodb', 'mongo'],
  Redis: ['redis'],
  Elasticsearch: ['elasticsearch', 'elastic search'],
  Docker: ['docker'],
  Kubernetes: ['kubernetes', 'k8s'],
  AWS: ['aws', 'amazon web services'],
  'Google Cloud': ['google cloud', 'gcp'],
  Azure: ['azure', 'microsoft azure'],
  Terraform: ['terraform'],
  'GitHub Actions': ['github actions'],
  Jenkins: ['jenkins'],
  GraphQL: ['graphql'],
  REST: ['rest api', 'restful'],
  Prisma: ['prisma'],
  TensorFlow: ['tensorflow'],
  PyTorch: ['pytorch'],
  Pandas: ['pandas'],
  Jest: ['jest'],
  Cypress: ['cypress'],
  Playwright: ['playwright'],
  Tailwind: ['tailwind'],
  Linux: ['linux'],
  Nginx: ['nginx'],
};

@Injectable()
export class AdzunaService {
  private readonly logger = new Logger(AdzunaService.name);
  private readonly appId: string;
  private readonly appKey: string;
  private readonly baseUrl = 'https://api.adzuna.com/v1/api/jobs';

  constructor(private prisma: PrismaService) {
    this.appId = process.env.ADZUNA_APP_ID ?? '';
    this.appKey = process.env.ADZUNA_APP_KEY ?? '';
  }

  private normalizeRole(title: string): string {
    const lower = title.toLowerCase();
    if (
      lower.includes('frontend') ||
      lower.includes('front-end') ||
      lower.includes('front end')
    )
      return 'Frontend Developer';
    if (
      lower.includes('backend') ||
      lower.includes('back-end') ||
      lower.includes('back end')
    )
      return 'Backend Developer';
    if (
      lower.includes('fullstack') ||
      lower.includes('full stack') ||
      lower.includes('full-stack')
    )
      return 'Full Stack Developer';
    if (
      lower.includes('devops') ||
      lower.includes('sre') ||
      lower.includes('platform engineer')
    )
      return 'DevOps Engineer';
    if (lower.includes('data engineer')) return 'Data Engineer';
    if (
      lower.includes('mobile') ||
      lower.includes('ios') ||
      lower.includes('android') ||
      lower.includes('flutter') ||
      lower.includes('react native')
    )
      return 'Mobile Developer';
    return 'Other';
  }

  private extractSkills(description: string): string[] {
    const lower = description.toLowerCase();
    const found: string[] = [];

    for (const [skillName, keywords] of Object.entries(SKILL_KEYWORDS)) {
      const matches = keywords.some((kw) => lower.includes(kw));
      if (matches) found.push(skillName);
    }

    return found;
  }

  private normalizeWorkMode(
    title: string,
    description: string,
    location: string,
  ): 'REMOTE' | 'HYBRID' | 'ONSITE' | 'NOT_SPECIFIED' {
    const text = `${title} ${description} ${location}`.toLowerCase();
    if (
      text.includes('remote') ||
      text.includes('teletrabajo') ||
      text.includes('remoto') ||
      text.includes('100% remote') ||
      text.includes('fully remote') ||
      text.includes('worldwide')
    )
      return 'REMOTE';
    if (
      text.includes('hybrid') ||
      text.includes('híbrido') ||
      text.includes('hibrido')
    )
      return 'HYBRID';
    if (
      text.includes('onsite') ||
      text.includes('on-site') ||
      text.includes('on site') ||
      text.includes('presencial') ||
      text.includes('office based') ||
      text.includes('in office')
    )
      return 'ONSITE';
    return 'NOT_SPECIFIED';
  }

  async fetchAndStoreJobs(
    countryCode: string,
    query: string,
    pages = 3,
  ): Promise<number> {
    const region = COUNTRY_REGION_MAP[countryCode] ?? countryCode;
    let stored = 0;

    for (let page = 1; page <= pages; page++) {
      try {
        const url = `${this.baseUrl}/${countryCode}/search/${page}?app_id=${this.appId}&app_key=${this.appKey}&results_per_page=50&what=${encodeURIComponent(query)}&content-type=application/json`;

        const res = await fetch(url);
        if (!res.ok) {
          this.logger.warn(
            `Adzuna API error: ${res.status} for ${countryCode} page ${page}`,
          );
          break;
        }

        const data = (await res.json()) as AdzunaResponse;

        if (!data.results?.length) break;

        for (const job of data.results) {
          const sourceUrl = job.redirect_url;

          const existing = await this.prisma.jobMarket.findUnique({
            where: { sourceUrl },
          });
          if (existing) continue;

          const skillNames = this.extractSkills(job.description);
          const workMode = this.normalizeWorkMode(
            job.title,
            job.description,
            job.location.display_name,
          );

          const skillRecords = await Promise.all(
            skillNames.map((name) =>
              this.prisma.skill.findUnique({ where: { name } }),
            ),
          );
          const validSkills = skillRecords.filter(Boolean);

          await this.prisma.jobMarket.create({
            data: {
              title: job.title,
              company: job.company.display_name,
              location: job.location.display_name,
              region,
              workMode,
              salaryMin: job.salary_min ? Math.round(job.salary_min) : null,
              salaryMax: job.salary_max ? Math.round(job.salary_max) : null,
              source: 'adzuna',
              sourceUrl,
              publishedAt: new Date(job.created),
              roleCategory: this.normalizeRole(job.title),
              skills: {
                create: validSkills.map((skill) => ({
                  skillId: skill!.id,
                })),
              },
            },
          });

          stored++;
        }

        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (error) {
        this.logger.error(`Error fetching Adzuna jobs: ${error}`);
        break;
      }
    }

    this.logger.log(
      `Stored ${stored} new jobs for ${region} — query: ${query}`,
    );
    return stored;
  }

  async syncAllRegions(): Promise<Record<string, number>> {
    const queries = [
      'frontend developer',
      'backend developer',
      'fullstack developer',
      'devops engineer',
      'data engineer',
      'mobile developer',
    ];

    const results: Record<string, number> = {};

    for (const [countryCode, region] of Object.entries(COUNTRY_REGION_MAP)) {
      let total = 0;
      for (const query of queries) {
        const count = await this.fetchAndStoreJobs(countryCode, query, 2);
        total += count;
        await new Promise<void>((resolve) => setTimeout(resolve, 5000));
      }
      results[region] = total;
      this.logger.log(`${region}: ${total} jobs stored`);
    }

    return results;
  }

  async updateSkillDemand(): Promise<void> {
    const currentPeriod = new Date().toISOString().slice(0, 7);
    const regions = [
      'Spain',
      'UK',
      'Germany',
      'France',
      'Netherlands',
      'Remote',
      'Global',
    ];

    for (const region of regions) {
      const where =
        region === 'Global'
          ? {}
          : region === 'Remote'
            ? { workMode: 'REMOTE' as const }
            : { region };

      const jobs = await this.prisma.jobMarket.findMany({
        where,
        include: { skills: { include: { skill: true } } },
      });

      const skillCount: Record<string, number> = {};
      for (const job of jobs) {
        for (const js of job.skills) {
          const name = js.skill.name;
          skillCount[name] = (skillCount[name] ?? 0) + 1;
        }
      }

      for (const [skillName, count] of Object.entries(skillCount)) {
        const skill = await this.prisma.skill.findUnique({
          where: { name: skillName },
        });
        if (!skill) continue;

        await this.prisma.skillDemand.upsert({
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

    this.logger.log('SkillDemand updated from Adzuna data');
  }
}
