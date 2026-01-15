import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  // Cambiamos a async y el retorno a Promise
  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  // TypeORM findOneBy devuelve una Promesa
  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  // Para ocultar la contraseña en TypeORM usamos select
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'nombre', 'email', 'createdAt']
    });
  }
}