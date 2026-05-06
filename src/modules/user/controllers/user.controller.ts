import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  async findAll() {
    return await this.userService.findAll();
  }
}
