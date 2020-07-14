import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnTypes1594741734555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE phone_verifications 
    ALTER COLUMN created_at TYPE timestamptz,
    ALTER COLUMN sms_last_sent_at TYPE timestamptz,
    ALTER COLUMN updated_at TYPE timestamptz;

    ALTER TABLE users 
    ALTER COLUMN created_at TYPE timestamptz,
    ALTER COLUMN deleted_at TYPE timestamptz,
    ALTER COLUMN updated_at TYPE timestamptz;

    ALTER TABLE products 
    ALTER COLUMN created_at TYPE timestamptz,
    ALTER COLUMN deleted_at TYPE timestamptz,
    ALTER COLUMN updated_at TYPE timestamptz;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE phone_verifications 
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN sms_last_sent_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

    ALTER TABLE users 
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN deleted_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

    ALTER TABLE products 
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN deleted_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;
        `);
  }
}
