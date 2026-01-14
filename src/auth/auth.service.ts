import {
    Injectable,
    ConflictException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    async register(registerDto: RegisterDto) {
        const { email, password, nombre } = registerDto;
        const userExists = this.usersService.findByEmail(email);
        if (userExists) {
            throw new ConflictException('El email ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.usersService.create({
            nombre,
            email,
            password: hashedPassword,
        });
        const { password: _, ...result } = newUser;
        return {
            message: 'Usuario registrado exitosamente',
            user: result,
        };
    }
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            nombre: user.nombre
        };
        return {
            message: 'Login exitoso',
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
            },
        };
    }
    getProfile(userId: number) {
        const user = this.usersService.findById(userId);
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }
        const { password, ...result } = user;
        return result;
    }
}