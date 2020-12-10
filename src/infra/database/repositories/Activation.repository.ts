import {
  ICreateActivationDTO,
  ICreateActivationRepository,
} from '@/data/protocols/database/activation/createActivation.interface'
import { IActivationModel } from '@/domain/models/Activation.model'
import { getRepository } from 'typeorm'
import { Activation } from '../entities/Activation.entity'

export class ActivationRepository implements ICreateActivationRepository {
  async create(data: ICreateActivationDTO): Promise<IActivationModel> {
    const orm = getRepository(Activation)

    return await orm.save(data)
  }
}
