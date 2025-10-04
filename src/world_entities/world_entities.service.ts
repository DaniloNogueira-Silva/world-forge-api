import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './dto/create-entity.dto';
import { User } from '../auth/entities/user.entity';
import { World } from '../worlds/entities/world.entity';
import { WorldEntity } from './entities/world_entities.entity';

@Injectable()
export class EntitiesService {
    constructor(
        @InjectRepository(WorldEntity)
        private readonly entityRepository: Repository<WorldEntity>,
        @InjectRepository(World) // Precisamos verificar a posse do mundo
        private readonly worldRepository: Repository<World>,
    ) { }

    async create(
        worldId: string,
        createEntityDto: CreateEntityDto,
        user: User,
    ): Promise<WorldEntity> {
        const world = await this.worldRepository.findOne({
            where: { id: worldId, userId: user.id },
        });

        if (!world) {
            throw new UnauthorizedException('You do not own this world.');
        }

        const { name, entity_type, attributes } = createEntityDto;

        const entity = this.entityRepository.create({
            name,
            entity_type,
            attributes: attributes, // Convertemos a string JSON para um objeto
            worldId: world.id,
        });

        await this.entityRepository.save(entity);
        return entity;
    }

}