import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    description: 'email of the user',
    example: 'waqar.hussain@techverx.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
