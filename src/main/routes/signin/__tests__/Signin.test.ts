import app from '../../../config/app'
import request from 'supertest'
import { getRepository } from 'typeorm'
import { connection } from '@/main/config/connection'
import { User } from '@/infra/database/entities/User.entity'
import { hash } from 'bcryptjs'

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

  describe('Signin', () => {
    it('/POST -> should able to signin', async () => {
      const passwordHashed = await hash('password', 12)

      const user = await getRepository(User).save({
        email: 'user@mail.com',
      })

      await getRepository(User).update(user.id, {
        password_hash: passwordHashed,
      })

      await request(app)
        .post('/api/signin')
        .send({
          email: 'user@mail.com',
          password: 'password',
        })
        .expect(201)
    })

    it('/POST -> return 400 if password  has been incorrect', async () => {
      const passwordHashed = await hash('password', 12)

      const user = await getRepository(User).save({
        email: 'user@mail.com',
      })

      await getRepository(User).update(user.id, {
        password_hash: passwordHashed,
      })

      await request(app)
        .post('/api/signin')
        .send({
          email: 'user@mail.com',
          password: 'wrong_password',
        })
        .expect(400)
    })
  })
})
