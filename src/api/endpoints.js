/**
 * Single source of truth for backend endpoint paths, scoped by module. Each
 * role's API modules combine a role path (see @Enums/role.enum) with an
 * entry here, e.g. `/${ROLE_PATHS.EMPLOYEE}/${ENDPOINTS.AUTH.SIGN_IN}`.
 */
export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: "auth/signin",
  },
};
