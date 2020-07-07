/* eslint-disable @typescript-eslint/class-name-casing */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class phoneVerificationsUserIdDropNotNull1593526376395
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "user_id" SET NOT NULL`,
    );
  }
}
