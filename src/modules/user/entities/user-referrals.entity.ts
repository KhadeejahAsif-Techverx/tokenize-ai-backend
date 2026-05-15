import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import CustomBaseEntity from '@base-classes/base.entity';
import { AutoMap } from '@automapper/classes';

@Entity('user_referrals')
export class UserReferral extends CustomBaseEntity {
  /**
   * The newly registered investor (referred user)
   */
  @Column({ type: 'uuid' })
  @AutoMap()
  referredUserId: string;

  /**
   * Relation → Referred user (new signup)
   */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referred_user_id' })
  referredUser: User;

  /**
   * The investor who referred this user
   */
  @Column({ type: 'uuid' })
  @AutoMap()
  referredByUserId: string;

  /**
   * Relation → Referrer (existing investor)
   */
  @ManyToOne(() => User, (user) => user.sentReferrals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referred_by_user_id' })
  referredByUser: User;

  /**
   * Whether referral is qualified.
   * Becomes true after:
   * - referred user completes KYC
   */
  @Column({ type: 'boolean', default: false })
  @AutoMap()
  isQualified: boolean;

  /**
   * Timestamp when referral was qualified (KYC passed)
   */
  @Column({ type: 'timestamp', nullable: true })
  @AutoMap()
  qualifiedAt: Date | null;
}
