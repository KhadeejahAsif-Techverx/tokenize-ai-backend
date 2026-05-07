import {
  Body,
  Controller,
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
  @HttpCode(HttpStatus.OK)
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
