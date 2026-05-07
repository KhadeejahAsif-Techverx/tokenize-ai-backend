import { OrderEnum } from '@enums/index';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';
import { PageOptionsDto } from './page-options.dto';

export class BaseQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({
    description:
      'Filter criteria as key-value pairs (e.g., { "columnName": "value" })',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  filters?: Record<string, string | number | boolean>;

  @ApiPropertyOptional({
    description:
      'Sort criteria as key-value pairs (e.g., { "columnName": "ASC" })',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  sort?: Record<string, OrderEnum>;
}
