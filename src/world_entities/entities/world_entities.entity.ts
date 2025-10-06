import { User } from '../../auth/entities/user.entity';
import { World } from '../../worlds/entities/world.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityType } from '../enums/entities_type.enum';

@Entity('entities')
export class WorldEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identificador único da entidade.',
    example: 'e5f8d2c1-3f34-45d2-b9e4-6c8c5edbc9f3',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Nome da entidade dentro do mundo.',
    example: 'Sir Alistair',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: EntityType,
  })
  @ApiProperty({
    description: 'Tipo categórico da entidade.',
    enum: EntityType,
    example: EntityType.CHARACTER,
  })
  entity_type: EntityType;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: {},
  })
  @ApiProperty({
    description: 'Mapa de atributos personalizados da entidade.',
    example: { idade: '35', classe: 'Guerreiro' },
    type: 'object',
  })
  attributes: object;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: {},
  })
  @ApiProperty({
    description: 'Mapa de relações da entidade, organizado por tipo.',
    example: { aliado: ['2f1c0b4a-d8a2-44f2-bcf9-2c7f4a1d8c21'] },
    type: 'object',
  })
  relations: object;

  // --- Relações ---

  @ManyToOne(() => World, (world) => world.id, { onDelete: 'CASCADE' })
  @ApiProperty({
    description: 'Mundo ao qual a entidade pertence.',
    type: () => World,
  })
  @Column()
  @ApiProperty({
    description: 'Identificador do mundo ao qual a entidade pertence.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  worldId: string;

  // --- Timestamps ---

  @CreateDateColumn()
  @ApiProperty({
    description: 'Data de criação da entidade.',
    example: '2025-01-11T15:20:10.000Z',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Data da última atualização da entidade.',
    example: '2025-01-12T10:05:45.000Z',
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @ApiProperty({
    description: 'Usuário que criou a entidade.',
    type: () => User,
  })
  @Column()
  @ApiProperty({
    description: 'Identificador do usuário criador da entidade.',
    example: '1c5b5e4a-8e6c-4f05-8c8e-9c2790f421c5',
  })
  createdBy: string;
}
