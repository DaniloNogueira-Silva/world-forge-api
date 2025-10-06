import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { CreateWorldDto } from './dto/create-world.dto';
import { User } from '../auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('worlds')
@UseGuards(AuthGuard())
export class WorldsController {
  constructor(private readonly worldsService: WorldsService) {}

  @Post()
  async create(@Body() createWorldDto: CreateWorldDto, @GetUser() user: User) {
    return this.worldsService.create(createWorldDto, user);
  }

  @Get()
  async findUserWorlds(@GetUser() user: User) {
    return this.worldsService.findUserWorlds(user);
  }

  @Get(':id')
  async findOne(@GetUser() user: User, @Body() id: string) {
    return this.worldsService.findOne(id);
  }
}
