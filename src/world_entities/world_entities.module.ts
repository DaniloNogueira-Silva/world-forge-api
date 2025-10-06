import { Module } from '@nestjs/common';
import { EntitiesController } from './world_entities.controller';
import { EntitiesService } from './world_entities.service';
import { AuthModule } from '../auth/auth.module';
import { WorldEntity } from './entities/world_entities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { World } from '../worlds/entities/world.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorldEntity, World]), AuthModule],
  controllers: [EntitiesController],
  providers: [EntitiesService]
})
export class EntitiesModule { }
