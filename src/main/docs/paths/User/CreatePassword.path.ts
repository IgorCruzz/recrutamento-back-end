export const createPassword = {
  post: {
    tags: ['User'],
    summary: 'API para criar uma senha para o usuário poder logar no sistema.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createPasswordParams',
          },
        },
      },
    },
    parameters: [
      {
        in: 'path',
        name: 'code',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      201: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/createPasswordResult',
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
