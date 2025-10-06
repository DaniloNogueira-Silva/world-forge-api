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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { WorldEntity } from './entities/world_entities.entity';

@Controller('worlds/:worldId/entities')
@UseGuards(AuthGuard())
@ApiTags('Entidades')
@ApiBearerAuth('JWT-auth')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova entidade dentro de um mundo.' })
  @ApiParam({
    name: 'worldId',
    description: 'Identificador do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  @ApiCreatedResponse({
    description: 'Entidade criada com sucesso.',
    type: WorldEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido ou mundo não pertence ao usuário.',
  })
  create(
    @Param('worldId') worldId: string,
    @Body() createEntityDto: CreateEntityDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.create(worldId, createEntityDto, user);
  }

  @Get()
  @ApiOperation({
    summary:
      'Listar todas as entidades criadas pelo usuário para um mundo específico.',
  })
  @ApiParam({
    name: 'worldId',
    description: 'Identificador do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  @ApiOkResponse({
    description: 'Lista de entidades retornada com sucesso.',
    type: WorldEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido ou mundo não pertence ao usuário.',
  })
  findAll(@Param('worldId') worldId: string, @GetUser() user: User) {
    return this.entitiesService.findAll(worldId, user);
  }

  @Post(':id/relations')
  @ApiOperation({ summary: 'Adicionar uma relação entre entidades.' })
  @ApiParam({
    name: 'worldId',
    description: 'Identificador do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador da entidade de origem.',
    example: 'e5f8d2c1-3f34-45d2-b9e4-6c8c5edbc9f3',
  })
  @ApiOkResponse({
    description: 'Relação criada ou já existente.',
    type: WorldEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Requisição inválida. Uma entidade não pode se relacionar consigo mesma.',
  })
  @ApiNotFoundResponse({
    description: 'Entidade de origem ou destino não encontrada.',
  })
  @ApiUnauthorizedResponse({
    description: 'Usuário não possui permissão para alterar a entidade.',
  })
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
  @ApiOperation({ summary: 'Remover uma relação existente de uma entidade.' })
  @ApiParam({
    name: 'worldId',
    description: 'Identificador do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador da entidade de origem.',
    example: 'e5f8d2c1-3f34-45d2-b9e4-6c8c5edbc9f3',
  })
  @ApiOkResponse({
    description: 'Relação removida com sucesso.',
    type: WorldEntity,
  })
  @ApiNotFoundResponse({ description: 'Entidade ou relação não encontrada.' })
  @ApiUnauthorizedResponse({
    description: 'Usuário não possui permissão para alterar a entidade.',
  })
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
  @ApiOperation({ summary: 'Atualizar dados básicos de uma entidade.' })
  @ApiParam({
    name: 'worldId',
    description: 'Identificador do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador da entidade.',
    example: 'e5f8d2c1-3f34-45d2-b9e4-6c8c5edbc9f3',
  })
  @ApiOkResponse({
    description: 'Entidade atualizada com sucesso.',
    type: WorldEntity,
  })
  @ApiNotFoundResponse({ description: 'Entidade não encontrada.' })
  @ApiUnauthorizedResponse({
    description: 'Usuário não possui permissão para alterar a entidade.',
  })
  update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.update(id, updateEntityDto, user);
  }

  @Patch(':id/attributes')
  @ApiOperation({
    summary: 'Substituir o conjunto de atributos de uma entidade.',
  })
  @ApiParam({
    name: 'worldId',
    description: 'Identificador do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador da entidade.',
    example: 'e5f8d2c1-3f34-45d2-b9e4-6c8c5edbc9f3',
  })
  @ApiOkResponse({
    description: 'Atributos atualizados com sucesso.',
    type: WorldEntity,
  })
  @ApiNotFoundResponse({ description: 'Entidade não encontrada.' })
  @ApiUnauthorizedResponse({
    description: 'Usuário não possui permissão para alterar a entidade.',
  })
  updateAttributes(
    @Param('id') id: string,
    @Body() updateAttributesDto: UpdateAttributesDto,
    @GetUser() user: User,
  ) {
    return this.entitiesService.updateAttributes(id, updateAttributesDto, user);
  }
}
