import { Injectable, NotFoundException } from '@nestjs/common';
import { IOffer } from './interfaces/offer.interface';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { IOfferColection } from './interfaces/offers_colection.interface';

@Injectable()
export class OfferService {
  constructor(private readonly prisma: PrismaService) {}

  async createOffer(offerDto: CreateOfferDto): Promise<IOffer> {
    return await this.prisma.offer.create({
      data: offerDto,
    });
  }

  async getOffer(offerId: string): Promise<IOffer> {
    const offer = await this.prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      throw new NotFoundException();
    }

    return offer;
  }

  async getAllOffers(
    page: number = 1,
    limit: number = 1,
  ): Promise<IOfferColection> {
    const skip = (page - 1) * limit;

    const [offers, totalCount] = await Promise.all([
      this.prisma.offer.findMany({
        skip,
        take: limit,
      }),
      this.prisma.offer.count(),
    ]);

    return {
      offers,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async updateOffer(
    offerId: string,
    offerDto: UpdateOfferDto,
  ): Promise<IOffer> {
    return this.prisma.offer.update({
      where: { id: offerId },
      data: offerDto,
    });
  }

  async removeOffer(offerId: string): Promise<IOffer> {
    return await this.prisma.offer.delete({
      where: { id: offerId },
    });
  }
}
