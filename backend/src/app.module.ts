import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { SkillsModule } from './skills/skills.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { MarketInsightsModule } from './market-insights/market-insights.module';
import { AdzunaModule } from './adzuna/adzuna.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    SkillsModule,
    JobApplicationsModule,
    MarketInsightsModule,
    AdzunaModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
