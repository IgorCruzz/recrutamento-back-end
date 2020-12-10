export interface IUpdateUserPasswordRepositoryDTO {
  id: number
  password: string
}

export interface IUpdateUserPasswordRepository {
  updatePassword(data: IUpdateUserPasswordRepositoryDTO): Promise<boolean>
}
