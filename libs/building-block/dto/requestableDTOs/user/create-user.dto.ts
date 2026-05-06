import { ApiProperty } from '@nestjs/swagger';
import { EmailDto } from '@requestable-dto/common/email.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends EmailDto {
  @ApiProperty({
    description: 'Password for the user account',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
