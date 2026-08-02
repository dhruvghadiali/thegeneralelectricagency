import { createSlice } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums/role.enum";
import { signIn } from "@/store/auth/authAction";

const AUTH_STORAGE_KEY = "auth";

function readStoredAuth() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? "null");
  } catch {
    return null;
  }
}

function persistAuthSession(username, token, role) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ username, token, role }));
  } catch {
    // Storage can be unavailable (private browsing) - session stays in memory.
  }
}

function clearAuthSession() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Nothing to clean up if storage was never available.
  }
}

const stored = readStoredAuth();

const initialState = {
  username: stored?.username ?? null,
  token: stored?.token ?? null,
  role: stored?.role ?? null,
  isAuthenticated: Boolean(stored?.username),
  isPasswordVisible: false,
  isSigningIn: false,
  signInError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    togglePasswordVisibility(state) {
      state.isPasswordVisible = !state.isPasswordVisible;
    },
    loginSucceeded(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token ?? null;
      state.role = action.payload.role ?? null;
      state.isAuthenticated = true;
      state.isPasswordVisible = false;

      persistAuthSession(action.payload.username, action.payload.token ?? null, action.payload.role ?? null);
    },
    loggedOut(state) {
      state.username = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isPasswordVisible = false;

      clearAuthSession();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isSigningIn = true;
        state.signInError = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const username =
          action.payload?.user?.username ?? action.payload?.username ?? null;
        const token = action.payload?.token ?? null;
        // Only the super-admin sign-in endpoint is wired up today - once
        // employee/warehouse-manager sign-in exists, thread the actual role
        // through the thunk's payload instead of hardcoding it here.
        const role = ROLE_PATHS.SUPER_ADMIN;

        state.isSigningIn = false;
        state.signInError = null;
        state.username = username;
        state.token = token;
        state.role = role;
        state.isAuthenticated = Boolean(token);

        persistAuthSession(username, token, role);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isSigningIn = false;
        state.signInError = action.payload ?? "Invalid username or password.";
      });
  },
});

export const { togglePasswordVisibility, loginSucceeded, loggedOut } = authSlice.actions;
export default authSlice.reducer;
