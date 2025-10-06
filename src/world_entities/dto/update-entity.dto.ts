import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

const ENTITY_TYPES = [
  'CHARACTER',
  'LOCATION',
  'ITEM',
  'ORGANIZATION',
  'FACTION',
];

export class UpdateEntityDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Novo nome da entidade.',
    example: 'Sir Alistair II',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @IsIn(ENTITY_TYPES)
  @ApiPropertyOptional({
    description: 'Novo tipo categórico da entidade.',
    enum: ENTITY_TYPES,
    example: 'LOCATION',
  })
  entity_type?: string;
}
