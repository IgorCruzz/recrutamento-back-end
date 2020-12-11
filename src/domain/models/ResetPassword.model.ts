import { IUserModel } from './User.model'

export interface IResetPasswordModel {
  user_id: number
  user?: IUserModel
  reset_token: string
  created_at?: Date
  updated_at?: Date
}
