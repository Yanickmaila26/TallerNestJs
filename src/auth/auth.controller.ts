import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Usamos await porque el servicio ahora inserta en MySQL
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Usamos await porque el servicio busca en la base de datos
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // Aquí no hace falta async porque req.user ya viene cargado por el Guard
    return {
      message: 'Perfil obtenido exitosamente',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protectedRoute(@Request() req) {
    return {
      message: `¡Hola ${req.user.nombre}! Esta es una ruta protegida con MySQL.`,
      timestamp: new Date().toISOString(),
      userId: req.user.sub, // 'sub' es el ID que pusimos en el payload del JWT
    };
  }
}