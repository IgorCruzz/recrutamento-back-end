import {
  ICreateActivationDTO,
  ICreateActivationRepository,
} from '@/data/protocols/database/activation/createActivation.interface'
import { IActivationModel } from '@/domain/models/Activation.model'
import { getRepository } from 'typeorm'
import { Activation } from '../entities/Activation.entity'

export class ActivationRepository implements ICreateActivationRepository {
  private readonly ActivationRepository = getRepository(Activation)

  async create(data: ICreateActivationDTO): Promise<IActivationModel> {
    return await this.ActivationRepository.save(data)
  }
}
