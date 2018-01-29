import { MDCSnackbarFoundation } from '@material/snackbar';

import {
  addClass,
  deregisterInteractionHandler,
  registerInteractionHandler,
  removeClass,
  setActionAriaHidden,
  setActionText,
  setAriaHidden,
  setFocus,
  setMessageText,
  unsetActionAriaHidden,
  unsetAriaHidden,
  visibilityIsHidden,
} from './adapter-utilities';

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
}) => new MDCSnackbarFoundation({
  addClass: addClass(updateClassNames),
  deregisterActionClickHandler:
    handler => deregisterInteractionHandler(elementActionButton)('click', handler),
  deregisterCapturedBlurHandler:
    handler => deregisterInteractionHandler(elementActionButton)('blur', handler),
  deregisterCapturedInteractionHandler: deregisterInteractionHandler(document.body),
  deregisterTransitionEndHandler:
    handler => deregisterInteractionHandler(elementSnackbar)('transitionend', handler),
  deregisterVisibilityChangeHandler:
    handler => deregisterInteractionHandler(document)('visibilitychange', handler),
  notifyHide,
  notifyShow,
  registerActionClickHandler:
    handler => registerInteractionHandler(elementActionButton)('click', handler),
  registerCapturedBlurHandler:
    handler => registerInteractionHandler(elementActionButton)('blur', handler),
  registerCapturedInteractionHandler: registerInteractionHandler(document.body),
  registerTransitionEndHandler:
    handler => registerInteractionHandler(elementSnackbar)('transitionend', handler),
  registerVisibilityChangeHandler:
    handler => registerInteractionHandler(document)('visibilitychange', handler),
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
