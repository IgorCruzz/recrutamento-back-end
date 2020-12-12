import {
  ICreateActivationDTO,
  ICreateActivationRepository,
} from '@/data/protocols/database/activation/CreateActivation.interface'
import { IFindByActivationCodeRepository } from '@/data/protocols/database/activation/FindByActivationCode.interface'
import { IActivationModel } from '@/domain/models/Activation.model'
import { getRepository } from 'typeorm'
import { Activation } from '../entities/Activation.entity'

export class ActivationRepository
  implements ICreateActivationRepository, IFindByActivationCodeRepository {
  async create(data: ICreateActivationDTO): Promise<IActivationModel> {
    const orm = getRepository(Activation)

    return await orm.save(data)
  }

  async findCode(code: string): Promise<IActivationModel> {
    const orm = getRepository(Activation)

    return await orm.findOne({
      relations: ['user'],
      where: { code },
    })
  }
}
