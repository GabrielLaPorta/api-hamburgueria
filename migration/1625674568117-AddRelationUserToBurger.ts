import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationUserToBurger1625674568117 implements MigrationInterface {
    name = 'AddRelationUserToBurger1625674568117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "burger" ADD CONSTRAINT "FK_125b9435e02910de679b4206bd3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger" DROP CONSTRAINT "FK_125b9435e02910de679b4206bd3"`);
        await queryRunner.query(`ALTER TABLE "burger" DROP COLUMN "user_id"`);
    }

}
