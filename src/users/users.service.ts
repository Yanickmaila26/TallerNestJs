import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      id: this.idCounter++,
      ...userData,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  // Lógica para buscar por email (usado en el Login)
  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  // Lógica para buscar por ID (usado por el Guard)
  findById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Retorna todos los usuarios pero oculta la contraseña por seguridad
  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...user }) => user);
  }
}