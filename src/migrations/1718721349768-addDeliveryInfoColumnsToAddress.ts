import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeliveryInfoColumnsToAddress1718721349768 implements MigrationInterface {

  name = "AddDeliveryInfoColumnsToAddress1718721349768"


  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "address"
          ADD "delivery_info_residency" boolean NOT NULL DEFAULT false,
          ADD "delivery_info_access" boolean NOT NULL DEFAULT false;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "address"
          DROP COLUMN "delivery_info_residency",
          DROP COLUMN "delivery_info_access";
        `);
  }

}
