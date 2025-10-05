import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './dto/create-entity.dto';
import { User } from '../auth/entities/user.entity';
import { World } from '../worlds/entities/world.entity';
import { WorldEntity } from './entities/world_entities.entity';
import { CreateRelationsDto, RemoveRelationDto } from './dto/relations.dto';

@Injectable()
export class EntitiesService {
    constructor(
        @InjectRepository(WorldEntity)
        private readonly entityRepository: Repository<WorldEntity>,
        @InjectRepository(World)
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
            attributes: attributes,
            worldId: world.id,
            createdBy: user.id,
        });

        await this.entityRepository.save(entity);
        return entity;
    }

    async findAll(user: User): Promise<WorldEntity[] | []> {
        return this.entityRepository.find({ where: { createdBy: user.id } });
    }

    /**
     * Adiciona uma relação a uma entidade.
     * Agora suporta múltiplas relações do mesmo tipo.
     */
    async addRelation(
        sourceEntityId: string,
        createRelationDto: CreateRelationsDto,
        user: User,
    ): Promise<WorldEntity> {
        const { type, targetEntityId } = createRelationDto;

        // Validação básica: uma entidade não pode se relacionar consigo mesma.
        if (sourceEntityId === targetEntityId) {
            throw new BadRequestException('An entity cannot have a relation to itself.');
        }

        // 1. Busca ambas as entidades e verifica a posse da entidade de origem
        const [sourceEntity, targetEntity] = await Promise.all([
            this.entityRepository.findOneBy({ id: sourceEntityId }),
            this.entityRepository.findOneBy({ id: targetEntityId }),
        ]);

        if (!sourceEntity) throw new NotFoundException(`Source entity with ID ${sourceEntityId} not found.`);
        if (!targetEntity) throw new NotFoundException(`Target entity with ID ${targetEntityId} not found.`);

        if (sourceEntity.createdBy !== user.id) {
            throw new UnauthorizedException('You do not have permission to modify this entity.');
        }

        // 2. Prepara o objeto de relações
        const currentRelations = sourceEntity.relations || {};

        // 3. Pega o array existente ou cria um novo se for a primeira relação desse tipo
        const relationsArray: string[] = currentRelations[type] || [];

        // 4. VERIFICA se a relação já existe para não duplicar
        if (relationsArray.includes(targetEntityId)) {
            // A relação já existe, não há nada a fazer. Retorna a entidade como está.
            return sourceEntity;
        }

        // 5. ADICIONA o novo ID ao array
        relationsArray.push(targetEntityId);
        currentRelations[type] = relationsArray;

        // 6. Salva a entidade atualizada
        sourceEntity.relations = currentRelations;
        return this.entityRepository.save(sourceEntity);
    }

    /**
     * Remove uma relação específica de uma entidade.
     */
    async removeRelation(
        sourceEntityId: string,
        removeRelationDto: RemoveRelationDto,
        user: User,
    ): Promise<WorldEntity> {
        const { type, targetEntityId } = removeRelationDto;

        // 1. Busca a entidade e verifica a posse
        const sourceEntity = await this.entityRepository.findOneBy({ id: sourceEntityId });
        if (!sourceEntity) throw new NotFoundException(`Entity with ID ${sourceEntityId} not found.`);
        if (sourceEntity.createdBy !== user.id) throw new UnauthorizedException('You do not have permission to modify this entity.');

        // 2. Verifica se o objeto de relações e o tipo específico existem
        if (!sourceEntity.relations || !sourceEntity.relations[type]) {
            throw new NotFoundException(`Relation of type '${type}' does not exist on this entity.`);
        }

        const relationsArray: string[] = sourceEntity.relations[type];

        // 3. Verifica se o ID a ser removido está de fato no array
        if (!relationsArray.includes(targetEntityId)) {
            throw new NotFoundException(`Entity ${sourceEntityId} does not have a '${type}' relation with entity ${targetEntityId}.`);
        }

        // 4. REMOVE o ID do array usando `filter`
        const updatedArray = relationsArray.filter(id => id !== targetEntityId);

        // 5. Atualiza o objeto de relações
        if (updatedArray.length > 0) {
            // Se o array ainda tiver itens, atualiza-o
            sourceEntity.relations[type] = updatedArray;
        } else {
            // Se o array ficou vazio, remove a chave (ex: "INIMIGO") completamente para manter o JSON limpo
            delete sourceEntity.relations[type];
        }

        // 6. Salva a entidade
        return this.entityRepository.save(sourceEntity);
    }

}