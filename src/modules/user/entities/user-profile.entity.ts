import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import CustomBaseEntity from '@base-classes/base.entity';
import { AutoMap } from '@automapper/classes';

@Entity('user_profile')
export class UserProfile extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    transformer: {
      to: (value: string) => value?.toLowerCase(),
      from: (value: string) => value,
    },
  })
  @AutoMap()
  firstName: string;

  @Column({
    type: 'varchar',
    transformer: {
      to: (value: string) => value?.toLowerCase(),
      from: (value: string) => value,
    },
  })
  @AutoMap()
  lastName: string;

  /** Role ID for this user. */
  @Column({ type: 'uuid', default: null })
  @AutoMap()
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
