import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { CreateEntityDto } from './dto/create-entity.dto';
import { EntitiesService } from './world_entities.service';
import { CreateRelationsDto, RemoveRelationDto } from './dto/relations.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { UpdateAttributesDto } from './dto/update-attributes.dto';

@Controller('worlds/:worldId/entities')
@UseGuards(AuthGuard())
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  create(
    @Param('worldId') worldId: string,
    @Body() createEntityDto: CreateEntityDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.create(worldId, createEntityDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.entitiesService.findAll(user);
  }

  @Post(':id/relations')
  addRelation(
    @Param('id') sourceEntityId: string,
    @Body() createRelationDto: CreateRelationsDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.addRelation(
      sourceEntityId,
      createRelationDto,
      user,
    );
  }

  @Delete(':id/relations')
  removeRelation(
    @Param('id') sourceEntityId: string,
    @Body() removeRelationDto: RemoveRelationDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.removeRelation(
      sourceEntityId,
      removeRelationDto,
      user,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.update(id, updateEntityDto, user);
  }

  @Patch(':id/attributes')
  updateAttributes(
    @Param('id') id: string,
    @Body() updateAttributesDto: UpdateAttributesDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.updateAttributes(id, updateAttributesDto, user);
  }
}
