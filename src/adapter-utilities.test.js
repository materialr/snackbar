import {
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
} from './adapter-utilities';

const CLASS_NAME_1 = 'CLASS_NAME_1';
const CLASS_NAME_2 = 'CLASS_NAME_2';

test('\'addClass()\' adds a className and sends the list to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [CLASS_NAME_1, CLASS_NAME_2];
  const updateClassNames = jest.fn();

  addClass(updateClassNames)(CLASS_NAME_1);
  addClass(updateClassNames)(CLASS_NAME_2);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'deregisterInteractionHandler()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  deregisterInteractionHandler(element, TYPE)(HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'deregisterInteractionHandlerAny()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  deregisterInteractionHandlerAny(element)(TYPE, HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'registerInteractionHandler()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandler(element, TYPE)(HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandler()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandler(element, TYPE)(HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});

test('\'registerInteractionHandlerAny()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandlerAny(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandlerAny()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandlerAny(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});

test('\'removeClass()\' removes a classNames and sends the list of classNames to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [];
  const updateClassNames = jest.fn();

  removeClass(updateClassNames)(CLASS_NAME_2);
  removeClass(updateClassNames)(CLASS_NAME_1);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'setActionAriaHidden()\' sets the aria-hidden value to \'true\'', () => {
  const updateActionButtonAriaHidden = jest.fn();
  const expected = 'true';

  setActionAriaHidden(updateActionButtonAriaHidden)();
  const actual = updateActionButtonAriaHidden.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'setActionText()\' sets the text of the action button', () => {
  const TEXT = 'TEXT';
  const updateActionButtonText = jest.fn();
  const expected = TEXT;

  setActionText(updateActionButtonText)(TEXT);
  const actual = updateActionButtonText.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'setAriaHidden()\' sets the aria-hidden value to \'true\'', () => {
  const updateSnackbarAriaHidden = jest.fn();
  const expected = 'true';

  setAriaHidden(updateSnackbarAriaHidden)();
  const actual = updateSnackbarAriaHidden.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'setFocus()\' sets focus on the action button element', () => {
  const focus = jest.fn();
  const element = { focus };
  const expected = 1;

  setFocus(element)();
  const actual = focus.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'setMessageText()\' sets the text of the snackbar', () => {
  const TEXT = 'TEXT';
  const updateSnackbarText = jest.fn();
  const expected = TEXT;

  setMessageText(updateSnackbarText)(TEXT);
  const actual = updateSnackbarText.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'unsetActionAriaHidden()\' sets the aria-hidden value to \'false\'', () => {
  const updateActionButtonAriaHidden = jest.fn();
  const expected = 'false';

  unsetActionAriaHidden(updateActionButtonAriaHidden)();
  const actual = updateActionButtonAriaHidden.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'unsetAriaHidden()\' sets the aria-hidden value to \'false\'', () => {
  const updateSnackbarAriaHidden = jest.fn();
  const expected = 'false';

  unsetAriaHidden(updateSnackbarAriaHidden)();
  const actual = updateSnackbarAriaHidden.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'visibilityIsHidden()\' returns whether the document is visible', () => {
  const expected = false;

  const actual = visibilityIsHidden()();

  expect(actual).toBe(expected);
});
