import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('worlds')
export class World {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identificador único do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Nome do mundo criado pelo usuário.',
    example: 'Reino de Eldoria',
  })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Descrição livre do mundo.',
    example: 'Um mundo de fantasia com dragões e magia.',
    required: false,
  })
  description: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Data de criação do mundo.',
    example: '2025-01-10T12:34:56.000Z',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Data da última atualização do mundo.',
    example: '2025-01-12T09:30:00.000Z',
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.worlds, { eager: false })
  @ApiProperty({
    description: 'Usuário proprietário do mundo.',
    type: () => User,
  })
  user: User;

  @Column()
  @ApiProperty({
    description: 'Identificador do usuário proprietário.',
    example: '1c5b5e4a-8e6c-4f05-8c8e-9c2790f421c5',
  })
  userId: string;
}
