import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IOrder } from 'src/purchase/interfaces/order.interface';
import { CONSTANTS } from 'src/common/variables/rabbitmq.variables';

@Injectable()
export class AstrologicalService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendAstrologicalEvent(message: IOrder): Promise<void> {
    const exchange = CONSTANTS.RABBITMQ_CONFIG_NAME;
    const routingKey = CONSTANTS.RABBITMQ_CONFIG_ROUTING_KEY;
    const delay = CONSTANTS.RESPONSE_DELAY;
    await this.amqpConnection.publish(
      exchange,
      routingKey,
      JSON.stringify(message),
      {
        headers: {
          'x-delay': delay,
        },
      },
    );
  }
}
