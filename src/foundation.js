import { MDCSnackbarFoundation } from '@material/snackbar';

import adapterUtilities from './adapter-utilities';

export default ({
  elementActionButton,
  elementSnackbar,
  notifyHide,
  notifyShow,
  updateActionButtonAriaHidden,
  updateActionButtonText,
  updateClassNames,
  updateSnackbarAriaHidden,
  updateSnackbarText,
}) => {
  const {
    addClass,
    deregisterInteractionHandler,
    deregisterInteractionHandlerAny,
    registerInteractionHandler,
    registerInteractionHandlerAny,
    removeClass,
    setActionAriaHidden,
    setActionText,
    setAriaHidden,
    setFocus,
    setMessageText,
    unsetActionAriaHidden,
    unsetAriaHidden,
    visibilityIsHidden,
  } = adapterUtilities();

  return new MDCSnackbarFoundation({
    addClass: addClass(updateClassNames),
    deregisterActionClickHandler: deregisterInteractionHandler(elementActionButton, 'click'),
    deregisterCapturedBlurHandler: deregisterInteractionHandler(elementActionButton, 'blur'),
    deregisterCapturedInteractionHandler: deregisterInteractionHandlerAny(document.body),
    deregisterTransitionEndHandler: deregisterInteractionHandler(elementSnackbar, 'transitionend'),
    deregisterVisibilityChangeHandler: deregisterInteractionHandler(document, 'visibilitychange'),
    notifyHide,
    notifyShow,
    registerActionClickHandler: registerInteractionHandler(elementActionButton, 'click'),
    registerCapturedBlurHandler: registerInteractionHandler(elementActionButton, 'blur'),
    registerCapturedInteractionHandler: registerInteractionHandlerAny(document.body),
    registerTransitionEndHandler: registerInteractionHandler(elementSnackbar, 'transitionend'),
    registerVisibilityChangeHandler: registerInteractionHandler(document, 'visibilitychange'),
    removeClass: removeClass(updateClassNames),
    setActionAriaHidden: setActionAriaHidden(updateActionButtonAriaHidden),
    setActionText: setActionText(updateActionButtonText),
    setAriaHidden: setAriaHidden(updateSnackbarAriaHidden),
    setFocus: setFocus(elementActionButton),
    setMessageText: setMessageText(updateSnackbarText),
    unsetActionAriaHidden: unsetActionAriaHidden(updateActionButtonAriaHidden),
    unsetAriaHidden: unsetAriaHidden(updateSnackbarAriaHidden),
    visibilityIsHidden: visibilityIsHidden(),
  });
};
