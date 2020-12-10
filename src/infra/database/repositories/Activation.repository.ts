import {
  ICreateActivation,
  ICreateActivationDTO,
  ICreateActivationModel,
} from '@/data/protocols/database/activation/createActivation.interface'
import { getRepository } from 'typeorm'
import { Activation } from '../entities/Activation.entity'

export class ActivationRepository implements ICreateActivation {
  private readonly ActivationRepository = getRepository(Activation)

  async create(data: ICreateActivationDTO): Promise<ICreateActivationModel> {
    return await this.ActivationRepository.save(data)
  }
}
