export const signIn = {
  post: {
    tags: ['Auth'],
    summary: 'API para criar fazer login',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signInParams',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/signInResult',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
}
