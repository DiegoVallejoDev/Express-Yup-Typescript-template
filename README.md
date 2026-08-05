# Express + Yup + TypeScript

A CommonJS Express 5 API template with strict TypeScript, Yup validation, tests,
and a pnpm-based development workflow.

The template provides:

- Express 5 with schema-derived request types (`Yup.InferType`)
- Type-inferred `route(...).schema(...).handle(...)` builder
- Controller layer separated from route wiring
- Yup validation with cast values available through typed `res.locals.validated`
- Structured JSON responses for validation, not-found, and internal errors
- Helmet and CORS security middleware
- Vitest and supertest coverage
- CI checks for Node.js 20, 22, and 24
- Strict TypeScript, ESLint, and Prettier configuration

## Requirements

- Node.js 20 or newer
- pnpm 10.34.5 or newer

Enable Corepack to use the pnpm version declared in `package.json`:

```bash
corepack enable
```

### Troubleshooting

If `corepack enable` fails with `Cannot find matching keyid`, the Corepack
bundled with the installed Node.js version is too old and has stale signing
keys. Update Corepack and enable it again:

```bash
npm install --global corepack@latest
corepack enable
```

## Quickstart

```bash
git clone https://github.com/DiegoVallejoDev/Express-Yup-Typescript-template.git
cd Express-Yup-Typescript-template
corepack enable
pnpm install
cp .env.example .env
pnpm dev
```

The development server listens on `http://localhost:3000` by default. Scaffolded
projects can delete `pnpm-lock.yaml` before installation if they need a fresh
dependency resolution.

## Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start the server with `tsx` watch mode  |
| `pnpm build`        | Compile production files into `dist/`   |
| `pnpm start`        | Run the compiled production server      |
| `pnpm test`         | Run the Vitest test suite               |
| `pnpm lint`         | Run ESLint                              |
| `pnpm typecheck`    | Type-check without emitting files       |
| `pnpm format`       | Format supported files with Prettier    |
| `pnpm format:check` | Check formatting without changing files |

## Project structure

```text
src/
|-- app.ts                 # Express app construction
|-- index.ts               # Environment loading and server bootstrap
|-- controllers/           # Business logic handlers
|   |-- home.ts
|   `-- person.ts
|-- middleware/
|   `-- validation.ts      # Yup validation middleware
|-- routes/
|   |-- defineRoute.ts     # Type-inferred route builder
|   `-- index.ts           # Route definitions and registration
|-- schemas/
|   `-- person.ts          # Request schemas
`-- tests/
    `-- index.spec.ts      # Vitest and supertest suite
```

## API reference

| Method | Path     | Query parameters                | Responses          |
| ------ | -------- | ------------------------------- | ------------------ |
| GET    | `/`      | None                            | 200 HTML           |
| GET    | `/hello` | `name` required, `age` optional | 200 text, 400 JSON |

Examples:

```text
GET /
GET /hello?name=John
GET /hello?name=John&age=20
```

`age` is cast to a number by Yup before the route handler runs.

## Adding a route

1. Add a Yup schema under `src/schemas/`.
2. Add a pure controller function under `src/controllers/`.
3. Wire the route in `src/routes/index.ts` using the `route` builder.
4. Add a supertest case in `src/tests/index.spec.ts`.

For example, given a `personSchema` with a `body` field:

```ts
// src/routes/index.ts
export const routes = defineRoutes([
  route('post', '/people')
    .schema(personSchema)
    .handle(({ validated }) => createPerson(validated.body)),
]);
```

Routes without validation use the shorter form:

```ts
route('get', '/').handle(home);
```

The `validated` object is typed from `Yup.InferType<typeof schema>`. The builder produces a standard Express middleware chain internally, so `app.ts` stays unchanged.

## Error responses

All application errors use an `error` object. Validation details contain every
Yup message because validation runs with `abortEarly: false`.

| Status | Type               | Response shape                                                                                                                       |
| ------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 400    | `validation_error` | `{ "error": { "type": "validation_error", "message": "Request validation failed", "details": ["query.name is a required field"] } }` |
| 404    | `not_found`        | `{ "error": { "type": "not_found", "message": "Route not found" } }`                                                                 |
| 500    | `internal_error`   | `{ "error": { "type": "internal_error", "message": "Internal server error" } }`                                                      |

In development, the 500 message contains the original error message. Stack traces
are not returned to clients.

## Production build and run

Build and start the compiled server with:

```bash
pnpm build
NODE_ENV=production pnpm start
```

Set `NODE_ENV=production` for deployed applications so internal error messages
are not exposed. The `PORT` environment variable must be an integer from 1 through 65535.

## Environment variables

Copy `.env.example` to `.env` and adjust the values:

```dotenv
PORT=3000
NODE_ENV=development
```

## Testing

The test suite uses Vitest as the test runner and supertest for HTTP requests.
Tests import `createApp()` without starting a listener. Add a test in
`src/tests/index.spec.ts` for each new endpoint, then run:

```bash
pnpm test
```

## Contributing

See [AGENTS.md](AGENTS.md) for repository conventions and required checks.

## License

MIT

## Author

Diego Vallejo
