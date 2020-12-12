require('dotenv').config

const source= process.env.NODE_ENV === 'production' ? 'dist' : 'src'

const postgres = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
