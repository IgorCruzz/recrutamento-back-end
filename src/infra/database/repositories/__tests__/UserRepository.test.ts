import { connection } from '@/main/config/connection'
import { getRepository } from 'typeorm'
import { User } from '../../entities/User.entity'
import { UserRepository } from '../User.repository'

let userRepository: UserRepository

describe('UserRepo', () => {
  it('should be able create an User', () => {
    expect(true).toBe(true)
  })
})

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
    userRepository = new UserRepository()
  })

  afterEach(async () => {
    await getRepository(User).query(`DELETE FROM users`)
  })

  it('should be able to create an user', async () => {
    const user = await userRepository.create('user@mail.com')

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.email).toEqual('user@mail.com')
    expect(user.password_hash).toEqual(undefined)
    expect(user.created_at).toBeTruthy()
    expect(user.updated_at).toBeTruthy()
  })

  it('should be able to find an User through their e-mail', async () => {
    await getRepository(User).save({ email: 'user@mail.com' })

    const user = await userRepository.findMail('user@mail.com')

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.email).toEqual('user@mail.com')
    expect(user.password_hash).toEqual(null)
    expect(user.created_at).toBeTruthy()
    expect(user.updated_at).toBeTruthy()
  })

  it('should return undefined not find any user with email passed', async () => {
    const user = await userRepository.findMail('user@mail.com')

    expect(user).toEqual(undefined)
  })
})