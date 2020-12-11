export interface IAuthorizationResult {
  id?: string
  error?: string
}

export interface IAuthorization {
  auth(token: string): Promise<IAuthorizationResult>
}
