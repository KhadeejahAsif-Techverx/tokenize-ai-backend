import { IntersectionType } from '@nestjs/mapped-types';
import { EmailDto } from '@requestable-dto/common/email.dto';
import { PasswordDto } from '@requestable-dto/common/password.dto';

export class LoginDto extends IntersectionType(EmailDto, PasswordDto) {}
