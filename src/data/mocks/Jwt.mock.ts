import { ISign } from '../protocols/jwtAdapter/SignJwt.interface'
import { IVerify } from '../protocols/jwtAdapter/VerifyJwt.interface'

export class JwtSignAdapterStub implements ISign {
  sign(id: number): string {
    return 'token'
  }
}

export class JwtVerifydapterStub implements IVerify {
  verify(token: any): any {
    return { id: 1 }
  }
}
