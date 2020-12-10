import { IActivationModel } from '@/domain/models/Activation.model'
import {
  ICreateActivationDTO,
  ICreateActivationRepository,
} from '../protocols/database/activation/createActivation.interface'

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
