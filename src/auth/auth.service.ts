import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
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

        // AGREGADO AWAIT: userExists ahora será el objeto o null, no una promesa
        const userExists = await this.usersService.findByEmail(email);
        if (userExists) {
            throw new ConflictException('El email ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // AGREGADO AWAIT
        const newUser = await this.usersService.create({
            nombre,
            email,
            password: hashedPassword,
        });

        const { password: _, ...result } = newUser;
        return { message: 'Usuario registrado exitosamente', user: result };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // AGREGADO AWAIT
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');

        const payload = { sub: user.id, email: user.email, nombre: user.nombre };

        return {
            message: 'Login exitoso',
            access_token: await this.jwtService.signAsync(payload),
            user: { id: user.id, nombre: user.nombre, email: user.email },
        };
    }

    async getProfile(userId: number) {
        // AGREGADO AWAIT
        const user = await this.usersService.findById(userId);
        if (!user) throw new UnauthorizedException('Usuario no encontrado');

        const { password, ...result } = user;
        return result;
    }
}