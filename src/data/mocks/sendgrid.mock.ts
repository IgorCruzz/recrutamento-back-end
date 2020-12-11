import {
  IActivationUser,
  IActivationUserDTO,
} from '../protocols/sendGridAdapter/ActivationMail.interface'
import {
  IResetPassword,
  IResetPasswordDTO,
} from '../protocols/sendGridAdapter/ResetPasswordMail.interface'

export class SendGridAdapterStub implements IActivationUser {
  async activationUser(data: IActivationUserDTO): Promise<void> {}
}

export class ResetPasswordStub implements IResetPassword {
  async resetPassword(data: IResetPasswordDTO): Promise<void> {}
}
