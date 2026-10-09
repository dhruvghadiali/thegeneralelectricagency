import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  query: "",
  activeIndex: 0,
};

const keyboardNavigationSlice = createSlice({
  name: "keyboardNavigation",
  initialState,
  reducers: {
    keyboardNavigationOpened(state) {
      state.isOpen = true;
      state.query = "";
      state.activeIndex = 0;
    },
    keyboardNavigationClosed() {
      return initialState;
    },
    keyboardNavigationQueryChanged(state, action) {
      state.query = action.payload;
      state.activeIndex = 0;
    },
    keyboardNavigationActiveIndexChanged(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const {
  keyboardNavigationActiveIndexChanged,
  keyboardNavigationClosed,
  keyboardNavigationOpened,
  keyboardNavigationQueryChanged,
} = keyboardNavigationSlice.actions;

export default keyboardNavigationSlice.reducer;
