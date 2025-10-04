import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { World } from './entities/world.entity';
import { CreateWorldDto } from './dto/create-world.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class WorldsService {
    constructor(
        @InjectRepository(World)
        private readonly worldRepository: Repository<World>,
    ) { }

    async create(createWorldDto: CreateWorldDto, user: User): Promise<World> {
        const world = this.worldRepository.create({
            ...createWorldDto,
            user,
        });

        await this.worldRepository.save(world);
        return world;
    }

    async findUserWorlds(user: User): Promise<World[]> {
        return this.worldRepository.find({
            where: {
                userId: user.id,
            },
        });
    }
}