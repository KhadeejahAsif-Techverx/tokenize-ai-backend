import { AutoMap } from '@automapper/classes';
import { UserProfileResponseDto } from '@transferable-dto/user/profile/user-profile.response.dto';

export class LoginResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap(() => UserProfileResponseDto)
  profile: UserProfileResponseDto;
}
