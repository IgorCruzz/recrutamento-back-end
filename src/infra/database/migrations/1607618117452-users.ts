import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class users1607618117452 implements MigrationInterface {
  private readonly users = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        isNullable: false,
        generationStrategy: 'increment',
      },
      {
        name: 'email',
        type: 'integer',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'password_hash',
        type: 'varchar',
        default: null,
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
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.users)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.users)
  }
}
