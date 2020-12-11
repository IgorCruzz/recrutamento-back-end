export const UpdateResetPasswordParamSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    confirmPassword: {
      type: 'string',
    },
  },
  required: ['email', 'password', 'confirmPassword'],
}
