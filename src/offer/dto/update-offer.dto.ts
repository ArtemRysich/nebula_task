import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create-offer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @ApiProperty({
    description: 'Name of the offer. Must be between 2 and 30 characters long.',
    example: 'Updated Offer Name',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Price of the offer. Must be a positive number.',
    example: 79.99,
    required: false,
  })
  price?: number;
}
