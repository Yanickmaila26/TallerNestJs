import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users') // Nombre de la tabla en MySQL
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ unique: true }) // Evita emails duplicados a nivel DB
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
}