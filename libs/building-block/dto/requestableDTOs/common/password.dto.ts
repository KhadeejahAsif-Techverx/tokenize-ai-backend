import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordDto {
  @ApiProperty({
    description: 'password of the user',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
