import { createSlice } from "@reduxjs/toolkit";

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

function persistAuthSession(username, token) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ username, token }));
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
      state.isAuthenticated = true;
      state.isPasswordVisible = false;

      persistAuthSession(action.payload.username, action.payload.token ?? null);
    },
    loggedOut(state) {
      state.username = null;
      state.token = null;
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

        state.isSigningIn = false;
        state.signInError = null;
        state.username = username;
        state.token = token;
        state.isAuthenticated = Boolean(token);

        persistAuthSession(username, token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isSigningIn = false;
        state.signInError = action.payload ?? "Invalid username or password.";
      });
  },
});

export const { togglePasswordVisibility, loginSucceeded, loggedOut } = authSlice.actions;
export default authSlice.reducer;
