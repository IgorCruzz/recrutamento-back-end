import { IGenerateCode } from '@/data/protocols/cryptoAdapter/GenerateCode.interface'
import * as crypto from 'crypto'

export class CryptAdapter implements IGenerateCode {
  generate(): string {
    return crypto.randomBytes(6).toString('hex')
  }
}
