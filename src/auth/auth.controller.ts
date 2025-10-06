import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { AuthTokenResponseDto } from './dto/auth-token-response.dto';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Criar um novo usuário.' })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso.',
    type: User,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Email informado já está cadastrado.',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos para criação de usuário.',
  })
  signUp(@Body() signUpDto: SignupDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Autenticar um usuário existente.' })
  @ApiOkResponse({
    description: 'Autenticação realizada com sucesso.',
    type: AuthTokenResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos para autenticação.' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
