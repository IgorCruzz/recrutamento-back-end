import { errorSchema } from './schemas/error/Error-schema'
import { createPasswordParamSchema } from './schemas/params/user/CreatePasswordParam.schema'
import { createUserParamSchema } from './schemas/params/user/CreateUserParam.schema'
import { createUserResultSchema } from './schemas/results/auth/CreateUser.schema'
import { PasswordUserResultSchema } from './schemas/results/auth/PasswordUser.schema'

export default {
  error: errorSchema,
  createUserParams: createUserParamSchema,
  createUserResult: createUserResultSchema,
  createPasswordParams: createPasswordParamSchema,
  createPasswordResult: PasswordUserResultSchema,
}
