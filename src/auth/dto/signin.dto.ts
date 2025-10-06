import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email utilizado no cadastro do usuário.',
    example: 'usuario@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description:
      'Senha em texto puro que será validada contra o hash armazenado.',
    example: 'SenhaForte123!',
  })
  password: string;
}
