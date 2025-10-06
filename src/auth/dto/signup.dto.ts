import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'Nome de exibição do usuário.',
    example: 'AventureiroCriativo',
    maxLength: 100,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email único do usuário.',
    example: 'usuario@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Senha utilizada para autenticação. Será armazenada como hash.',
    example: 'SenhaForte123!',
  })
  password: string;
}
