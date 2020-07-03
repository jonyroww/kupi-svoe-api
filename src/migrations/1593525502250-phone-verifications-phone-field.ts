/* eslint-disable @typescript-eslint/class-name-casing */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class phoneVerificationsPhoneField1593525502250
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('phone_verifications', [
      new TableColumn({
        name: 'purpose',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'used',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'wrong_attempts_count',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({ name: 'phone', type: 'varchar', isNullable: false }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('phone_verifications', [
      new TableColumn({
        name: 'purpose',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'used',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'wrong_attempts_count',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({ name: 'phone', type: 'varchar', isNullable: false }),
    ]);
  }
}
