import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    nombre: string;

    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}