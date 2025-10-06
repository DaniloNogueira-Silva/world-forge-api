import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateAttributesDto {
  @IsObject()
  @ApiProperty({
    description:
      'Mapa completo de atributos que substituirá os valores atuais.',
    example: { alinhamento: 'Neutro', arma: 'Espada Longa' },
    type: 'object',
  })
  attributes: Record<string, string>;
}
