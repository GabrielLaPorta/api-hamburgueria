import bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, OneToMany } from 'typeorm';

import { Role } from '../types';
import { Burger } from '../burger';

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    cpf: string;

    @Column({
        nullable: true,
        unique: true
    })
    username: string;

    @Column()
    name: string;

    @Column({
        default: 'STANDARD' as Role,
        length: 30
    })
    role: string;

    @OneToMany(() => Burger, (burger: Burger) => burger.user, { onDelete: 'CASCADE' })
    burgers: Burger[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    @DeleteDateColumn()
    deleted_at: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfPasswordMatch(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
    constructor(init?: Partial<Users>) {
        super();
        Object.assign(this, init);
    }
}
