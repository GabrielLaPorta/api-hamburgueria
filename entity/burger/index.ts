import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, OneToMany, ManyToOne, RelationId, JoinColumn } from 'typeorm';
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

    @ManyToOne(() => Users, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: Users;

    constructor(init?: Partial<Burger>) {
        super();
        Object.assign(this, init);
    }
}
