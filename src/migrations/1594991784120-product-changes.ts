import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ProductChanges1594991784120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'package_type');
    await queryRunner.dropColumn('products', 'storage_period');
    await queryRunner.dropColumn('products', 'collection_date');
    await queryRunner.dropColumn('products', 'description');
    await queryRunner.addColumns('products', [
      new TableColumn({ name: 'qnt', type: 'int', isNullable: false }),
      new TableColumn({ name: 'qnt_unit', type: 'varchar' }),
    ]);
    await queryRunner.query(`
    ALTER TABLE products 
    ALTER COLUMN delivery_schedule TYPE jsonb USING delivery_schedule::jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('products', [
      new TableColumn({ name: 'package_type', type: 'varchar' }),
      new TableColumn({ name: 'storage_period', type: 'varchar' }),
      new TableColumn({ name: 'collection_date', type: 'timestamptz' }),
      new TableColumn({ name: 'description', type: 'varchar' }),
    ]);
    await queryRunner.dropColumns('products', [
      new TableColumn({ name: 'qnt', type: 'int', isNullable: false }),
      new TableColumn({ name: 'qnt_unit', type: 'varchar' }),
    ]);
  }
}
