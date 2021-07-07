import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from 'typeorm';

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

    @Column()
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

    constructor(init?: Partial<BurgerIngredient>) {
        super();
        Object.assign(this, init);
    }
}
