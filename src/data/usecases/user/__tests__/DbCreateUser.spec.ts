import { ICreateUser } from '@/domain/usecases/user/CreateUser.domain'
import { DbCreateUser } from '../DbCreateUser.data'

let dBCreateUser: ICreateUser

describe('DbCreateUser  ( DATA )', () => {
  beforeEach(() => {
    dBCreateUser = new DbCreateUser()
  })

  it('should be defined', () => {
    expect(dBCreateUser).toBeDefined()
  })
})
