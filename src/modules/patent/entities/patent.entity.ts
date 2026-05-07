import { Column, Entity } from 'typeorm';
import CustomBaseEntity from '@base-classes/base.entity';
import { AutoMap } from '@automapper/classes';
import { PatentStatusEnum } from '@enums/patent/patent.enum';

@Entity('patents')
export class Patent extends CustomBaseEntity {
  @Column({
    type: 'text',
    unique: true,
    transformer: {
      to: (value: string) => value?.trim()?.toLowerCase(),
      from: (value: string) => value,
    },
  })
  @AutoMap()
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  @AutoMap()
  description: string;

  @Column({ type: 'boolean', default: true })
  @AutoMap()
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: PatentStatusEnum,
    default: PatentStatusEnum.DRAFT,
  })
  @AutoMap()
  status: PatentStatusEnum;

  // how many tokens a company must lock to get a license on this patent
  @Column({ type: 'bigint', default: 0 })
  @AutoMap()
  tokenRequirement: string; // bigint comes back as string in TypeORM — parse in service

  // max companies that can hold a license on this patent simultaneously
  @Column({ type: 'int', default: 1 })
  @AutoMap()
  maxLicensees: number;
}
