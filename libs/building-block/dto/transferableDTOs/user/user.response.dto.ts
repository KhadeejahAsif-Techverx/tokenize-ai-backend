import { AutoMap } from '@automapper/classes';
import { UserRoleEnum } from '@enums/user/user.enum';
import { UserProfileResponseDto } from './profile/user-profile.response.dto';

export class UserResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  role: UserRoleEnum;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  emailVerified: boolean;

  @AutoMap(() => UserProfileResponseDto)
  profile: UserProfileResponseDto;
}
