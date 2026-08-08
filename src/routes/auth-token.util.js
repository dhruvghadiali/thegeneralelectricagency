const AUTH_STORAGE_KEY = "auth";

function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? "null");
    return stored?.token ?? null;
  } catch {
    return null;
  }
}

/**
 * Decodes a JWT's payload without verifying the signature - this only ever
 * runs client-side to decide whether to bother rendering a protected route,
 * never to trust the token for anything security-sensitive.
 */
function decodeJwtPayload(token) {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

/**
 * Returns the expiry encoded in a JWT, or null when the token is opaque or
 * does not contain a usable `exp` claim.
 */
export function getTokenExpiration(token) {
  const expiresAt = Number(decodeJwtPayload(token)?.exp);

  if (!Number.isFinite(expiresAt) || expiresAt <= 0) {
    return null;
  }

  return new Date(expiresAt * 1000);
}

/**
 * Opaque (non-JWT) tokens carry no `exp` claim we can read client-side, so
 * the absence of one is not treated as expired - only a claim that has
 * actually passed counts.
 */
function isTokenExpired(token) {
  const expiresAt = getTokenExpiration(token);

  if (!expiresAt) {
    return false;
  }

  return Date.now() >= expiresAt.getTime();
}

/**
 * A route is allowed through when a token exists (Redux state, falling back
 * to localStorage) and, if it's a JWT, has not expired.
 */
export function isAuthTokenValid(reduxToken) {
  const token = reduxToken ?? getStoredToken();

  if (!token) {
    return false;
  }

  return !isTokenExpired(token);
}
