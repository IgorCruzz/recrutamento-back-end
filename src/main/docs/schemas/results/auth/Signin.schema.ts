export const signInResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    email: {
      type: 'string',
    },
    token: {
      type: 'string',
    },
  },
}
