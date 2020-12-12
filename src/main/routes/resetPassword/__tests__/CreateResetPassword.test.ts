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
    it('/POST -> should able create token to reset the password', async () => {
      const passwordHashed = await hash('password', 12)

      await getRepository(User).save({
        email: 'user@mail.com',
        password_hash: passwordHashed,
      })

      await request(app)
        .post('/api/resetPassword')
        .send({
          email: 'user@mail.com',
        })
        .expect(201)
    })

    it('/POST -> should return 400 doesnt exists an user with email passed on request', async () => {
      await request(app)
        .post('/api/resetPassword')
        .send({
          email: 'user@mail.com',
        })
        .expect(400)
    })
  })
})
