let backwardNavigationState = null;
let removeFieldListeners = null;

function clearBackwardNavigationState() {
  removeFieldListeners?.();
  removeFieldListeners = null;
  backwardNavigationState = null;
}

export function clearPreviousFieldKeyboardNavigation() {
  clearBackwardNavigationState();
}

function selectFieldValue(field, { markPointerAsEdited = true } = {}) {
  field.focus();

  const markAsEdited = () => {
    if (backwardNavigationState?.field === field) {
      backwardNavigationState.edited = true;
    }
  };
  const markKeyboardInteraction = (event) => {
    if (!isBackwardNavigationKey(event)) {
      markAsEdited();
    }
  };
  const clearState = () => {
    if (backwardNavigationState?.field === field) {
      clearBackwardNavigationState();
    }
  };

  clearBackwardNavigationState();
  backwardNavigationState = { edited: false, field };

  field.addEventListener("input", markAsEdited);
  field.addEventListener("keydown", markKeyboardInteraction);
  if (markPointerAsEdited) {
    field.addEventListener("pointerdown", markAsEdited);
  }
  field.addEventListener("blur", clearState);
  removeFieldListeners = () => {
    field.removeEventListener("input", markAsEdited);
    field.removeEventListener("keydown", markKeyboardInteraction);
    if (markPointerAsEdited) {
      field.removeEventListener("pointerdown", markAsEdited);
    }
    field.removeEventListener("blur", clearState);
  };

  window.requestAnimationFrame(() => {
    if (document.activeElement !== field) return;
    field.select?.();
  });
}

function isBackwardNavigationKey(event) {
  return (
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    (event.key === "Backspace" || event.key === "Delete")
  );
}

export function selectFieldValueWithoutBackwardNavigation(field) {
  clearBackwardNavigationState();
  field.focus();

  window.requestAnimationFrame(() => {
    if (document.activeElement !== field) return;
    field.select?.();
  });
}

export function focusNextFormField(event, fieldRef) {
  const field = fieldRef.current;

  if (!field) return;

  if (event.key === "Tab" && !event.shiftKey) {
    selectFieldValue(field);
    return;
  }

  field.focus();
}

export function shouldNavigateBackwardFromSelectedField(event) {
  if (!isBackwardNavigationKey(event)) return false;

  const currentFieldState =
    backwardNavigationState?.field === event.currentTarget
      ? backwardNavigationState
      : null;

  return Boolean(currentFieldState && !currentFieldState.edited);
}

function handlePreviousFieldKeyboardNavigation(
  event,
  previousFieldRef,
  { requireTabNavigation = false } = {},
) {
  if (!isBackwardNavigationKey(event)) return false;

  const currentFieldState =
    backwardNavigationState?.field === event.currentTarget
      ? backwardNavigationState
      : null;

  if (
    currentFieldState?.edited ||
    (requireTabNavigation && !currentFieldState)
  )
    return false;

  const previousField = previousFieldRef.current;
  if (!previousField) return false;

  event.preventDefault();
  selectFieldValue(previousField);
  return true;
}

export default handlePreviousFieldKeyboardNavigation;
