# Contributor and agent guide

## Conventions

- Use pnpm only; do not add or regenerate `package-lock.json` or `yarn.lock`.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and
  `pnpm format:check` before committing.
- Use `corepack enable` to get the package manager version declared in
  `package.json`. Scaffolded projects may delete `pnpm-lock.yaml` if they want a
  fresh dependency resolution.
- Routes belong in `src/routes/`, schemas in `src/schemas/`, middleware in
  `src/middleware/`, and shared types/utilities in `src/utils/`.
- Add endpoints through the `Routes` table in `src/routes/index.ts`.
- Put `validate(schema)` before handlers and use `res.locals.validated` for
  validated, cast values.
- Validation failures are HTTP 400. Unexpected failures go to the central error
  handler, which must not leak stack traces outside development.
- Add or update supertest/Vitest coverage for every endpoint.

## Don'ts

- Do not commit `package-lock.json` or `yarn.lock`.
- Do not edit generated `dist/` files.
- Do not bypass the validation middleware for endpoints with request schemas.
- Do not return stack traces or internal error details in production.
