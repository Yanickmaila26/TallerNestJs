import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Este método activa la lógica de passport-jwt
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // Si Passport no encuentra un usuario válido o hay error, lanzamos 401
        if (err || !user) {
            throw err || new UnauthorizedException('Token inválido o expirado');
        }
        return user;
    }
}