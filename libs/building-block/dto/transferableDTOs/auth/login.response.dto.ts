import { AutoMap } from '@automapper/classes';

export class LoginResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;
}
