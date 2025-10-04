import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { CreateEntityDto } from './dto/create-entity.dto';
import { EntitiesService } from './world_entities.service';

@Controller('worlds/:worldId/entities')
@UseGuards(AuthGuard())
export class EntitiesController {
    constructor(private readonly entitiesService: EntitiesService) { }

    @Post()
    create(
        @Param('worldId') worldId: string,
        @Body() createEntityDto: CreateEntityDto,
        @GetUser() user: User,
    ) {
        return this.entitiesService.create(worldId, createEntityDto, user);
    }
}