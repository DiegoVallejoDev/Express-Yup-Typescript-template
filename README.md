# Express + Yup + TypeScript

A minimal Express 5 API template using TypeScript, Yup request validation, Vitest,
and supertest. It uses CommonJS output and requires Node.js 20 or newer.

## Quickstart

```bash
git clone https://github.com/DiegoVallejoDev/Express-Yup-Typescript-template.git
cd Express-Yup-Typescript-template
corepack enable
pnpm install
cp .env.example .env
pnpm dev
```

The server listens on `http://localhost:3000` by default. Corepack uses the
`packageManager` field to select the pinned pnpm version. Scaffolded projects can
delete `pnpm-lock.yaml` if they want a fresh dependency resolution.

## Scripts

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Start the TypeScript server with `tsx` watch mode |
| `pnpm build`        | Compile production files into `dist/`             |
| `pnpm start`        | Run the compiled production server                |
| `pnpm test`         | Run the Vitest test suite                         |
| `pnpm lint`         | Run ESLint                                        |
| `pnpm typecheck`    | Type-check without emitting files                 |
| `pnpm format`       | Format supported files with Prettier              |
| `pnpm format:check` | Check formatting without changing files           |

## Project structure

```text
src/
├── app.ts                 # Express app construction
├── index.ts               # Environment loading and server bootstrap
├── middleware/
│   └── validation.ts      # Yup validation middleware
├── routes/
│   ├── Route.ts           # Route table type
│   └── index.ts           # Route definitions and registration
├── schemas/
│   └── personschema.ts    # Request schemas
├── tests/
│   └── index.spec.ts      # Vitest and supertest suite
└── utils/
    ├── personUtils.ts
    └── types/person.ts
```

## Adding a route

1. Add a Yup schema under `src/schemas/`.
2. Add a `Route` entry to the `Routes` table in `src/routes/index.ts`.
3. Put `validate(schema)` before the route handler.
4. Read validated and cast values from `res.locals.validated`.
5. Add a supertest case in `src/tests/index.spec.ts`.

For example:

```ts
{
  path: '/people',
  method: 'post',
  handler: [
    validate(personSchema),
    (req, res) => res.json(res.locals.validated),
  ],
}
```

## Validation errors

Validation errors return HTTP 400 with all Yup messages:

```json
{
  "error": {
    "type": "validation_error",
    "message": "Request validation failed",
    "details": ["query.name is a required field"]
  }
}
```

Unknown routes return a JSON 404 response. Unexpected errors use the central error
handler and return a generic 500 message outside development.

## Environment variables

Copy `.env.example` to `.env`:

```dotenv
PORT=3000
NODE_ENV=development
```

`PORT` must be an integer from 1 through 65535. `NODE_ENV=development` includes the
original error message in 500 responses; other environments hide it.

## License

MIT © Diego Vallejo
