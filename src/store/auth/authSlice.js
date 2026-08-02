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

      try {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ username: action.payload.username, token: action.payload.token ?? null })
        );
      } catch {
        // Storage can be unavailable (private browsing) - session stays in memory.
      }
    },
    loggedOut(state) {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isPasswordVisible = false;

      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        // Nothing to clean up if storage was never available.
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isSigningIn = true;
        state.signInError = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isSigningIn = false;
        state.signInError = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isSigningIn = false;
        state.signInError = action.payload ?? "Invalid username or password.";
      });
  },
});

export const { togglePasswordVisibility, loginSucceeded, loggedOut } = authSlice.actions;
export default authSlice.reducer;
