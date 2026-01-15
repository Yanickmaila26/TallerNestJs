import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // POST /users - Para crear un usuario directamente si fuera necesario
  @Post()
  async create(@Body() createUserDto: any) {
    return await this.usersService.create(createUserDto);
  }

  // GET /users - Protegido: Solo usuarios con JWT pueden ver la lista
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  // GET /users/:id - Protegido: Busca un usuario por su ID numérico
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findById(+id);
  }
}