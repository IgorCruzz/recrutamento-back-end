import {
  IActivationUser,
  IActivationUserDTO,
} from '../protocols/sendGridAdapter/ActivationMail.interface'

export class SendGridAdapterStub implements IActivationUser {
  async activationUser(data: IActivationUserDTO): Promise<void> {}
}
