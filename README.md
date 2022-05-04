# 🚀 Feedback Widget - Back-End 🚀

> Projeto criado durante o evento NLW Return da RocketSeat

## 👨‍💻 Tecnologias e bibliotecas utilizadas 👩‍💻

- Javascript / Typescript : Linguagem programação

- Node : JavaScript runtime

- Express : Framework web minimalista para node

- Prisma : TypeScript ORM para node

- Nodemailer : Envio de emails para node

- SOLID : Cinco princípios da programação orientada a objetos

## ➕ O que fiz além ✨

- Endpoint para listagem de feedback

- Endpoint de criação de feedback retorna o feedback salvo no banco de dados

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

## 🔗 Links úteis ✨

- [Prisma](https://www.prisma.io/) : Next-generation Node.js and TypeScript ORM

- [mailtrap](https://mailtrap.io/) : Email Sandbox Service

## 🔥 Repositórios da NLW Return 🫶

- [Front-End WEB](https://github.com/rodolfoHOk/rocketseat.feedback-widget-web)

- [Back-End]() - em breve

- [Mobile]() - em breve

- [Design no Figma](https://www.figma.com/community/file/1102912516166573468/Feedback-Widget)

# break 1:27:00
