export class User {
    /**
     * Identificador único del usuario (ID autoincremental)
     */
    id: number;

    /**
     * Nombre completo del usuario
     */
    nombre: string;

    /**
     * Correo electrónico (se usará como nombre de usuario para el login)
     */
    email: string;

    /**
     * Contraseña del usuario (debe almacenarse siempre hasheada por seguridad)
     */
    password: string;

    /**
     * Fecha de creación del registro
     */
    createdAt: Date;
}