import { ICompare } from '../protocols/bcryptAdapter/Compare.interface'
import { IHasher } from '../protocols/bcryptAdapter/Hasher.interface'

export class BcryptAdapterStub implements IHasher {
  async hash(value: string): Promise<string> {
    return Promise.resolve('hashed_password')
  }
}

export class BcryptCompareStub implements ICompare {
  compare(firstValue: string, secondValue: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}
