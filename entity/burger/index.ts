import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, OneToMany, ManyToOne, RelationId } from 'typeorm';
import { BurgerPieces } from '../burger-pieces';
import { CurrencyColumn } from '../types';
import { Users } from '../users';
@Entity()
export class Burger extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CurrencyColumn({ nullable: true })
    value: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => BurgerPieces, (pieces: BurgerPieces) => pieces.burger, { onDelete: 'CASCADE' })
    pieces: BurgerPieces[];

    @ManyToOne(() => Users, (user: Users) => user.burgers)
    user: Users;

    @RelationId((burger: Burger) => burger.user)
    userId: number;

    constructor(init?: Partial<Burger>) {
        super();
        Object.assign(this, init);
    }
}
