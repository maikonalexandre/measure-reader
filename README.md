# ⏱️ Measure reader

<div align="center">
<p></p>

<a href="#-install">📌 Install</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-stack">🛠️ Stack</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://twitter.com/maikonalx">🐦 Twitter</a>

![GitHub stars](https://img.shields.io/github/stars/maikonalexandre/measure-reader)
![GitHub issues](https://img.shields.io/github/issues/maikonalexandre/measure-reader)
![GitHub license](https://img.shields.io/github/license/maikonalexandre/measure-reader)
[![Required Node.JS >=18.0.0](https://img.shields.io/static/v1?label=node&message=%20%3E=18.0.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

</div>

## 👋 Introduction

[**measure-reader**]() application was developed to automate the process of reading water and gas meters. Using Google's artificial intelligence model, Gemini, the application is able to extract the reading from the numbers shown in an image of the meter sent by the user.

## ✨ Main features:

- Image upload: The user can upload a photo of a water or gas meter

- AI-powered image processing: The application uses the Gemini model to identify and extract the number displayed on the meter.

- Data storage: The extracted reading and the received image are saved in a database.

- Confirmation and update: The user can confirm the reading made by the AI ​​and, if there are discrepancies, update the data.

- Reading list: It is possible to list all readings recorded in the system

## 📌 Install

You will need:

- [Docker](https://www.docker.com/)
- [Docker compose](https://docs.docker.com/compose/)
- [Node.js 18+ (recommended 20 LTS)](https://nodejs.org/en/).
- [Git](https://git-scm.com/).

1. Clone this repo locally:

```bash
git clone git@github.com:maikonalexandre/measure-reader.git
```

2. Install dependencies:

```bash
#run
npm install
# or
pnpm install
# or
yarn install
```

3. Start project:

```bash
#run
docker-compose build && docker-compose up
```

## 🛠️ Stack
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**Fastify**](https://www.fastify.io/) - A web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture.
- [**Prisma**](https://www.prisma.io/) - An ORM for JavaScript and TypeScript that simplifies database access and management.
- [**Biome**](https://biomejs.dev/pt-br/) - An alternative to ESLint and Prettier, made with Rust.
- [**Docker**](https://www.docker.com/) - A platform for developing, shipping, and running applications inside containers.
- [**Zod**](https://zod.dev/) - A TypeScript-first schema declaration and validation library.
- [**date-fns**](https://date-fns.org/) - A modern JavaScript date utility library delivering modularity, performance, and ease of use.
- [**@google/generative-ai**](https://www.npmjs.com/package/@google/generative-ai) - A library for interacting with Google's Generative AI models.

**And more**




