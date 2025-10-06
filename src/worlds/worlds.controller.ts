import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { CreateWorldDto } from './dto/create-world.dto';
import { User } from '../auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { World } from './entities/world.entity';

@Controller('worlds')
@UseGuards(AuthGuard())
@ApiTags('Mundos')
@ApiBearerAuth('JWT-auth')
export class WorldsController {
  constructor(private readonly worldsService: WorldsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo mundo.' })
  @ApiCreatedResponse({ description: 'Mundo criado com sucesso.', type: World })
  @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido.' })
  async create(@Body() createWorldDto: CreateWorldDto, @GetUser() user: User) {
    return this.worldsService.create(createWorldDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar mundos do usuário autenticado.' })
  @ApiOkResponse({
    description: 'Lista de mundos carregada com sucesso.',
    type: World,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido.' })
  async findUserWorlds(@GetUser() user: User) {
    return this.worldsService.findUserWorlds(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar detalhes de um mundo pelo identificador.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do mundo.',
    example: 'b7f1e7ff-56f5-4f70-a37b-1b5cd615dd7f',
  })
  @ApiOkResponse({ description: 'Mundo encontrado com sucesso.', type: World })
  @ApiNotFoundResponse({ description: 'Mundo não encontrado.' })
  @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido.' })
  async findOne(@GetUser() user: User, @Param('id') id: string) {
    return this.worldsService.findOne(id, user);
  }
}
