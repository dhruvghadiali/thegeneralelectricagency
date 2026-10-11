import { createSlice } from "@reduxjs/toolkit";

import { signIn } from "@/store/auth/auth.action";

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

function persistAuthSession(session) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
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
  firstName: stored?.firstName ?? null,
  lastName: stored?.lastName ?? null,
  phone: stored?.phone ?? stored?.phoneNumber ?? stored?.mobile ?? null,
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
      state.firstName = action.payload.firstName ?? null;
      state.lastName = action.payload.lastName ?? null;
      state.phone = action.payload.phone ?? null;
      state.isAuthenticated = true;
      state.isPasswordVisible = false;

      persistAuthSession({
        username: action.payload.username,
        token: action.payload.token ?? null,
        role: action.payload.role ?? null,
        firstName: action.payload.firstName ?? null,
        lastName: action.payload.lastName ?? null,
        phone: action.payload.phone ?? null,
      });
    },
    loggedOut(state) {
      state.username = null;
      state.token = null;
      state.role = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.isAuthenticated = false;
      state.isPasswordVisible = false;
      state.isSigningIn = false;
      state.signInError = null;

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
        const role = action.payload?.role ?? null;
        const firstName = action.payload?.firstName ?? null;
        const lastName = action.payload?.lastName ?? null;
        const phone = action.payload?.phone ?? null;

        state.isSigningIn = false;
        state.signInError = null;
        state.username = username;
        state.token = token;
        state.role = role;
        state.firstName = firstName;
        state.lastName = lastName;
        state.phone = phone;
        state.isAuthenticated = Boolean(token);

        persistAuthSession({
          username,
          token,
          role,
          firstName,
          lastName,
          phone,
        });
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isSigningIn = false;
        state.signInError = action.payload ?? "Invalid username or password.";
      });
  },
});

export const { togglePasswordVisibility, loginSucceeded, loggedOut } = authSlice.actions;
export default authSlice.reducer;
