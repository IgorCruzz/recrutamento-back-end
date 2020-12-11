import { errorSchema } from './schemas/error/Error-schema'
import { SigninParamSchema } from './schemas/params/signin/SigninParam.schema'
import { createPasswordParamSchema } from './schemas/params/user/CreatePasswordParam.schema'
import { createUserParamSchema } from './schemas/params/user/CreateUserParam.schema'
import { createUserResultSchema } from './schemas/results/auth/CreateUser.schema'
import { PasswordUserResultSchema } from './schemas/results/auth/PasswordUser.schema'
import { signInResultSchema } from './schemas/results/auth/Signin.schema'

export default {
  error: errorSchema,
  createUserParams: createUserParamSchema,
  createUserResult: createUserResultSchema,
  createPasswordParams: createPasswordParamSchema,
  createPasswordResult: PasswordUserResultSchema,
  signInParams: SigninParamSchema,
  signInResult: signInResultSchema,
}
