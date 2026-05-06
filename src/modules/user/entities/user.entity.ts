import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import CustomBaseEntity from '@base-classes/base.entity';
import { UserCredential } from '@modules/auth/entities/user-credential.entity';

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
  @JoinColumn()
  profile: UserProfile;

  @OneToOne(() => UserCredential, (credential) => credential.user, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  credential: UserCredential;

  /** Whether the user account is active. */
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
