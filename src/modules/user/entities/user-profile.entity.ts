import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import CustomBaseEntity from '@base-classes/base.entity';

@Entity('user_profile')
export class UserProfile extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    transformer: {
      to: (value: string) => value?.toLowerCase(),
      from: (value: string) => value,
    },
  })
  firstName: string;

  @Column({
    type: 'varchar',
    transformer: {
      to: (value: string) => value?.toLowerCase(),
      from: (value: string) => value,
    },
  })
  lastName: string;

  /** Role ID for this user. */
  @Column({ type: 'uuid', default: null })
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
