Caso de sucesso ✅

1.  Validar se o campo E-mail foi inserido corretamente.
1.  ✅ Verificar se já existe um usuário registrado com o e-mail passado.
1.  Criar uma rota /POST para criar um novo usuário.
1.  Retorna 201 com os dados dos usuário se tudo der certo.
1.  Cria um código de ativação e para o usuário criar uma senha.

Exceções

1.  ✅ Retorna 400 se já existir um usuário com o email fornecido.
1.  Retorna 404 se a rota não for encontrada.
1.  Retorna 400 se o campo e-mail não for inserido.
1.  Retorna 400 se o campo e-mail for inválido.
1.  Retorna 500 se der erro ao tentar criar a conta do usuário.
