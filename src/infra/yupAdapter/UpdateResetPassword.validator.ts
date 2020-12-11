import {
  IValidation,
  IValidationResult,
} from '@/data/protocols/yupAdapter/validation.interface'
import * as Yup from 'yup'

export class UpdateResetPasswordValidation implements IValidation {
  async validate(data: any): Promise<IValidationResult> {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('Campo obrigratório'),
      password: Yup.string().required('Campo obrigratório'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), 'O campo de senha não bate'])
        .required('Campo obrigratório'),
    })

    return await schema
      .validate(data.body, { abortEarly: false })
      .then(() => {
        return { validate: true }
      })
      .catch((err) => {
        if (err) {
          return {
            validate: false,
            err,
          }
        }
      })
  }
}
