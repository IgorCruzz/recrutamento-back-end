import { FindUserByEmailStub } from '@/data/mocks/userRepo.mock'
import { IFindUserByEmail } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { ICreateUser } from '@/domain/usecases/user/CreateUser.domain'
import { DbCreateUser } from '../DbCreateUser.data'

let dBCreateUser: ICreateUser
let findUserByEmail: IFindUserByEmail

describe('DbCreateUser  ( DATA )', () => {
  beforeEach(() => {
    findUserByEmail = new FindUserByEmailStub()
    dBCreateUser = new DbCreateUser(findUserByEmail)
  })

  it('should be defined', () => {
    expect(dBCreateUser).toBeDefined()
  })

  it('should be call findUserByEmail with success', async () => {
    const res = jest.spyOn(findUserByEmail, 'findMail')

    await dBCreateUser.createUser('user@mail.com')

    expect(res).toHaveBeenCalledWith('user@mail.com')
  })
})
