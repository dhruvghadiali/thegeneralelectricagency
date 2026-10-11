let backwardNavigationState = null;
let removeFieldListeners = null;

function clearBackwardNavigationState() {
  removeFieldListeners?.();
  removeFieldListeners = null;
  backwardNavigationState = null;
}

function selectFieldValue(field) {
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
  field.addEventListener("pointerdown", markAsEdited);
  field.addEventListener("blur", clearState);
  removeFieldListeners = () => {
    field.removeEventListener("input", markAsEdited);
    field.removeEventListener("pointerdown", markAsEdited);
    field.removeEventListener("blur", clearState);
  };

  window.requestAnimationFrame(() => {
    if (document.activeElement !== field) return;
    field.select?.();
  });
}

function handlePreviousFieldKeyboardNavigation(event, previousFieldRef) {
  const isBackwardKey =
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    (event.key === "Backspace" || event.key === "Delete");

  if (!isBackwardKey) return false;

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
