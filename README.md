# Star Wars planet management system

This project is a planet system management, with this possibilities:
- View a list of all planets in the Star Wars universe, along with the following information:
    - Name
    - Diameter (in kilometers)
    - Climate
    - Terrain
    - Number of habitants of the planet
- View details about a planet, including the information listed above and a list of residents of the planet
- Add a new planet to the list
- Edit an existing planet
- Remove a planet from the list
- Search for a planet by name, climate, or terrain
- Sort the list of planets by name, diameter, climate, terrain or population.
- Paginate the list of planets to display 10 planets per page, with navigation to view the next and previous pages.

## Tech stack
Main languages: JS and TS

Framework js: Vue.js

Build tool: Vite

Unit test: Vitest

Test end-to-end: Cypress

Deploy: Docker image & docker-compose file


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Deploy with Docker

```sh
docker compose -f "docker-compose.yml" up -d --build
```
