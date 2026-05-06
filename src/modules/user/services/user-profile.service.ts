import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { SetUserProfileDto } from '@requestable-dto/user/profile/set-user-profilt.dto';
import { UserService } from './user.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfile: Repository<UserProfile>,

    private readonly userService: UserService,
  ) {}

  async setProfile(payload: SetUserProfileDto, userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let profile = await this.userProfile.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      profile = this.userProfile.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        userId,
      });
    } else {
      profile.firstName = payload.firstName;
      profile.lastName = payload.lastName;
    }

    return await this.userProfile.save(profile);
  }

  async getProfileByUserId(userId: string) {
    const profile = await this.userProfile.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile not found for user with id ${userId}`,
      );
    }

    return profile;
  }
}
