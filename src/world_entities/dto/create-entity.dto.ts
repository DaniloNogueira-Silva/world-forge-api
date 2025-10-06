import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';
import { EntityType } from '../enums/entities_type.enum';

export class CreateEntityDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'Nome da entidade.',
    example: 'Rei Cedric',
    maxLength: 100,
  })
  name: string;

  @IsEnum(EntityType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tipo da entidade.',
    enum: EntityType,
    example: EntityType.CHARACTER,
  })
  entity_type: EntityType;

  @IsObject()
  @ApiProperty({
    description: 'Mapa de atributos personalizados que descrevem a entidade.',
    example: { origem: 'Capital', classe: 'Paladino' },
    type: 'object',
  })
  attributes: object;
}
