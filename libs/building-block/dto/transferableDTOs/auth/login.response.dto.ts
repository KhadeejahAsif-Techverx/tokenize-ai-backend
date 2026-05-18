import { AutoMap } from '@automapper/classes';
import { UserRoleEnum } from '@enums/user/user.enum';
import { UserProfileResponseDto } from '@transferable-dto/user/profile/user-profile.response.dto';

export class LoginResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  role: UserRoleEnum;

  @AutoMap(() => UserProfileResponseDto)
  profile: UserProfileResponseDto;
}
