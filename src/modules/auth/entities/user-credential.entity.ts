import { Column, Entity, OneToOne } from 'typeorm';
import CustomBaseEntity from '@base-classes/base.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity('user_credentials')
export class UserCredential extends CustomBaseEntity {
  @Column({
    type: 'varchar',
  })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  expiry: Date;

  @Column({ type: 'uuid', nullable: true, default: null })
  userId: string;

  @OneToOne(() => User, (user) => user.credential)
  user: User;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;
}
