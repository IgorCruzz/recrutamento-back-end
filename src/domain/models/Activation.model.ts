import { IUserModel } from './User.model'

export interface IActivationModel {
  user_id: number
  code: string
  created_at: Date
  updated_at: Date
  user?: IUserModel
}
