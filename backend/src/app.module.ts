import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { SkillsModule } from './skills/skills.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    SkillsModule,
    JobApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
