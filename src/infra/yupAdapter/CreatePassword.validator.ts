import {
  IValidation,
  IValidationResult,
} from '@/data/protocols/yupAdapter/validation.interface'
import * as Yup from 'yup'

export class CreatePasswordValidation implements IValidation {
  async validate(data: any): Promise<IValidationResult> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), 'O campo de senha não bate'])
        .required(),
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
