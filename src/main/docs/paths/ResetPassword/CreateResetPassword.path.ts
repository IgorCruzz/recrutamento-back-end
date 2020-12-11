export const createResetPassword = {
  post: {
    tags: ['Reset Password'],
    summary:
      'API para criar enviar por e-mail um token para redefinição de senha',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createResetPasswordParams',
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
              $ref: '#/schemas/createResetPasswordResult',
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
