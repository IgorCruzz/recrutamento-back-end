export interface ICreateActivationDTO {
  user_id: number
  code: StaticRange
}

export interface ICreateActivationModel {
  user_id: number
  code: string
  created_at: Date
  updated_at: Date
}

export interface ICreateActivation {
  create(data: ICreateActivationDTO): Promise<ICreateActivationModel>
}
