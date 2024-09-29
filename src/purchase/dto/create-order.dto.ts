import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The unique identifier (uuid) for the offer',
    example: '0583544d-ea7c-486c-b3fa-0bde0b39be89',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Offer ID cannot be empty' })
  @Length(36, 36)
  offerId: string;

  @ApiProperty({
    description: 'The unique identifier (uuid) for the user',
    example: 'eab12944-e33b-41e0-85bd-d2de49c4515d',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Offer ID cannot be empty' })
  @Length(36, 36)
  userId: string;
}
