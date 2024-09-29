import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User name (2 to 30 characters)',
    example: 'Name Surname',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @Length(2, 30)
  name: string;

  @ApiProperty({
    description: 'User gender',
    enum: Gender,
    example: Gender.Male,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'User birth date in ISO-8601 format',
    example: '1970-01-01T00:00:01.959Z',
  })
  @IsDateString()
  birthDate: Date;

  @ApiProperty({
    description: 'User birth time in HH:MM:SS format',
    example: '14:30:00',
    required: false,
  })
  @IsOptional()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
  @IsString()
  birthTime?: string;

  @ApiProperty({
    description: 'Indicates if the user accepted the privacy policy',
    example: true,
  })
  @IsBoolean()
  privacyPolicyAccepted: boolean;

  @ApiProperty({
    description: 'Indicates if the user is subscribed to offers',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isSubscribedToOffers?: boolean;

  @ApiProperty({
    description: 'User phone number in the format +XXX XX XXX XXXX',
    example: '+380 50 000 0000',
    required: false,
  })
  @IsOptional()
  @Matches(/^\+\d{3}\s\d{2}\s\d{3}\s\d{4}$/)
  @IsString()
  phoneNumber?: string;
}
