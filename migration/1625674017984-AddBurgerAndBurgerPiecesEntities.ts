import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBurgerAndBurgerPiecesEntities1625674017984 implements MigrationInterface {
    name = 'AddBurgerAndBurgerPiecesEntities1625674017984';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "burger" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_80c737e94dfc6a7cecd5a3a2a43" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "burger_pieces" ("id" SERIAL NOT NULL, "value" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "burger_id" integer, "ingredient_id" integer, CONSTRAINT "PK_6e495ecfcde2b6114da2e474960" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "burger_pieces" ADD CONSTRAINT "FK_9538d52a16011ce6dae5c801853" FOREIGN KEY ("burger_id") REFERENCES "burger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "burger_pieces" ADD CONSTRAINT "FK_bcada5a75e74ce81f4495b36bbe" FOREIGN KEY ("ingredient_id") REFERENCES "burger_ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger_pieces" DROP CONSTRAINT "FK_bcada5a75e74ce81f4495b36bbe"`);
        await queryRunner.query(`ALTER TABLE "burger_pieces" DROP CONSTRAINT "FK_9538d52a16011ce6dae5c801853"`);
        await queryRunner.query(`DROP TABLE "burger_pieces"`);
        await queryRunner.query(`DROP TABLE "burger"`);
    }
}
