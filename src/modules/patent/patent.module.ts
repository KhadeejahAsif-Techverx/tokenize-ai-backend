import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patent } from './entities/patent.entity';
import { PatentService } from './services/patent.service';
import { PatentController } from './controllers/patent.controller';
import AuthModule from '@modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patent]), AuthModule],
  providers: [PatentService],
  exports: [PatentService],
  controllers: [PatentController],
})
export class PatentModule {}
