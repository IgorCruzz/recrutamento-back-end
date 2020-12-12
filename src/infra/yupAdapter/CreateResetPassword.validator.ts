import {
  IValidation,
  IValidationResult,
} from '@/data/protocols/yupAdapter/Validation.interface'
import * as Yup from 'yup'

export class CreateResetPasswordValidation implements IValidation {
  async validate(data: any): Promise<IValidationResult> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
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
