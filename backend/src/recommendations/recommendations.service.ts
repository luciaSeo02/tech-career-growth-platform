import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LEARNING_RESOURCES, LearningResource } from './learning-resources';
import { MarketInsightsService } from '../market-insights/market-insights.service';

export type SkillRecommendation = {
  skill: string;
  category: string;
  marketDemand: number;
  priority: 'high' | 'medium' | 'low';
  resources: LearningResource[];
};

export type RecommendationsResult = {
  targetRole: string;
  roleCategory: string;
  nextStep: SkillRecommendation | null;
  recommendations: SkillRecommendation[];
  totalAnalyzed: number;
};

@Injectable()
export class RecommendationsService {
  constructor(
    private prisma: PrismaService,
    private marketInsights: MarketInsightsService,
  ) {}

  async getRecommendations(
    userId: string,
  ): Promise<RecommendationsResult | null> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      include: { skills: { include: { skill: true } } },
    });

    if (!profile) return null;

    const skillGap = await this.marketInsights.getSkillGap(userId);
    if (!skillGap) return null;

    const recommendations: SkillRecommendation[] = skillGap.gap
      .slice(0, 8)
      .map((item, index) => {
        const skill = item.skill;
        const resources = LEARNING_RESOURCES[skill] ?? [];
        const priority: 'high' | 'medium' | 'low' =
          index < 3 ? 'high' : index < 6 ? 'medium' : 'low';

        return {
          skill,
          category: this.getSkillCategory(skill),
          marketDemand: item.count,
          priority,
          resources,
        };
      });

    return {
      targetRole: skillGap.targetRole,
      roleCategory: skillGap.roleCategory,
      nextStep: recommendations[0] ?? null,
      recommendations,
      totalAnalyzed: skillGap.totalAnalyzed,
    };
  }

  private getSkillCategory(skillName: string): string {
    const categories: Record<string, string> = {
      React: 'Frontend',
      'Next.js': 'Frontend',
      'Vue.js': 'Frontend',
      Angular: 'Frontend',
      TypeScript: 'Frontend',
      JavaScript: 'Frontend',
      'Node.js': 'Backend',
      NestJS: 'Backend',
      Express: 'Backend',
      Python: 'Data & AI',
      Django: 'Backend',
      FastAPI: 'Backend',
      Java: 'Programming Language',
      'Spring Boot': 'Backend',
      Go: 'Programming Language',
      'C#': 'Programming Language',
      Docker: 'DevOps',
      Kubernetes: 'DevOps',
      Terraform: 'DevOps',
      'GitHub Actions': 'DevOps',
      Jenkins: 'DevOps',
      AWS: 'Cloud',
      'Google Cloud': 'Cloud',
      Azure: 'Cloud',
      PostgreSQL: 'Database',
      MongoDB: 'Database',
      Redis: 'Database',
      'React Native': 'Mobile',
      Flutter: 'Mobile',
      Kotlin: 'Mobile',
    };
    return categories[skillName] ?? 'Other';
  }
}
