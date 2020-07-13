import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';
import { string } from '@hapi/joi';

export class OrdersUserCilomnsDrop1594642079972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('orders', [
      new TableColumn({ name: 'first_name', type: 'varchar' }),
      new TableColumn({ name: 'last_name', type: 'varchar' }),
      new TableColumn({ name: 'email', type: 'varchar' }),
      new TableColumn({ name: 'phone', type: 'varchar' }),
    ]);
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'total_price',
        type: 'numeric',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('orders', [
      new TableColumn({
        name: 'first_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'last_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
    await queryRunner.dropColumn('orders', 'total_price');
  }
}
