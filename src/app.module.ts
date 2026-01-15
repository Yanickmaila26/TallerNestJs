import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      // Usuario por defecto de Laragon
      password: '',          // Password por defecto de Laragon (vacío)
      database: 'auth_taller', // Crea esta base de datos en Laragon/HeidiSQL
      entities: [User],
      synchronize: true,     // Crea las tablas automáticamente (solo para desarrollo)
    }), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
