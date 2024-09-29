import { Injectable } from '@nestjs/common';
import { IOrder } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { AstrologicalService } from 'src/astrological/astrological.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analyticsService: AnalyticsService,
    private readonly astrologicalService: AstrologicalService,
  ) {}

  async getOrder(orderId: string): Promise<IOrder> {
    return await this.prisma.purchase.findUnique({ where: { id: orderId } });
  }

  async createOrder(orderDto: CreateOrderDto): Promise<IOrder> {
    const order = await this.prisma.purchase.create({
      data: orderDto,
    });

    this.analyticsService.sendAnalyticsEvent(order);
    this.astrologicalService.sendAstrologicalEvent(order);

    return order;
  }
}
