import app from '../../../config/App'
import request from 'supertest'
import { getRepository } from 'typeorm'
import { connection } from '@/main/config/Connection'
import { User } from '@/infra/database/entities/User.entity'
import { Activation } from '@/infra/database/entities/Activation.entity'

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

  describe('Create Password', () => {
    it('/PUT -> should return true if is able to create an password', async () => {
      const user = await getRepository(User).save({
        email: 'user@mail.com',
      })

      const activation = await getRepository(Activation).save({
        code: 'code_generated',
        user_id: user.id,
      })

      await request(app)
        .put(`/api/password/${activation.code}`)
        .send({
          email: 'user@mail.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(200)
    })

    it('/PUT -> should return 400 if Code has invalid', async () => {
      await request(app)
        .put(`/api/password/INVALID_CODE`)
        .send({
          email: 'user@mail.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(400)
    })

    it('/PUT -> should return 400 if an User try to create an password on another user account', async () => {
      const user = await getRepository(User).save({
        email: 'another@mail.com',
      })

      const activation = await getRepository(Activation).save({
        code: 'code_generated',
        user_id: user.id,
      })

      await request(app)
        .put(`/api/password/${activation.code}`)
        .send({
          email: 'user@mail.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(400)
    })
  })
})
