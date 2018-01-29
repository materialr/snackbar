const PASSIVE_EVENT_LISTENERS = ['touchstart'];
let classNames = [];

export const addClass = updateClassNames => (className) => {
  classNames = [...classNames, className];
  updateClassNames(classNames);
};

export const deregisterInteractionHandler = element => (type, handler) =>
  element.removeEventListener(type, handler);

export const registerInteractionHandler = element => (type, handler) =>
  element.addEventListener(
    type,
    handler,
    PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
  );

export const removeClass = updateClassNames => (className) => {
  classNames = classNames.filter(currentClassName => currentClassName !== className);
  updateClassNames(classNames);
};

export const setActionAriaHidden = updateActionButtonAriaHidden => () =>
  updateActionButtonAriaHidden('true');

export const setActionText = updateActionButtonText => text => updateActionButtonText(text);

export const setAriaHidden = updateSnackbarAriaHidden => () => updateSnackbarAriaHidden('true');

export const setFocus = elementActionButton => () => elementActionButton.focus();

export const setMessageText = updateSnackbarText => text => updateSnackbarText(text);

export const unsetActionAriaHidden = updateActionButtonAriaHidden => () =>
  updateActionButtonAriaHidden('false');

export const unsetAriaHidden = updateSnackbarAriaHidden => () => updateSnackbarAriaHidden('false');

export const visibilityIsHidden = () => () => document.hidden;
