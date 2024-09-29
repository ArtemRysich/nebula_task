import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({
    description: 'Name of the offer. Must be between 2 and 30 characters long.',
    example: 'Special Astrological Offer',
  })
  @IsString()
  @Length(2, 30)
  name: string;

  @ApiProperty({
    description: 'Price of the offer. Must be a positive number.',
    example: 99.99,
  })
  @IsNumber()
  @IsPositive()
  price: number;
}
