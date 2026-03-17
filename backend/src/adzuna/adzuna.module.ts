import { Module } from '@nestjs/common';
import { AdzunaService } from './adzuna.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AdzunaService],
  exports: [AdzunaService],
})
export class AdzunaModule {}
