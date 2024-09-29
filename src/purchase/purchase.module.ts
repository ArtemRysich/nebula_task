import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { AstrologicalModule } from 'src/astrological/astrological.module';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [AnalyticsModule, AstrologicalModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaService],
})
export class PurchaseModule {}
