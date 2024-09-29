import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CONSTANTS } from 'src/common/variables/rabbitmq.variables';
import { IOrder } from 'src/purchase/interfaces/order.interface';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject(CONSTANTS.RABBITMQ_ANALYTICS_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  sendAnalyticsEvent(data: IOrder): void {
    this.client.emit(CONSTANTS.ORDER_PATTERN, data);
  }
}
