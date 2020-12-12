import { errorSchema } from './schemas/error/Error-schema'
import { CreateResetPasswordParamSchema } from './schemas/params/resetPassword/CreateResetPasswordParam.schema'
import { UpdateResetPasswordParamSchema } from './schemas/params/resetPassword/UpdateResetPasswordParam.schema'
import { SigninParamSchema } from './schemas/params/signin/SigninParam.schema'
import { createPasswordParamSchema } from './schemas/params/user/CreatePasswordParam.schema'
import { createUserParamSchema } from './schemas/params/user/CreateUserParam.schema'
import { signInResultSchema } from './schemas/results/auth/Signin.schema'
import { updateResetPasswordResultSchema } from './schemas/results/resetPassword/UpdateResetPassword.schema'
import { createUserResultSchema } from './schemas/results/User/CreateUser.schema'
import { PasswordUserResultSchema } from './schemas/results/User/PasswordUser.schema'

export default {
  error: errorSchema,
  createUserParams: createUserParamSchema,
  createUserResult: createUserResultSchema,
  createPasswordParams: createPasswordParamSchema,
  createPasswordResult: PasswordUserResultSchema,
  signInParams: SigninParamSchema,
  signInResult: signInResultSchema,
  createResetPasswordParams: CreateResetPasswordParamSchema,
  createResetPasswordResult: CreateResetPasswordParamSchema,
  updateResetPasswordParams: UpdateResetPasswordParamSchema,
  updateResetPasswordResult: updateResetPasswordResultSchema,
}
