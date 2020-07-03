import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Categories1593735026258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'categories',
      indices: [{ columnNames: ['parent_category_id'] }],
      foreignKeys: [
        {
          columnNames: ['parent_category_id'],
          referencedTableName: 'categories',
          referencedColumnNames: ['id'],
        },
      ],
      columns: [
        {
          name: 'id',
          type: 'integer',
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
          name: 'updated_at',
          type: 'timestamptz',
          isNullable: false,
          default: 'NOW()',
        },
        {
          name: 'deleted_at',
          type: 'timestamptz',
          isNullable: true,
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'image_url',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'parent_category_id',
          type: 'integer',
          isNullable: true,
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
