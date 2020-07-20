import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddQntToBasketItems1594995385772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'basket_items',
      new TableColumn({
        name: 'qnt',
        type: 'float',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('basket_items', 'qnt');
  }
}
