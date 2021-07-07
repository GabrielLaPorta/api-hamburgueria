import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTypeForCurrencyValues1625677971374 implements MigrationInterface {
    name = 'AlterTypeForCurrencyValues1625677971374';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "burger" ADD "value" numeric(17,2)`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" ADD "value" numeric(17,2)`);
        await queryRunner.query(`ALTER TABLE "burger_ingredient" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "burger_ingredient" ADD "value" numeric(17,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" ADD "value" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger_ingredient" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "burger_ingredient" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" ADD "value" integer`);
        await queryRunner.query(`ALTER TABLE "burger" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "burger" ADD "value" integer`);
    }
}
