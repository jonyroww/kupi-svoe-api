/* eslint-disable @typescript-eslint/class-name-casing */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1593433505168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'users',
        indices: [
          {
            name: 'IX_users__created_at',
            columnNames: ['created_at'],
          },
          {
            name: 'UQ_users__phone',
            columnNames: ['phone'],
            isUnique: true,
          },
          {
            name: 'UQ_users__email',
            columnNames: ['email'],
            isUnique: true,
          },
        ],
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp without time zone',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'farm_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'legal_entity_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'auto',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'middle_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email_confirmed',
            type: 'varchar',
            isNullable: false,
            default: false,
          },
          {
            name: 'moderation_status',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
