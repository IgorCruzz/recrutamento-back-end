import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class activations1607622573615 implements MigrationInterface {
  private readonly activations = new Table({
    name: 'activations',
    columns: [
      {
        name: 'user_id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        isNullable: false,
        generationStrategy: 'increment',
      },
      {
        name: 'code',
        type: 'integer',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.activations)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.activations)
  }
}
