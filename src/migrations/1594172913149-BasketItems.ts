import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BasketItems1594172913149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'basket_items',
      indices: [
        {
          name: 'IX_basket_items__created_at',
          columnNames: ['created_at'],
        },
        {
          name: 'IX_basket_items__user_id',
          columnNames: ['user_id'],
        },
        {
          name: 'IX_basket_items__product_id',
          columnNames: ['product_id'],
        },
        {
          name: 'UQ_basket_items__user_id__product_id',
          columnNames: ['user_id', 'product_id'],
          isUnique: true,
        },
      ],
      foreignKeys: [
        {
          name: 'FK_basket_items__user_id',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
        {
          name: 'FK_basket_items__product_id',
          columnNames: ['product_id'],
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
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
          type: 'timestamptz',
          isNullable: false,
          default: 'NOW()',
        },
        {
          name: 'user_id',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'product_id',
          type: 'integer',
          isNullable: false,
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('basket_items');
  }
}
