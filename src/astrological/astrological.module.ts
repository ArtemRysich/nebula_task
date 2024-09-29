import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AstrologicalService } from './astrological.service';
import { CONSTANTS } from 'src/common/variables/rabbitmq.variables';

dotenv.config();

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: CONSTANTS.RABBITMQ_CONFIG_NAME,
          type: CONSTANTS.RABBITMQ_CONFIG_TYPE,
          options: {
            arguments: { 'x-delayed-type': 'direct' },
          },
        },
      ],
      uri: process.env.RABBITMQ_URL,
    }),
  ],
  providers: [AstrologicalService],
  exports: [AstrologicalService],
})
export class AstrologicalModule {}
