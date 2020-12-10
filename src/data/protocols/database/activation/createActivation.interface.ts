import { IActivationModel } from '@/domain/models/Activation.model'

export interface ICreateActivationDTO {
  user_id: number
  code: string
}

export interface ICreateActivation {
  create(data: ICreateActivationDTO): Promise<IActivationModel>
}
