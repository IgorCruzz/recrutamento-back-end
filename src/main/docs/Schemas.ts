import { errorSchema } from './schemas/error/Error-schema'
import { createUserParamSchema } from './schemas/params/user/CreateUserParam.schema'
import { createUserResultSchema } from './schemas/results/auth/CreateUser.schema'

export default {
  error: errorSchema,
  createUserParams: createUserParamSchema,
  createUserResult: createUserResultSchema,
}
