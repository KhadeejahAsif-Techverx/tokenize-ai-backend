import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserReferralService } from '../services/user-referrals.service';

@ApiTags('User Referrals')
@Controller('user-referrals')
export class UserReferralController {
  constructor(private readonly userReferralService: UserReferralService) {}

  /**
   * Get all referrals made by a specific user (referrer)
   */
  @Get(':userId')
  @ApiOperation({
    summary: 'Get user referrals',
    description: 'Retrieves all referrals created by a specific user',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the referrer user',
    required: true,
  })
  async getUserReferrals(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return await this.userReferralService.getUserReferrals(userId);
  }

  /**
   * Mark referral as qualified (called after KYC approval)
   */
  @Patch('qualify/:referredUserId')
  @ApiOperation({
    summary: 'Mark referral as qualified',
    description:
      'Marks a referral as qualified after the referred user completes KYC',
  })
  @ApiParam({
    name: 'referredUserId',
    description: 'The ID of the referred user',
    required: true,
  })
  async markReferralAsQualified(
    @Param('referredUserId', new ParseUUIDPipe())
    referredUserId: string,
  ) {
    return await this.userReferralService.markReferralAsQualified(
      referredUserId,
    );
  }
}
