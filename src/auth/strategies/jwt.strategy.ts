import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

export const JWT_SECRET = 'mi_clave_secreta_muy_segura_2026';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload: any) {

        return {
            userId: payload.sub,      // Mapeamos "sub" a "userId" para mayor claridad
            email: payload.email,     // Email del usuario autenticado
            nombre: payload.nombre,   // Nombre del usuario autenticado
        };

    }
}
