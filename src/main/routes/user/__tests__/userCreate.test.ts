import app from '../../../config/app'
import request from 'supertest'
import { getRepository } from 'typeorm'
import { connection } from '@/main/config/connection'
import { User } from '@/infra/database/entities/User.entity'

jest.setTimeout(30000)

describe('User', () => {
  beforeAll(async () => {
    await connection.create()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await getRepository(User).query(`DELETE FROM users`)
  })

  afterEach(async () => {
    await getRepository(User).query(`DELETE FROM users`)
  })

  it('2', () => {
    expect(true).toBeTruthy()
  })
})
