const PASSIVE_EVENT_LISTENERS = ['touchstart'];

export default () => {
  let classNames = [];

  const deregisterInteractionHandler = (element, type) => handler =>
    element.removeEventListener(type, handler);
  const registerInteractionHandler = (element, type) => handler =>
    element.addEventListener(
      type,
      handler,
      PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
    );

  return {
    addClass: updateClassNames => (className) => {
      classNames = [...classNames, className];
      updateClassNames(classNames);
    },
    deregisterInteractionHandler,
    deregisterInteractionHandlerAny: element => (type, handler) =>
      deregisterInteractionHandler(element, type)(handler),
    registerInteractionHandler,
    registerInteractionHandlerAny: element => (type, handler) =>
      registerInteractionHandler(element, type)(handler),
    removeClass: updateClassNames => (className) => {
      classNames = classNames.filter(currentClassName => currentClassName !== className);
      updateClassNames(classNames);
    },
    setActionAriaHidden: updateActionButtonAriaHidden => () =>
      updateActionButtonAriaHidden('true'),
    setActionText: updateActionButtonText => text => updateActionButtonText(text),
    setAriaHidden: updateSnackbarAriaHidden => () => updateSnackbarAriaHidden('true'),
    setFocus: elementActionButton => () => elementActionButton.focus(),
    setMessageText: updateSnackbarText => text => updateSnackbarText(text),
    unsetActionAriaHidden: updateActionButtonAriaHidden => () =>
      updateActionButtonAriaHidden('false'),
    unsetAriaHidden: updateSnackbarAriaHidden => () => updateSnackbarAriaHidden('false'),
    visibilityIsHidden: () => () => document.hidden,
  };
};
