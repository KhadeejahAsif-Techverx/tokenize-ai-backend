import { AutoMap } from '@automapper/classes';

export class PatentResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  description: string;
}
