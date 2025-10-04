import { Module } from '@nestjs/common';
import { WorldsController } from './worlds.controller';
import { WorldsService } from './worlds.service';
import { World } from './entities/world.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([World]), AuthModule],
  controllers: [WorldsController],
  providers: [WorldsService]
})
export class WorldsModule { }
