import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  /**
   * POST /auth/register
   * Ruta pública para crear nuevos usuarios
   */
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  /**
   * POST /auth/login
   * Ruta pública que devuelve el JWT si las credenciales son correctas
   */
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  /**
   * GET /auth/profile
   * Ruta PROTEGIDA - El Guard verifica el token antes de entrar
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // req.user fue inyectado automáticamente por la JwtStrategy
    return {
      message: 'Perfil obtenido exitosamente',
      user: req.user,
    };
  }
  /**
   * GET /auth/protected
   * Ejemplo de otra ruta protegida para pruebas
   */
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protectedRoute(@Request() req) {
    return {
      message: `¡Hola ${req.user.nombre}! Esta es una ruta protegida.`,
      timestamp: new Date().toISOString(),
      userId: req.user.userId,
    };
  }
}