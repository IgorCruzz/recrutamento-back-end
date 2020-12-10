export const createUserParamSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
  },
  required: ['email'],
}
