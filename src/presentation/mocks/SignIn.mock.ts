import {
  ISignIn,
  ISignInDTO,
  ISignInDTOResult,
} from '@/domain/usecases/signin/signin.domain'

export class DbSignInStub implements ISignIn {
  async signIn(data: ISignInDTO): Promise<ISignInDTOResult> {
    return Promise.resolve({
      id: 1,
      email: 'user@mail.com',
      token: 'token',
    })
  }
}
