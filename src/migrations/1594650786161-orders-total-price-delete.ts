import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class OrdersTotalPriceDelete1594650786161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'total_price');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'total_price',
        type: 'numeric',
        isNullable: false,
      }),
    );
  }
}
