import { connection } from '@/main/config/connection'
import { getRepository } from 'typeorm'
import { Activation } from '../../entities/Activation.entity'
import { User } from '../../entities/User.entity'
import { ActivationRepository } from '../Activation.repository'

let activationRepository: ActivationRepository

jest.setTimeout(30000)

describe('Activation', () => {
  beforeAll(async () => {
    await connection.create()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await getRepository(Activation).query(`DELETE FROM activations`)
    await getRepository(Activation).query(`DELETE FROM users`)

    activationRepository = new ActivationRepository()
  })

  afterEach(async () => {
    await getRepository(Activation).query(`DELETE FROM activations`)
    await getRepository(Activation).query(`DELETE FROM users`)
  })

  it('should be able to create an activation code', async () => {
    const user = await getRepository(User).save({ email: 'user@mail.com' })

    const activation = await activationRepository.create({
      user_id: user.id,
      code: 'code_generated',
    })

    expect(activation).toBeTruthy()
    expect(activation.user_id).toBeTruthy()
    expect(activation.code).toEqual('code_generated')
    expect(activation.created_at).toBeTruthy()
    expect(activation.updated_at).toBeTruthy()
  })

  it('should be able to find an user by the Code and show the User relation', async () => {
    const user = await getRepository(User).save({ email: 'user@mail.com' })

    const activation = await activationRepository.create({
      user_id: user.id,
      code: 'code_generated',
    })

    const res = await activationRepository.findCode(activation.code)

    expect(res).toBeTruthy()
    expect(res.user.id).toBeTruthy()
  })
})
