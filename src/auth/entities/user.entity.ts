import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { World } from '../../worlds/entities/world.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identificador único do usuário.',
    example: '1c5b5e4a-8e6c-4f05-8c8e-9c2790f421c5',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Email único utilizado para login.',
    example: 'usuario@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'Nome de exibição do usuário.',
    example: 'AventureiroCriativo',
  })
  username: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password_hash: string;

  @OneToMany(() => World, (world) => world.user)
  @ApiProperty({
    description: 'Mundos criados pelo usuário.',
    type: () => World,
    isArray: true,
    required: false,
  })
  worlds: World[];

  @CreateDateColumn()
  @ApiProperty({
    description: 'Data de criação do registro.',
    example: '2025-01-10T12:34:56.000Z',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Data da última atualização do registro.',
    example: '2025-01-12T08:15:30.000Z',
  })
  updated_at: Date;
}
