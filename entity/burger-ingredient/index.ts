import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { BurgerPieces } from '../burger-pieces';
import { CurrencyColumn } from '../types';

export enum IngredientTypes {
    bread = 'bread',
    salad = 'salad',
    beef = 'beef',
    sauce = 'sauce',
    cheese = 'cheese'
}

@Entity()
export class BurgerIngredient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @CurrencyColumn()
    value: number;

    @Column({ type: 'enum', enum: IngredientTypes, nullable: false })
    type: IngredientTypes;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => BurgerPieces, (pieces: BurgerPieces) => pieces.ingredient, { onDelete: 'CASCADE' })
    pieces: BurgerPieces[];

    constructor(init?: Partial<BurgerIngredient>) {
        super();
        Object.assign(this, init);
    }
}
