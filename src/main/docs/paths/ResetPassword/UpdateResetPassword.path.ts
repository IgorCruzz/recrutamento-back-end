export const updateResetPassword = {
  put: {
    tags: ['Reset Password'],
    summary: 'API para criar redefinir a senha',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateResetPasswordParams',
          },
        },
      },
    },
    parameters: [
      {
        in: 'path',
        name: 'token',
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
              $ref: '#/schemas/updateResetPasswordResult',
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
