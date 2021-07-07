import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, ManyToOne, ManyToMany, RelationId, JoinColumn } from 'typeorm';
import { Burger } from '../burger';
import { BurgerIngredient } from '../burger-ingredient';
import { CurrencyColumn } from '../types';

@Entity()
export class BurgerPieces extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Burger, (burger: Burger) => burger.pieces, { onDelete: 'CASCADE' })
    burger: Burger;

    @RelationId((pieces: BurgerPieces) => pieces.burger)
    burgerId: number;

    @ManyToOne(() => BurgerIngredient, { nullable: false })
    @JoinColumn({ name: 'ingredientId' })
    ingredient: BurgerIngredient;

    @RelationId((pieces: BurgerPieces) => pieces.ingredient)
    ingredientId: number;

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

    constructor(init?: Partial<BurgerPieces>) {
        super();
        Object.assign(this, init);
    }
}
