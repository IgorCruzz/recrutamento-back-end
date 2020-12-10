import { IActivationModel } from '@/domain/models/Activation.model'

export interface IFindByActivationCodeRepository {
  findCode(code: string): Promise<IActivationModel>
}
