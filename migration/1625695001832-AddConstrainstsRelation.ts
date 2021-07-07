import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConstrainstsRelation1625695001832 implements MigrationInterface {
    name = 'AddConstrainstsRelation1625695001832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger" DROP CONSTRAINT "FK_d25e75d1b170160c259a2026b0f"`);
        await queryRunner.query(`ALTER TABLE "burger" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" DROP CONSTRAINT "FK_a3a233acef497d4d5aea817ae26"`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" ALTER COLUMN "ingredientId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "burger" ADD CONSTRAINT "FK_d25e75d1b170160c259a2026b0f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" ADD CONSTRAINT "FK_a3a233acef497d4d5aea817ae26" FOREIGN KEY ("ingredientId") REFERENCES "burger_ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger_pieces" DROP CONSTRAINT "FK_a3a233acef497d4d5aea817ae26"`);
        await queryRunner.query(`ALTER TABLE "burger" DROP CONSTRAINT "FK_d25e75d1b170160c259a2026b0f"`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" ALTER COLUMN "ingredientId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" ADD CONSTRAINT "FK_a3a233acef497d4d5aea817ae26" FOREIGN KEY ("ingredientId") REFERENCES "burger_ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "burger" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "burger" ADD CONSTRAINT "FK_d25e75d1b170160c259a2026b0f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
