import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@requestable-dto/user/create-user.dto';
import { Public } from '../decorators';
import { LoginDto } from '@requestable-dto/auth/login.dto';
import { EmailDto } from '@requestable-dto/common/email.dto';
import { ResetPasswordDto } from '@requestable-dto/auth/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with email and password, returns JWT token',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Login credentials',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @Public()
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user with email and password',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User registration details',
  })
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({
    summary: 'Forgot password',
    description: 'Initiate the forgot password process for a user',
  })
  @ApiBody({
    type: EmailDto,
    description: 'User email for password reset',
  })
  async forgotPassword(@Body() payload: EmailDto) {
    return await this.authService.forgotPassword(payload.email);
  }

  @Patch('reset-password')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({
    summary: 'Reset password',
    description: 'Reset password using token and new password',
  })
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Reset password payload',
  })
  async resetPassword(
    @Body() payload: ResetPasswordDto,
  ): Promise<{ message: string; success: boolean }> {
    const response = await this.authService.resetPassword(payload);

    if (response) {
      return { message: 'Password reset successfully', success: true };
    }

    return { message: 'Password reset failed', success: false };
  }
}
