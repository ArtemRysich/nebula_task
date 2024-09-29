import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CONSTANTS } from 'src/common/variables/rabbitmq.variables';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CONSTANTS.RABBITMQ_ANALYTICS_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: CONSTANTS.RABBITMQ_ORDER_QUEUE,
        },
      },
    ]),
  ],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
