import app from '../../../config/App'
import request from 'supertest'
import { getRepository } from 'typeorm'
import { connection } from '@/main/config/Connection'
import { User } from '@/infra/database/entities/User.entity'
import { hash } from 'bcryptjs'
import { ResetPassword } from '@/infra/database/entities/ResetPassword.entity'

jest.setTimeout(30000)

describe('CreateResetPassword', () => {
  beforeAll(async () => {
    await connection.create()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await getRepository(User).query(`DELETE FROM users`)
    await getRepository(ResetPassword).query(`DELETE FROM resetpasswords`)
  })

  afterEach(async () => {
    await getRepository(User).query(`DELETE FROM users`)
    await getRepository(ResetPassword).query(`DELETE FROM resetpasswords`)
  })

  describe('CreateResetPassword', () => {
    it('/PUT -> should able to reset the password', async () => {
      const passwordHashed = await hash('password', 12)

      const user = await getRepository(User).save({
        email: 'user@mail.com',
        password_hash: passwordHashed,
      })

      const token = await getRepository(ResetPassword).save({
        user_id: user.id,
      })

      await request(app)
        .put(`/api/resetPassword/${token.reset_token}`)
        .send({
          email: 'user@mail.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(201)
    })

    it('/PUT -> should return 400 if token is invalid', async () => {
      await request(app)
        .put(`/api/resetPassword/token`)
        .send({
          email: 'user@mail.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(400)
    })
  })
})
