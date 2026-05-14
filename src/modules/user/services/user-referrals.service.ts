import { Injectable } from '@nestjs/common';
import { UserReferral } from '../entities/user-referrals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserReferralService {
  constructor(
    @InjectRepository(UserReferral)
    private readonly userReferralRepo: Repository<UserReferral>,
  ) {}

  async getUserReferrals(referredByUserId: string) {
    return await this.userReferralRepo.find({
      where: {
        referredByUserId,
      },
    });
  }

  async markReferralAsQualified(referredUserId: string) {
    return await this.userReferralRepo.update(
      { referredUserId, isQualified: false },
      {
        isQualified: true,
        qualifiedAt: new Date(),
      },
    );
  }
}
