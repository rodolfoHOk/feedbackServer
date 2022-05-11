# 🚀 Feedback Widget - Back-End 🚀

> Projeto criado durante o evento NLW Return da RocketSeat

## 👨‍💻 Tecnologias e bibliotecas utilizadas 👩‍💻

- Javascript / Typescript : Linguagem programação

- Node : JavaScript runtime

- Express : Framework web minimalista para node

- Prisma : TypeScript ORM para node

- Nodemailer : Envio de emails para node

- SOLID : Cinco princípios da programação orientada a objetos

- Jest : Framework para testes unitários

## 🗃️ Guia 📚

- Iniciando um projeto Node Js

        npm init -y

- Adicionando Typescript ao projeto

        npm i typescript @types/node ts-node-dev -D
        npx tsc --init

        no tsconfig.json:
          "target": "es2020"
          "rootDir": "./src"
          "outDir": "./dist"

        no package.json:
          "scripts": {
            ...
            "dev": "ts-node-dev src/server.ts",
          },

- Adicionando o Express

        npm i express
        npm i @types/express -D

- Adicionando o Prisma primeiramente utilizando o SQLite, em produção usaremos PostgreSQL

        npm i prisma -D
        npm i @prisma/client
        npx prisma init

        no prisma/schema.prisma:
          datasource db {
            provider = "sqlite"
            url      = env("DATABASE_URL")
          }

        no .env:
          DATABASE_URL="file:./dev.db"

- Adicionando modelo de entidade com prisma

        no prisma/schema.prisma:
        model Entidade {
          ...
        }

- Criar tabela no banco de dados

        npx prisma migrate dev
        ou
        npx prisma migrate deploy

- Verificar tabelas models no banco de dados

        npx prisma studio

- Adicionar o nodemailer para envio de email

        npm i nodemailer
        npm i @types/nodemailer -D

- Utilização do mailtrap

        no site https://mailtrap.io/:
          criar conta e acessá-la
          em https://mailtrap.io/inboxes
            clicar add Inbox, nomear e salvar
            entrar no inbox criado
              em integrations selecionar nodemailer
              copiar o código e colar onde for utilizá-lo

        quando receber novos emails eles estarão na página:
          estando logado
          https://mailtrap.io/inboxes e entrar no inbox criado

- ### SOLID

  #### Princípios

  1. Sigle Responsibility Principle
  2. Open / Close Principle
  3. Liskov Substitution Principle
  4. Interface Segregation Principle
  5. Dependency Inversion Principle

  #### Descrição

  1. Cada classe / função tem uma responsabilidade única.
  2. As classes da aplicação devem ser abertas para extensão e fachadas para modificação.
  3. Nós devemos poder substituir uma classe pai por uma herança dela e tudo continuar funcionando.
  4. Segregar as interfaces sempre que possível classes implementarão várias interfaces ao invés de uma MegaInterface.
  5. Ao invés da classe buscar as dependências o contexto externo a ela que diz quais a classe usará.

- Configurando o Jest para testes

        npm i jest -D
        npx jest --init
        npm i ts-node -D
        npm i @swc/jest -D
        npm i @types/jest -D

        no jest.config.ts substituir:
          transform: {
            '^.+\\.(t|j)sx?$': ['@swc/jest'],
          },

- Instalando Cors

        npm i cors
        npm i @types/cors -D

## ➕ Milha extra - O que fiz além ✨

- Endpoint para listagem de feedback paginada

- Endpoint de criação de feedback retorna o feedback salvo no banco de dados

- Testes para serviço de listagem de feedback

- ### Autenticação OAuth2 com Github, Google e Facebook

        Cadastrar aplicação no github:
          Github / Settings / Developer settings / OAuth Apps / new OAuth App
          Gerar o client secret
          Guardar client_id e client_secret

        Cadastrar aplicação no google:
          acessar:
            https://console.developers.google.com/apis/credentials
            -> criar projeto -> preencher nome -> criar
            -> configurar tela de consentimento -> user type: externo -> criar
              Informações do app -> preencher nome, selecionar email suporte,
                preencher email desenvolvedor -> salvar e continuar
              Escopos -> salvar e continuar
              Usuários de teste -> salvar e continuar
              Resumo -> voltar para painel
            -> Credentials -> criar credenciais -> ID do cliente OAuth
              Selecionar tipo e preencher o nome,
              adicionar uri origens javascript (ex: http://localhost),
              adicionar URIs de redirecionamento autorizados
              (ex: http://localhost:3000/auth/callback/google),
              -> Criar
            Guardar o client_id e client_secret

        Cadastrar aplicação no facebook:
          acessar: https://developers.facebook.com/apps/
            -> Criar aplicativo -> Tipo: Consumidor -> Avançar
            Informações básicas -> preencher nome -> Criar aplicativo
            Adicionar produtos ao seu aplicativo -> Login do facebook -> WEB ->
              preencher URL do site -> continuar -> avançar -> avançar -> voltar
            -> Configurações -> Básico
            Guardar o client_id e client_secret

        Criar o Model User no prisma:
          /prisma/schema.prisma

        Criar tabela no banco:
          npx prisma migrate dev

        Instalar axios:
          yarn add axios
          yarn add @types/axios -D

        Instalar jsonwebtoken:
          yarn add jsonwebtoken
          yarn add @types/jsonwebtoken -D

        Instalar query-string:
          yarn add query-string

        Criar o UsersRepository e usa implementação com Prisma

        Criar interface Provider

        Criar implementações de Provider para Github, Google e Facebook

        Criar o AuthenticateUserService:
          Recebe código fornecido pelo provedor de autenticação
          Recupera o access_token do provedor de autenticação
          Recupera informações do usuário de provedor de autenticação
          Verificar se o usuário já existe no banco de dados
              caso Sim: Gera um token
              caso Não: Cria novo usuário no banco de dados e gera um token
          Retorna o token e as informações do usuário

        Criar um authentication controller para cada provider

        Criar o middleware authenticated e usá-lo nas rotas que necessitam de autenticação

- Em produção usamos o Sendgrid para envio de e-mail ao invés do MailTrap

- Validação de campos e erros antes de persistir os dados

## Ideias para milha extra

### Back-end

- Melhorar HTML e CSS do email

### Front-end

- Dashboard de feedbacks

- Validação de campos e erros

## 🔗 Links úteis ✨

- [Prisma](https://www.prisma.io/) : Next-generation Node.js and TypeScript ORM

- [mailtrap](https://mailtrap.io/) : Email Sandbox Service

- [SWC](https://swc.rs/) : Rust-based platform for the Web

- [SWC Jest Docs](https://swc.rs/docs/usage/jest) : To make your Jest tests run faster

## 🔥 Repositórios da NLW Return 🫶

- [Front-End WEB](https://github.com/rodolfoHOk/rocketseat.feedback-widget-web)

- [Back-End](https://github.com/rodolfoHOk/rocketseat.feedback-widget-server)

- [Mobile](https://github.com/rodolfoHOk/rocketseat.feedback-widget-mobile)

- [Design no Figma](https://www.figma.com/community/file/1102912516166573468/Feedback-Widget)
