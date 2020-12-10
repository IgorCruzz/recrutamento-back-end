import 'dotenv/config'
import sgMail from '@sendgrid/mail'
import {
  IActivationUser,
  IActivationUserDTO,
} from '@/data/protocols/sendGridAdapter/ActivationMail.interface'

export class SendGridAdapter implements IActivationUser {
  async activationUser(data: IActivationUserDTO): Promise<void> {
    const { email, code } = data

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: email,
      from: process.env.HOST_EMAIL,
      subject: 'Quase lá...',
      html: `<p>Olá</strong></p> <br />
             <p>Obrigado por fazer o cadastro na nossa plataforma.<br />
             <button
             type="button"
             style="
             margin:5px 0;
             background:SlateBlue;
             color:white;
             font-weight:bold;
             border:0;
             padding:10px;">
             <a href=${process.env.URL}/auth/${code}>**Clique aqui para criar uma senha**</a>
             </button></p>`,
    }

    await sgMail
      .send(msg)
      .then(() => console.log('E-mail enviado.'))
      .catch((err) => console.log(err))
  }
}
