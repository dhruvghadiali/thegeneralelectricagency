---
name: setup-role-api
description: Add or update backend endpoint integrations in this project's src/api layer when the user supplies endpoint details and the allowed super admin, employee, or warehouse manager roles. Use for API client wiring and role-scoped exposure; do not infer authorization for unspecified roles or build unrelated UI/store features unless requested.
---

# Set Up a Role-Aware API

Wire the requested backend contract into `src/api` using the project's established factory-and-role-module design. Treat the roles provided by the user as the authorization source of truth.

## Required input

Use the endpoint and roles the user gives. Extract, when available:

- HTTP method and path, including path parameters
- request body, query parameters, and expected response data
- allowed roles: Super Admin, Employee, and/or Warehouse Manager
- desired caller-facing method name

If a missing detail can be safely inferred from an existing resource pattern, inspect the nearest factory and proceed. Ask only when ambiguity would materially change the public API or access granted to a role. Never add a role that the user did not specify.

Normalize role names to the existing constants:

| User wording | Constant | URL segment | Role module directory |
| --- | --- | --- | --- |
| super admin | `ROLE_PATHS.SUPER_ADMIN` | `super-admin` | `superAdmin` |
| employee | `ROLE_PATHS.EMPLOYEE` | `employee` | `employee` |
| warehouse manager / ware house manager | `ROLE_PATHS.WAREHOUSE_MANAGER` | `warehouse-manager` | `warehouseManager` |

## Inspect before editing

Read the relevant files rather than assuming their current contents:

- `src/api/client.api.js`
- `src/api/endpoints.constants.js`
- `src/api/index.js`
- the closest file in `src/api/factories/`
- affected files in `src/api/superAdmin/`, `src/api/employee/`, and `src/api/warehouseManager/`
- `src/enums/role.enum.js`

Also search for the resource and proposed method name across `src/api` to avoid duplicate constants, factories, methods, or exports.

## Implement the integration

1. Add stable path fragments to the appropriate group in `ENDPOINTS`. Create a new resource group only when no existing group fits. Keep role segments out of `ENDPOINTS`; role modules supply them through `ROLE_PATHS`.
2. Put reusable request logic in a resource factory under `src/api/factories`. Build paths as `/${rolePath}/${ENDPOINTS.<GROUP>.<KEY>}` and append path parameters explicitly.
3. Use the shared `apiClient`; do not create another Axios instance or manually add auth headers. Use its unwrapped `{ status, message, data }` result.
4. Match the existing caller contract. For endpoints whose `data` is an array wrapping the actual payload, return the first item or `{}` using the local `unwrapPayload` pattern. Do not blindly unwrap a real collection response. Infer this only from existing sibling endpoints or a documented response example.
5. For list/read calls, accept `(params = {}, config = {})` and pass `{ params, ...config }` so callers can supply filters and an `AbortSignal`. For mutations, keep identifiers as explicit arguments followed by `payload` when applicable.
6. Keep read and mutation capabilities in separate factory functions when roles may have different permissions. Reuse an existing factory when the endpoint belongs to that resource.
7. In each allowed role module, compose only the required factory capability using the correct `ROLE_PATHS` value. Create the role's resource module if it does not exist. Do not expose the capability from unlisted role modules.
8. Export every new public role API from `src/api/index.js`. Preserve the `@Api` and `@Enums` alias style and existing formatting.

When the same method/path is available to several roles, implement it once in a factory and instantiate it in each permitted role module. Do not copy request functions between role directories.

## Scope

Complete the `src/api` integration requested. Update Redux actions, forms, hooks, routes, or UI only if the user explicitly asks for end-to-end usage; the endpoint-and-roles request alone does not authorize those unrelated layers.

Preserve existing code and user changes. Do not redesign the API layer while adding an endpoint.

## Verify

- Search the final code to confirm the method is exposed only for the requested roles.
- Run targeted lint on changed JavaScript files when supported, then run `npm run lint` or `npm run build` in proportion to the change.
- Report the endpoint, allowed roles, created/updated API object names, and verification result.
