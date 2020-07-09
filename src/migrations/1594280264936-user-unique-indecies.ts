import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UserUniqueIndecies1594280264936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'UQ_users__phone',
        columnNames: ['phone'],
        isUnique: true,
      }),
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'UQ_users__email',
        columnNames: ['email'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'UQ_users__phone');
    await queryRunner.dropIndex('users', 'UQ_users__email');
  }
}
