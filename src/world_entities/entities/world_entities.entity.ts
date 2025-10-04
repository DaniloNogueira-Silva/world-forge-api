import { User } from 'src/auth/entities/user.entity';
import { World } from 'src/worlds/entities/world.entity';
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
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: EntityType,
    })
    entity_type: EntityType;

    @Column({
        type: 'jsonb',
        nullable: false,
        default: {},
    })
    attributes: object;

    // --- Relações ---

    @ManyToOne(() => World, (world) => world.id, { onDelete: 'CASCADE' })

    @Column()
    worldId: string;

    // --- Timestamps ---

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.id)
    createdBy: User;
}