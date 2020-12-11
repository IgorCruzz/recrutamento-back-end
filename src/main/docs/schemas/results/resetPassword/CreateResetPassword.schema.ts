export const createResetPasswordResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    resetToken: {
      type: 'string',
    },
  },
}
