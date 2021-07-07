import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBurgerIngredientEntity1625643313869 implements MigrationInterface {
    name = 'AddBurgerIngredientEntity1625643313869';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "burger_ingredient_type_enum" AS ENUM('bread', 'salad', 'beef', 'sauce', 'cheese')`);
        await queryRunner.query(
            `CREATE TABLE "burger_ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "type" "burger_ingredient_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e2804c52eb3b7cf7ef3c87a576e" UNIQUE ("name"), CONSTRAINT "PK_9e2638b8c4f651a6506aab8c6a2" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "burger_ingredient"`);
        await queryRunner.query(`DROP TYPE "burger_ingredient_type_enum"`);
    }
}
