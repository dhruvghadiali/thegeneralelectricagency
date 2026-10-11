let backwardNavigationState = null;
let removeFieldListeners = null;

function clearBackwardNavigationState() {
  removeFieldListeners?.();
  removeFieldListeners = null;
  backwardNavigationState = null;
}

function selectFieldValue(field, { markPointerAsEdited = true } = {}) {
  field.focus();

  const markAsEdited = () => {
    if (backwardNavigationState?.field === field) {
      backwardNavigationState.edited = true;
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
  if (markPointerAsEdited) {
    field.addEventListener("pointerdown", markAsEdited);
  }
  field.addEventListener("blur", clearState);
  removeFieldListeners = () => {
    field.removeEventListener("input", markAsEdited);
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

export function selectFieldValueForReplacement(field) {
  selectFieldValue(field, { markPointerAsEdited: false });
}

export function shouldNavigateBackwardFromSelectedField(event) {
  if (!isBackwardNavigationKey(event)) return false;

  const currentFieldState =
    backwardNavigationState?.field === event.currentTarget
      ? backwardNavigationState
      : null;

  return Boolean(currentFieldState && !currentFieldState.edited);
}

function handlePreviousFieldKeyboardNavigation(event, previousFieldRef) {
  if (!isBackwardNavigationKey(event)) return false;

  const currentFieldState =
    backwardNavigationState?.field === event.currentTarget
      ? backwardNavigationState
      : null;

  if (currentFieldState?.edited) return false;

  const previousField = previousFieldRef.current;
  if (!previousField) return false;

  event.preventDefault();
  selectFieldValue(previousField);
  return true;
}

export default handlePreviousFieldKeyboardNavigation;
