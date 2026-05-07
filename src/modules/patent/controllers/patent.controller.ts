import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, Public } from '@modules/auth/decorators';
import { JwtAuthGuard } from '@modules/auth/guards';
import { PatentService } from '../services/patent.service';
import { CreatePatentDto } from '@requestable-dto/patent/create-patent.dto';
import { User } from '@modules/user/entities/user.entity';
import { BaseQueryDto } from '@base-classes/pagination/base-query.dto';

@ApiTags('Patent')
@Controller('patents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PatentController {
  constructor(private readonly patentService: PatentService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create a new patent',
    description: 'Creates a new patent with the provided information',
  })
  @ApiBody({ type: CreatePatentDto })
  async create(@Body() payload: CreatePatentDto, @CurrentUser() user: User) {
    return await this.patentService.create(payload);
  }

  @Public()
  @Get(':patentId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'patentId',
    description: 'The ID of the patent whose information is being retrieved',
    required: true,
  })
  @ApiOperation({
    summary: 'Get patent information',
    description: 'Retrieves the information for a specific patent',
  })
  async findById(@Param('patentId', new ParseUUIDPipe()) patentId: string) {
    return await this.patentService.findById(patentId);
  }

  @Public()
  @Post('get-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all patents',
    description:
      'Returns a list of all patents in the system with pagination and filtering options',
  })
  async findAll(@Body() payload: BaseQueryDto) {
    return await this.patentService.findAll(payload);
  }
}
