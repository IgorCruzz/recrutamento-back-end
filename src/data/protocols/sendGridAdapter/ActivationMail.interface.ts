export interface IActivationUserDTO {
  email: string
  code: string
}

export interface IActivationUser {
  activationUser(data: IActivationUserDTO): Promise<void>
}
