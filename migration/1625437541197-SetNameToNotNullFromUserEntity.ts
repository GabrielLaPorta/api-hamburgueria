import {MigrationInterface, QueryRunner} from "typeorm";

export class SetNameToNotNullFromUserEntity1625437541197 implements MigrationInterface {
    name = 'SetNameToNotNullFromUserEntity1625437541197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
