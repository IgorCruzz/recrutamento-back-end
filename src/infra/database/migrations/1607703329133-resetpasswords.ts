import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class resetpasswords1607703329133 implements MigrationInterface {
  private resetpasswords = new Table({
    name: 'resetpasswords',
    columns: [
      {
        name: 'user_id',
        type: 'integer',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'reset_token',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.resetpasswords)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.resetpasswords)
  }
}
