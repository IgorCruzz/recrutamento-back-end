import { DbAuthorization } from '../../data/usecases/authorization/dbAuthorization.data'
import { UserRepository } from '../../infra/database/repositories/User.repository'
import { JwtAdapter } from '../../infra/jwtAdapter/jwt.adapter'
import { AuthMiddleware } from '../../presentation/middlewares/auth.middleware'

export const authMiddleware = (): any => {
  const jwtAdapter = new JwtAdapter()
  const userRepository = new UserRepository()
  const dbAuth = new DbAuthorization(jwtAdapter, userRepository)
  return new AuthMiddleware(dbAuth)
}
