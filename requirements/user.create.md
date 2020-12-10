Caso de sucesso

[] - Validar se o campo E-mail foi inserido corretamente.
[] - Verificar se já existe um usuário registrado com o e-mail passado.
[] - Criar uma rota /POST para criar um novo usuário.
[] - Retorna 201 com os dados dos usuário se tudo der certo.

Exceções

[] - Retorna 404 se a rota não for encontrada.
[] - Retorna 400 se o campo e-mail não for inserido.
[] - Retorna 400 se o campo e-mail for inválido.
[] - Retorna 500 se der erro ao tentar criar a conta do usuário.
