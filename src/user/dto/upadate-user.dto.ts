import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Email of the user. This field is optional.',
    example: 'user@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Name of the user. This field is optional.',
    example: 'User Surname',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Gender of the user. This field is optional.',
    example: Gender.Male,
  })
  gender?: Gender;

  @ApiPropertyOptional({
    description: 'User birth date in ISO-8601 format',
    example: '1970-01-01T00:00:01.959Z',
  })
  birthDate?: Date;

  @ApiPropertyOptional({
    description:
      'Birth time of the user in HH:MM:SS format. This field is optional.',
    example: '14:30:00',
  })
  birthTime?: string;

  @ApiPropertyOptional({
    description: 'Privacy policy acceptance status. This field is optional.',
    example: true,
  })
  privacyPolicyAccepted?: boolean;

  @ApiPropertyOptional({
    description: 'Subscription status to offers. This field is optional.',
    example: false,
  })
  isSubscribedToOffers?: boolean;

  @ApiPropertyOptional({
    description: 'Phone number of the user. This field is optional.',
    example: '+380 50 000 0000',
  })
  phoneNumber?: string;
}
