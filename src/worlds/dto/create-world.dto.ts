import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateWorldDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'Nome do mundo a ser criado.',
    example: 'Reino de Eldoria',
    maxLength: 100,
  })
  name: string;

  @IsString()
  @MaxLength(500)
  @ApiPropertyOptional({
    description: 'Descrição opcional do mundo.',
    example: 'Um universo medieval repleto de magia.',
    maxLength: 500,
  })
  description?: string;
}
