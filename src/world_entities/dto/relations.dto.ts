import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RelationsType } from '../enums/relations_type.enum';

export class CreateRelationsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Identificador da entidade alvo da relação.',
    example: '2f1c0b4a-d8a2-44f2-bcf9-2c7f4a1d8c21',
  })
  targetEntityId: string;

  @IsEnum(RelationsType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tipo da relação entre as entidades.',
    enum: RelationsType,
    example: RelationsType.ALLY,
  })
  type: RelationsType;
}

export class RemoveRelationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tipo da relação a ser removida.',
    example: 'ALLY',
  })
  type: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Identificador da entidade alvo que deve ser desvinculada.',
    example: '2f1c0b4a-d8a2-44f2-bcf9-2c7f4a1d8c21',
  })
  targetEntityId: string;
}
