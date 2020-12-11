Caso de sucesso ✅

1.  ✅ Validar se existe um usuário com o código enviado pelo parametro.
2.  ✅ Verifica se o código enviado pertence ao usuário que quer criar a senha.
3.  ✅ Atualizar o password de NULL para uma senha válida.
4.  ✅ Criar uma rota /PUT para criar uma senha.

Exceções

1.  ✅ Retorna 400 se o código não existir um usuário com o código passado.
2.  ✅ Retorna 400 se o código enviado não pertence ao usuário que quer criar a senha.
3.  ✅ Retorna 500 se der erro ao tentar criar a senha.
