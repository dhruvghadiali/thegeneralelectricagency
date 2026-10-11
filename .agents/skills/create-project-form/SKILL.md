---
name: create-project-form
description: Create or update form-support modules under this project's src/forms directory using the employee form as the canonical structure. Use when adding a feature form, its initial values, validation rules, or frontend/API payload mappings; keep unrelated UI, store, and API-client work out of scope unless requested.
---

# Create a Project Form

Build form-support code that follows the structure and separation established by `src/forms/employee`.

## Canonical reference

Before editing, read every current file in `src/forms/employee/`; it is the source of truth and may evolve after this skill is written. Also inspect the closest existing feature under `src/forms`, the consuming form component, and any related enums or API contract supplied by the user.

Do not copy employee-specific fields, roles, messages, limits, or response assumptions into another feature. Reuse its organization and data-flow boundaries.

## Feature structure

Create or maintain `src/forms/<feature>/` with these focused modules:

```text
<feature>.initialValues.js
<feature>.validation.constants.js
<feature>.validation.messages.js
<feature>.validation.schema.js
<feature>-api.payload.js
<feature>-frontend.payload.js
```

Use the repository's existing feature casing for `<feature>`. Keep a file only when its responsibility exists, but when a form exchanges data with the backend, keep outbound and inbound transformations in the two separate payload files. Never combine them into one generic `<feature>.payload.js`.

## Responsibilities

### Initial values

- Export a named uppercase constant such as `EMPLOYEE_INITIAL_VALUES`.
- Use the exact camelCase keys consumed by Formik and the frontend.
- Give every controlled field a stable empty value of the correct type: usually `""`, `[]`, `{}`, `false`, or `null` according to the field contract.
- Keep initial values free of API snake_case naming and transformation logic.

### Validation constants

- Export reusable numeric limits, regex patterns, and other validation primitives.
- Prefix constants with the feature name.
- Do not place user-facing messages or Yup schemas in this file.

### Validation messages

- Export one named message object such as `EMPLOYEE_VALIDATION_MESSAGES`.
- Use uppercase keys grouped by field and rule, for example `EMAIL_REQUIRED` and `EMAIL_INVALID`.
- Build messages from imported validation constants when they mention a limit, so rules and copy cannot drift.
- Keep messages user-facing and omit punctuation when the surrounding project form does so.

### Validation schema

- Use Yup and export a named schema such as `employeeValidationSchema`.
- Import rules from `.validation.constants.js` and copy from `.validation.messages.js`; do not duplicate them as literals.
- Use frontend camelCase keys matching the initial values exactly.
- Apply `.trim()` to user-entered identifiers and ordinary text where whitespace is not meaningful.
- Reuse project enums/constants for allowed values instead of repeating strings.
- Match required, nullable, array, nested-object, number, and date behavior to the actual form and backend contract.

### API payload

`<feature>-api.payload.js` owns frontend-to-backend transformations:

- Export intention-revealing functions such as `to<Feature>CreatePayload`, `to<Feature>UpdatePayload`, and `to<Feature>ListParams`.
- Read camelCase frontend values and return the backend's expected keys, normally snake_case.
- Normalize strings, numbers, dates, enum values, nested collections, and omitted optional values according to the endpoint contract.
- Keep create and update exports separate even when they currently share an implementation, so their contracts can diverge safely.
- For list queries, use `buildListQueryParams` and the relevant table defaults when the feature has a list view.
- Do not map API responses in this file.

### Frontend payload

`<feature>-frontend.payload.js` owns backend-to-frontend transformations:

- Export functions such as `from<Feature>Response`, `from<Feature>PaginationResponse`, `from<Feature>SummaryResponse`, and `from<Feature>ListResponse` when applicable.
- Return stable camelCase frontend models; normalize `_id`/`id`, snake_case/camelCase response variants, enums, booleans, dates, nested records, pagination, and summaries only as supported by the contract or an existing sibling pattern.
- Use small private helpers for repeated field selection or nested mapping.
- For table data, return the shared `{ items, pagination, summary }` shape when that consumer expects it.
- Preserve meaningful falsy values. Do not convert an explicit `false` or numeric `0` into a fallback accidentally.
- Do not construct outbound API request bodies in this file.

## Integration boundaries

Update imports that previously referenced moved or replaced form-support files. Prefer the configured `@Forms` and `@Enums` aliases.

Creating these `src/forms` modules does not by itself authorize changes to:

- `src/api`
- Redux actions, slices, or selectors
- screen components, routes, or dialogs
- backend endpoints

Modify those layers only when the user explicitly requests end-to-end integration. When UI work is requested, keep Formik field names identical to the initial-values and schema keys, cast validated values before submission when appropriate, and preserve accessible error wiring.

## Verify

- Confirm initial-value keys, Yup schema keys, and form field names agree.
- Confirm every validation message and constant import resolves.
- Confirm API payload functions are imported only from `-api.payload` and response mappings only from `-frontend.payload`.
- Search for obsolete combined payload imports after splitting files.
- Run ESLint on changed files and a production build in proportion to the change.
- Report the created modules, any deliberately omitted module, updated consumers, and verification result.
