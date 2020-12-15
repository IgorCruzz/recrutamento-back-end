<h1>:desktop_computer: Backend</h1>

<p align="center">nuvemWEB - http://nuvem-web.herokuapp.com/</a></p>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/badge/license-MIT-orange?color=%237D40E7">
</p>

</br>

> ## :bar_chart: Screenshots

<img src="https://github.com/IgorCruzz/recrutamento-front-end/blob/master/screenshots/Dashboard.jpg" alt="-" />
<img src="https://github.com/IgorCruzz/recrutamento-front-end/blob/master/screenshots/Signin.jpg" alt="-" />
<p align="center"><img src="https://github.com/IgorCruzz/recrutamento-front-end/blob/master/screenshots/mobile.jpg" alt="-" /></>

</br>

> ## :bar_chart: Swagger Documentation

https://nuvemweb.herokuapp.com/api-docs/

</br>

> ## :bar_chart: About the project

Está aplicação foi desenvolvida com ReactJS, foi projetada para listar servidores do sistema nuvemWEB mostrando todos os servidores estando online ou offline e listando os 10 servidores com mais consumo diário, sendo como requerimento para ve-los, precisa criar uma conta.

</br>

</br>

> ## :bar_chart: Enviroment variables

```bash
REACT_APP_API_KEY => (INSIRA O BEARER TOKEN ENVIADO PELA API DE LISTAGEM DE SERVIDORES)
REACT_APP_URL => (INSIRA A URL DA API VINDA DO BACKEND DESTE PROJETO)
SENDGRID_API_KEY => (API VINDO DO SENDGRID)
HOST_EMAIL => (INSIRA O EMAIL SENDER QUE VOCÊ INSERIU NO SITE DO SENDGRID)
URL => (URL DA PARTE FRONTEND DO SISTEMA NUVEMWEB)
JWT_SECRET => (SECRET DO JWT)
JWT_EXPIRESIN => (TEMPO LIMITE PARA EXPIRAR O TOKEN JWT)
```

</br>

> ## :key: Scripts

- yarn build => (faz o build da aplicação)
- yarn pre:start => (roda as migrations do banco de dados, antes de iniciar em produção)
- yarn start => (inicia a aplicação em modo de produção)
- yarn start:dev => (inicia a aplicação em modo de desenvolvimento)
- yarn lint => (verifica os erros com eslint)
- yarn format => (formata o codígo no padrão certo)
- yarn test => (executa testes de aplicação)
- yarn test:verbose => (executa testes de aplicação mostrando os logs completos)
- yarn test:unit => (executa testes unitários da aplicação)
- yarn migration:run => (sobe as migrações pro banco de dados)
- yarn test:staged => (executa testes que estão ativos no momento)
- yarn test:cov => (executa testes mostrando a cobertura)
- yarn test:ci => (executa testes unitários mostrando a cobertura)
- yarn test:coveralls => (executa testes e sobe para o coveralls)
- yarn pretest:integration => (sobe as migrações para o SQLITE antes de roda os teste de integração)
- yarn test:integration => (roda os teste de integrações)

</br>

> ## :hammer: Estrutura do projeto

```bash
* src

    Infra: Responsável pela implementação com frameworks externos.
    Data: Responsável pela implementação da regra de negócios.
    Domain: Responsável pela criação da regra de negócio.
    Presentation: Responsável pela apresentação da camada da regra de negócio.
    Main: Responsável pela parte principal da aplicação.

```

</br>

> ## :rocket: Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Yarn](https://github.com/yarnpkg/yarn)
- [Git](https://github.com/git/git)
- [Yup](https://github.com/jquense/yup)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [TypeORM](https://typeorm.io/)

</br>

> ## :key: Getting Started
>
> **Follow the steps below**

```bash
  # Instale as dependencias
  $ yarn

  # Rode as migrations antes de iniciar o servidor
  $ yarn migration:run

  # Inicie os serviços com yarn start
  $ yarn start:dev

  # Bem feito, projeto está iniciado!
```
