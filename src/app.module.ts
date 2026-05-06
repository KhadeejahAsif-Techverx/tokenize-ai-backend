import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../config/index';
import { UserModule } from '@modules/user/user.module';
import AuditSubscriber from '@interceptors/audit.subscriber';
import AuthModule from '@modules/auth/auth.module';

// import { classes } from '@automapper/classes';
// import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [
    // AutomapperModule.forRoot({
    //   strategyInitializer: classes(),
    // }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      load: [appConfig],
    }),

    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.get('database'),
        };
      },
    }),

    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AuditSubscriber],
})
export class AppModule {}
