import { IGenerateCode } from '../protocols/cryptoAdapter/GenerateCode.interface'

export class GenerateCodeStub implements IGenerateCode {
  generate(): string {
    return 'code_generated'
  }
}
