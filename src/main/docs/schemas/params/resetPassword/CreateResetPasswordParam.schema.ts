export const CreateResetPasswordParamSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
  },
  required: ['email'],
}
