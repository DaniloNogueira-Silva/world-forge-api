import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldsModule } from './worlds/worlds.module';
import { EntitiesModule } from './world_entities/world_entities.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),

        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,

        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    WorldsModule,

    EntitiesModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
