import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BaseQueryDto } from '@base-classes/pagination/base-query.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a user by their unique identifier',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user to retrieve',
    required: true,
  })
  async findById(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return await this.userService.findById(userId, true);
  }

  @Post('get-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    description:
      'Returns a list of all users in the system with pagination and filtering options',
  })
  async findAll(@Body() payload: BaseQueryDto) {
    return await this.userService.findAll(payload);
  }

  @Patch(':userId/toggle-active')
  @ApiOperation({
    summary: 'Toggle user active status',
    description: 'Activate or deactivate a user account',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose active status is being toggled',
    required: true,
  })
  async toggleUserActiveStatus(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    return await this.userService.toggleUserActiveStatus(userId);
  }
}
