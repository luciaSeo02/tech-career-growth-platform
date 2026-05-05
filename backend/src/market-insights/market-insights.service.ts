import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketInsightsService {
  constructor(private prisma: PrismaService) {}

  async getTopSkills(region?: string, limit = 10) {
    const latestPeriod = await this.prisma.skillDemand.findFirst({
      orderBy: { period: 'desc' },
      select: { period: true },
    });

    const where: any = {
      period: latestPeriod?.period,
      region: region && region !== 'Global' ? region : 'Global',
    };

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
    const latestPeriod = await this.prisma.skillDemand.findFirst({
      orderBy: { period: 'desc' },
      select: { period: true },
    });

    const where: any = {
      period: latestPeriod?.period,
      region: region && region !== 'Global' ? region : 'Global',
    };

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
        ? region === 'Remote'
          ? { workMode: 'REMOTE' as const }
          : { region }
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
      by: ['roleCategory'],
      where,
      _count: { roleCategory: true },
      orderBy: { _count: { roleCategory: 'desc' } },
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
      roleDistribution: roleDistribution
        .filter((r) => r.roleCategory)
        .map((r) => ({
          role: r.roleCategory!,
          count: r._count.roleCategory,
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

    const roleCategory = this.normalizeTargetRole(profile.targetRole);

    const roleWhere = roleCategory !== 'Other' ? { roleCategory } : {};

    const jobsForRole = await this.prisma.jobMarket.findMany({
      where: roleWhere,
      include: { skills: { include: { skill: true } } },
      take: 500,
    });

    const skillCount: Record<string, number> = {};
    for (const job of jobsForRole) {
      for (const js of job.skills) {
        const name = js.skill.name;
        skillCount[name] = (skillCount[name] ?? 0) + 1;
      }
    }

    const topRoleSkills = Object.entries(skillCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count, role: roleCategory }));

    const topDemanded =
      topRoleSkills.length > 0
        ? topRoleSkills
        : (await this.getTopSkills('Global', 10)).map((s) => ({
            skill: s.skill,
            count: s.count,
            role: 'Global',
          }));

    const gap = topDemanded.filter((s) => !userSkillNames.has(s.skill));
    const matched = topDemanded.filter((s) => userSkillNames.has(s.skill));

    return {
      targetRole: profile.targetRole,
      roleCategory,
      matched,
      gap,
      coveragePercent: Math.round((matched.length / topDemanded.length) * 100),
      totalAnalyzed: jobsForRole.length,
    };
  }

  private normalizeTargetRole(targetRole: string): string {
    const lower = targetRole.toLowerCase();
    if (
      lower.includes('frontend') ||
      lower.includes('front-end') ||
      lower.includes('front end') ||
      lower.includes('react developer') ||
      lower.includes('vue developer') ||
      lower.includes('angular developer') ||
      lower.includes('ui developer')
    )
      return 'Frontend Developer';
    if (
      lower.includes('backend') ||
      lower.includes('back-end') ||
      lower.includes('back end') ||
      lower.includes('node developer') ||
      lower.includes('python developer') ||
      lower.includes('java developer') ||
      lower.includes('api developer')
    )
      return 'Backend Developer';
    if (
      lower.includes('fullstack') ||
      lower.includes('full stack') ||
      lower.includes('full-stack') ||
      lower.includes('software developer') ||
      lower.includes('software engineer') ||
      lower.includes('web developer') ||
      lower.includes('application developer') ||
      lower.includes('app developer')
    )
      return 'Full Stack Developer';
    if (
      lower.includes('devops') ||
      lower.includes('sre') ||
      lower.includes('platform engineer') ||
      lower.includes('cloud engineer') ||
      lower.includes('infrastructure')
    )
      return 'DevOps Engineer';
    if (
      lower.includes('data engineer') ||
      lower.includes('data pipeline') ||
      lower.includes('etl') ||
      lower.includes('data developer')
    )
      return 'Data Engineer';
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
}
