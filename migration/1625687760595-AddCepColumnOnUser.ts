import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCepColumnOnUser1625687760595 implements MigrationInterface {
    name = 'AddCepColumnOnUser1625687760595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cpf" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cpf" SET NOT NULL`);
    }

}
