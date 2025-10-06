import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './dto/create-entity.dto';
import { User } from '../auth/entities/user.entity';
import { World } from '../worlds/entities/world.entity';
import { WorldEntity } from './entities/world_entities.entity';
import { CreateRelationsDto, RemoveRelationDto } from './dto/relations.dto';
import { UpdateAttributesDto } from './dto/update-attributes.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(WorldEntity)
    private readonly entityRepository: Repository<WorldEntity>,
    @InjectRepository(World)
    private readonly worldRepository: Repository<World>,
  ) {}

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
      attributes: attributes,
      worldId: world.id,
      createdBy: user.id,
    });

    await this.entityRepository.save(entity);
    return entity;
  }

  async findAll(worldId: string, user: User): Promise<WorldEntity[] | []> {
    const world = await this.worldRepository.findOne({
      where: { id: worldId, userId: user.id },
    });

    if (!world) {
      throw new UnauthorizedException('You do not own this world.');
    }

    return this.entityRepository.find({
      where: { createdBy: user.id, worldId: world.id },
    });
  }

  async addRelation(
    sourceEntityId: string,
    createRelationDto: CreateRelationsDto,
    user: User,
  ): Promise<WorldEntity> {
    const { type, targetEntityId } = createRelationDto;

    if (sourceEntityId === targetEntityId) {
      throw new BadRequestException(
        'An entity cannot have a relation to itself.',
      );
    }

    const [sourceEntity, targetEntity] = await Promise.all([
      this.entityRepository.findOneBy({ id: sourceEntityId }),
      this.entityRepository.findOneBy({ id: targetEntityId }),
    ]);

    if (!sourceEntity)
      throw new NotFoundException(
        `Source entity with ID ${sourceEntityId} not found.`,
      );
    if (!targetEntity)
      throw new NotFoundException(
        `Target entity with ID ${targetEntityId} not found.`,
      );

    if (sourceEntity.createdBy !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to modify this entity.',
      );
    }

    const currentRelations = sourceEntity.relations || {};

    const relationsArray: string[] = currentRelations[type] || [];

    if (relationsArray.includes(targetEntityId)) {
      return sourceEntity;
    }

    relationsArray.push(targetEntityId);
    currentRelations[type] = relationsArray;

    sourceEntity.relations = currentRelations;
    return this.entityRepository.save(sourceEntity);
  }

  async removeRelation(
    sourceEntityId: string,
    removeRelationDto: RemoveRelationDto,
    user: User,
  ): Promise<WorldEntity> {
    const { type, targetEntityId } = removeRelationDto;

    const sourceEntity = await this.entityRepository.findOneBy({
      id: sourceEntityId,
    });
    if (!sourceEntity)
      throw new NotFoundException(
        `Entity with ID ${sourceEntityId} not found.`,
      );
    if (sourceEntity.createdBy !== user.id)
      throw new UnauthorizedException(
        'You do not have permission to modify this entity.',
      );

    if (!sourceEntity.relations || !sourceEntity.relations[type]) {
      throw new NotFoundException(
        `Relation of type '${type}' does not exist on this entity.`,
      );
    }

    const relationsArray: string[] = sourceEntity.relations[type];

    if (!relationsArray.includes(targetEntityId)) {
      throw new NotFoundException(
        `Entity ${sourceEntityId} does not have a '${type}' relation with entity ${targetEntityId}.`,
      );
    }

    const updatedArray = relationsArray.filter((id) => id !== targetEntityId);

    if (updatedArray.length > 0) {
      sourceEntity.relations[type] = updatedArray;
    } else {
      delete sourceEntity.relations[type];
    }

    return this.entityRepository.save(sourceEntity);
  }

  async updateAttributes(
    entityId: string,
    updateAttributesDto: UpdateAttributesDto,
    user: User,
  ): Promise<WorldEntity> {
    const entity = await this.entityRepository.findOneBy({ id: entityId });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${entityId} not found.`);
    }
    if (entity.createdBy !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to modify this entity.',
      );
    }

    entity.attributes = updateAttributesDto.attributes;

    return this.entityRepository.save(entity);
  }

  async update(
    entityId: string,
    updateEntityDto: UpdateEntityDto,
    user: User,
  ): Promise<WorldEntity> {
    const entity = await this.entityRepository.findOneBy({ id: entityId });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${entityId} not found.`);
    }
    if (entity.createdBy !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to modify this entity.',
      );
    }

    Object.assign(entity, updateEntityDto);

    return this.entityRepository.save(entity);
  }
}
