const selectKeyboardNavigationState = (state) => state.keyboardNavigation;

export const selectKeyboardNavigationIsOpen = (state) =>
  selectKeyboardNavigationState(state).isOpen;

export const selectKeyboardNavigationQuery = (state) =>
  selectKeyboardNavigationState(state).query;

export const selectKeyboardNavigationActiveIndex = (state) =>
  selectKeyboardNavigationState(state).activeIndex;
