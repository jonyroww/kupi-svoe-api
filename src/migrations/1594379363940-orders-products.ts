import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrdersProducts1594379363940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        indices: [
          {
            name: 'IX_orders_products__order_id',
            columnNames: ['order_id'],
          },
          {
            name: 'IX_orders_products__product_id',
            columnNames: ['product_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['order_id'],
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        columns: [
          {
            name: 'order_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'product_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_products');
  }
}
