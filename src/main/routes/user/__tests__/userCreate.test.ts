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

  describe('Create User', () => {
    it('/POST -> should return a new user', async () => {
      await request(app)
        .post('/api/user')
        .send({
          email: 'user@mail.com',
        })
        .expect(201)
    })

    it('/POST -> should return 400 if has already an user with email passed', async () => {
      await getRepository(User).save({
        email: 'user@mail.com',
      })

      await request(app)
        .post('/api/user')
        .send({
          email: 'user@mail.com',
        })
        .expect(400)
    })
  })
})
