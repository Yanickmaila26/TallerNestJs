import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy, JWT_SECRET } from './strategies/jwt.strategy';

@Module({
  imports: [
    // 1. Conectamos con el módulo de usuarios para buscar cuentas
    UsersModule,
    // 2. Registramos Passport para usar estrategias de autenticación
    PassportModule,
    // 3. Configuramos el motor de JWT
    JwtModule.register({
      secret: JWT_SECRET, // La misma clave de la estrategia
      signOptions: { expiresIn: '24h' }, // El token durará un día
    }),
  ],
  controllers: [AuthController],
  // 4. Agregamos JwtStrategy como proveedor para que Nest pueda usarlo
  providers: [AuthService, JwtStrategy],
  // 5. Exportamos JwtModule por si otros módulos necesitan validar tokens
  exports: [JwtModule],
})
export class AuthModule { }