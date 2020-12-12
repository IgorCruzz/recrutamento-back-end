require('dotenv').config

const source= process.env.NODE_ENV === 'production' ? 'dist' : 'src'

const postgres = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: [`${source}/infra/database/entities/*.entity{.ts,.js}`],
  migrations: [`${source}/infra/database/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${source}/infra/database/migrations`
  }
}

const sqlite = {
  type: 'sqlite',
  database: 'data/dev.db',
  logging: true,
  entities: ['src/infra/database/entities/*.entity.ts'],
  migrations: ['src/infra/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/infra/database/migrations'
  }
}

module.exports = process.env.NODE_ENV === 'test' ? sqlite : postgres
