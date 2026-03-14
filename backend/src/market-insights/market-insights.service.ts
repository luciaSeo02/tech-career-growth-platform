import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketInsightsService {
  constructor(private prisma: PrismaService) {}

  async getTopSkills(region?: string, limit = 10) {
    const where =
      region && region !== 'Global' ? { region } : { region: 'Global' };

    const demands = await this.prisma.skillDemand.findMany({
      where,
      include: { skill: { include: { category: true } } },
      orderBy: { count: 'desc' },
      take: limit,
    });

    return demands.map((d) => ({
      skill: d.skill.name,
      category: d.skill.category?.name ?? 'Other',
      count: d.count,
      region: d.region,
      period: d.period,
    }));
  }

  async getRegions() {
    const regions = await this.prisma.skillDemand.findMany({
      distinct: ['region'],
      select: { region: true },
      orderBy: { region: 'asc' },
    });
    return regions.map((r) => r.region);
  }

  async getTopSkillsByCategory(region?: string) {
    const where =
      region && region !== 'Global' ? { region } : { region: 'Global' };

    const demands = await this.prisma.skillDemand.findMany({
      where,
      include: { skill: { include: { category: true } } },
      orderBy: { count: 'desc' },
    });

    const byCategory: Record<string, { skill: string; count: number }[]> = {};

    for (const d of demands) {
      const cat = d.skill.category?.name ?? 'Other';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push({ skill: d.skill.name, count: d.count });
    }

    return byCategory;
  }

  async getMarketOverview(region?: string) {
    const where =
      region && region !== 'Global'
        ? { location: { contains: region, mode: 'insensitive' as const } }
        : {};

    const [totalJobs, topSkills, byCategory, regions] = await Promise.all([
      this.prisma.jobMarket.count({ where }),
      this.getTopSkills(region, 10),
      this.getTopSkillsByCategory(region),
      this.getRegions(),
    ]);

    const salaryData = await this.prisma.jobMarket.aggregate({
      where,
      _avg: { salaryMin: true, salaryMax: true },
    });

    const roleDistribution = await this.prisma.jobMarket.groupBy({
      by: ['title'],
      where,
      _count: { title: true },
      orderBy: { _count: { title: 'desc' } },
    });

    const workModeDistribution = await this.prisma.jobMarket.groupBy({
      by: ['workMode'],
      where,
      _count: { workMode: true },
    });

    return {
      totalJobs,
      topSkills,
      byCategory,
      regions,
      avgSalary: {
        min: Math.round(salaryData._avg.salaryMin ?? 0),
        max: Math.round(salaryData._avg.salaryMax ?? 0),
      },
      roleDistribution: roleDistribution.map((r) => ({
        role: r.title,
        count: r._count.title,
      })),
      workModeDistribution: workModeDistribution.map((w) => ({
        mode: w.workMode,
        count: w._count.workMode,
      })),
    };
  }

  async getSkillGap(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      include: { skills: { include: { skill: true } } },
    });

    if (!profile) return null;

    const userSkillNames = new Set(profile.skills.map((s) => s.skill.name));

    const topDemanded = await this.getTopSkills('Global', 20);

    const gap = topDemanded.filter((s) => !userSkillNames.has(s.skill));

    const matched = topDemanded.filter((s) => userSkillNames.has(s.skill));

    return {
      matched,
      gap,
      coveragePercent: Math.round((matched.length / topDemanded.length) * 100),
    };
  }
}
