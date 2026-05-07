import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatentDto {
  @ApiProperty({
    description: 'Title of the patent',
    example: 'Example Patent Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the patent',
    example: 'Example Patent Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
