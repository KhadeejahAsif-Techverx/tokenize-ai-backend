import { AutoMap } from '@automapper/classes';

export class UserProfileResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  userId: string;
}
