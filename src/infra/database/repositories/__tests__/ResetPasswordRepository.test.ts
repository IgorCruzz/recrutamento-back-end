import { connection } from '@/main/config/connection'
import { getRepository } from 'typeorm'
import { ResetPassword } from '../../entities/ResetPassword.entity'
import { User } from '../../entities/User.entity'
import { ResetPasswordRepository } from '../ResetPassword.repository'

let resetPasswordRepository: ResetPasswordRepository

jest.setTimeout(30000)

describe('Reset Password', () => {
  beforeAll(async () => {
    await connection.create()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await getRepository(User).query(`DELETE FROM users`)
    await getRepository(ResetPassword).query(`DELETE FROM resetpasswords`)

    resetPasswordRepository = new ResetPasswordRepository()
  })

  afterEach(async () => {
    await getRepository(User).query(`DELETE FROM users`)
    await getRepository(ResetPassword).query(`DELETE FROM resetpasswords`)
  })

  it('should be able to create a token to reset the password', async () => {
    const user = await getRepository(User).save({
      email: 'user@mail.com',
      password_hash: 'password',
    })

    const resetPassword = await resetPasswordRepository.createResetPassword(
      user.id
    )

    expect(resetPassword).toBeTruthy()
    expect(resetPassword.user_id).toBeTruthy()
  })
})
