import { IActivationModel } from '@/domain/models/Activation.model'

export interface ICreateActivationDTO {
  user_id: number
  code: string
}

export interface ICreateActivationRepository {
  create(data: ICreateActivationDTO): Promise<IActivationModel>
}
