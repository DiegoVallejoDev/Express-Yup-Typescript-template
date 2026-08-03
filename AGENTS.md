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
- Put `validate(schema)` before handlers. The `validate` middleware is generic,
  so derive request types from the schema with `Yup.InferType<typeof schema>`
  instead of hand-writing interfaces. Type the handler's `res` as
  `Response<unknown, { validated: InferType<typeof mySchema> }>` so
  `res.locals.validated` is typed and no `as` cast is needed. Assert the
  `Routes` array to `Route[]` only to satisfy the shared route table type.
- Validation failures are HTTP 400. Unexpected failures go to the central error
  handler, which must not leak stack traces outside development.
- Add or update supertest/Vitest coverage for every endpoint.

## Don'ts

- Do not commit `package-lock.json` or `yarn.lock`.
- Do not edit generated `dist/` files.
- Do not bypass the validation middleware for endpoints with request schemas.
- Do not return stack traces or internal error details in production.
