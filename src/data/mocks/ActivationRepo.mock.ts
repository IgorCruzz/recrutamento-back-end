import { IActivationModel } from '@/domain/models/Activation.model'
import {
  ICreateActivationDTO,
  ICreateActivationRepository,
} from '../protocols/database/activation/CreateActivation.interface'
import { IFindByActivationCodeRepository } from '../protocols/database/activation/FindByActivationCode.interface'

export class CreateActivationStub implements ICreateActivationRepository {
  async create(data: ICreateActivationDTO): Promise<IActivationModel> {
    return Promise.resolve({
      user_id: 1,
      code: 'code_generated',
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
}

export class FindByActivationCodeRepositoryStub
  implements IFindByActivationCodeRepository {
  async findCode(code: string): Promise<IActivationModel> {
    return Promise.resolve({
      user_id: 1,
      user: {
        id: 1,
        email: 'user@mail.com',
        password_hash: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      code: 'code_generated',
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
}
