import 'dotenv/config'
import sgMail from '@sendgrid/mail'
import {
  IActivationUser,
  IActivationUserDTO,
} from '@/data/protocols/sendGridAdapter/ActivationMail.interface'
import {
  IResetPassword,
  IResetPasswordDTO,
} from '@/data/protocols/sendGridAdapter/ResetPasswordMail.interface'

export class SendGridAdapter implements IActivationUser, IResetPassword {
  async resetPassword(data: IResetPasswordDTO): Promise<void> {
    const { email, token } = data

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: email,
      from: process.env.HOST_EMAIL,
      subject: 'Quase lá...',
      html: `<p>Olá, entre nesse link para alterar sua senha.</p>
      <a href=${process.env.URL}/updatePassword/${token}>**Clique aqui para redefinir sua senha**</a>`,
    }

    await sgMail
      .send(msg)
      .then(() => console.log('E-mail enviado.'))
      .catch((err) => console.log(err))
  }

  async activationUser(data: IActivationUserDTO): Promise<void> {
    const { email, code } = data

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: email,
      from: process.env.HOST_EMAIL,
      subject: 'Quase lá...',
      html: `
      <p>Olá, obrigado por fazer o cadastro na nossa plataforma.<br /></p>
      <a href=${process.env.URL}/createPassword/${code}>Clique aqui para criar uma senha</a>`,
    }

    await sgMail
      .send(msg)
      .then(() => console.log('E-mail enviado.'))
      .catch((err) => console.log(err))
  }
}
