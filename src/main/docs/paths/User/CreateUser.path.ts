export const createUser = {
  post: {
    tags: ['User'],
    summary: 'API para criar uma conta de usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createUserParams',
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
              $ref: '#/schemas/createUserResult',
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
