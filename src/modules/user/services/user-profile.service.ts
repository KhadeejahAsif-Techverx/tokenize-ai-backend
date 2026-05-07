import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { SetUserProfileDto } from '@requestable-dto/user/profile/set-user-profilt.dto';
import { UserService } from './user.service';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { UserProfileResponseDto } from '@transferable-dto/user/profile/user-profile.response.dto';

@Injectable()
export class UserProfileService extends AutomapperProfile {
  constructor(
    @InjectMapper() readonly mapper: Mapper,

    @InjectRepository(UserProfile)
    private readonly userProfile: Repository<UserProfile>,

    private readonly userService: UserService,
  ) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UserProfile, UserProfileResponseDto);
    };
  }

  async setProfile(payload: SetUserProfileDto, userId: string) {
    await this.userService.findById(userId);

    let profile = await this.userProfile.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      profile = this.userProfile.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        contact: payload.contact,
        country: payload.country,
        userId,
      });
    } else {
      profile.firstName = payload.firstName;
      profile.lastName = payload.lastName;
      profile.contact = payload.contact;
      profile.country = payload.country;
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

    // Order: (source, SourceClass, DestinationClass)
    const mappedUser = this.mapper.map(
      profile,
      UserProfile,
      UserProfileResponseDto,
    );

    return mappedUser;
  }
}
