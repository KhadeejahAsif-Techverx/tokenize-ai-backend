import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserProfile } from './entities/user-profile.entity';
import { UserController } from './controllers/user.controller';
import { UserProfileController } from './controllers/user-profile.controller';
import { UserProfileService } from './services/user-profile.service';
import AuthModule from '@modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService, UserProfileService],
  exports: [UserService, UserProfileService],
  controllers: [UserController, UserProfileController],
})
export class UserModule {}
