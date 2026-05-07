import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import CustomBaseEntity from '@base-classes/base.entity';
import { UserCredential } from '@modules/auth/entities/user-credential.entity';
import { AutoMap } from '@automapper/classes';
import { UserProfileResponseDto } from '@transferable-dto/user/profile/user-profile.response.dto';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
    length: 320,
    transformer: {
      to: (value: string) => value?.toLowerCase(),
      from: (value: string) => value,
    },
  })
  @AutoMap()
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    eager: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @AutoMap(() => UserProfileResponseDto)
  profile: UserProfile;

  @OneToOne(() => UserCredential, (credential) => credential.user, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  credential: UserCredential;

  /** Whether the user account is active. */
  @Column({ type: 'boolean', default: true })
  @AutoMap()
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  @AutoMap()
  emailVerified: boolean;
}
