import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';

@Module({
  imports: [],
  providers: [EmailService],
  controllers: [],
  exports: [EmailService],
})
export default class AppSharedModule {}
