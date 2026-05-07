import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetUserProfileDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'Waqar',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Hussain',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Contact of the user',
    example: '+92 317 4945496',
  })
  @IsString()
  @IsNotEmpty()
  contact: string;

  @ApiProperty({
    description: 'Country name of the user',
    example: 'Pakistan',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}
