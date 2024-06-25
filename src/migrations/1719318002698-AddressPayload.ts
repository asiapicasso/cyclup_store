import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressPayload1719318002698 implements MigrationInterface {

    name = "AddressPayload1719318002698"


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "AddressPayload"
          ADD "delivery_info_residency" boolean NOT NULL DEFAULT false,
          ADD "delivery_info_access" boolean NOT NULL DEFAULT false;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "AddressPayload"
          DROP COLUMN "delivery_info_residency",
          DROP COLUMN "delivery_info_access";
        `);
    }

}
