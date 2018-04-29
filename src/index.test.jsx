import * as snackbar from '@material/snackbar';
import { strings } from '@material/snackbar/constants';
import { mount, shallow } from 'enzyme';
import React from 'react';

import Snackbar from './index';

const MESSAGE = 'MESSAGE';

test('Renders the default classNames', () => {
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const expected = 'mdc-snackbar';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additions classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLAS_NAME';
  const wrapper = shallow(
    <Snackbar className={CLASS_NAME} message={MESSAGE} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-snackbar ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders a start-aligned snackbar', () => {
  const wrapper = shallow(
    <Snackbar alignStart message={MESSAGE} />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-snackbar mdc-snackbar--align-start';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Creates the MDCSnackbar component on mount', () => {
  const listen = jest.fn();
  const show = () => {};
  const MDCSnackbar = jest.fn();
  MDCSnackbar.mockImplementation(() => ({ listen, show }));
  snackbar.MDCSnackbar = MDCSnackbar;
  const wrapper = mount(<Snackbar message={MESSAGE} />);
  const instance = wrapper.instance();
  const expectedListen = 0;
  const expectedMDCSnackbar = instance.elementRoot;

  const actualListen = listen.mock.calls.length;
  const actualMDCSnackbar = MDCSnackbar.mock.calls[0][0];

  expect(actualListen).toBe(expectedListen);
  expect(actualMDCSnackbar).toBe(expectedMDCSnackbar);
});

test('Destroys the MDCSnackbar component on unmount', () => {
  const destroy = jest.fn();
  const show = () => {};
  const unlisten = jest.fn();
  const MDCSnackbar = jest.fn();
  snackbar.MDCSnackbar = MDCSnackbar;
  MDCSnackbar.mockImplementation(() => ({ destroy, show, unlisten }));
  const wrapper = mount(<Snackbar message={MESSAGE} />);
  const expectedDestroy = 1;
  const expectedUnlisten = 0;

  wrapper.unmount();
  const actualDestroy = destroy.mock.calls.length;
  const actualUnlisten = unlisten.mock.calls.length;

  expect(actualDestroy).toBe(expectedDestroy);
  expect(actualUnlisten).toBe(expectedUnlisten);
});

test('Adds hide and show event listeners on mount', () => {
  const ON_HIDE = () => 'ON_HIDE';
  const ON_SHOW = () => 'ON_SHOW';
  const listen = jest.fn();
  const show = () => {};
  const MDCSnackbar = jest.fn();
  MDCSnackbar.mockImplementation(() => ({ listen, show }));
  snackbar.MDCSnackbar = MDCSnackbar;
  mount(<Snackbar message={MESSAGE} onHide={ON_HIDE} onShow={ON_SHOW} />);
  const expectedListenHideOne = strings.HIDE_EVENT;
  const expectedListenHideTwo = ON_HIDE;
  const expectedListenShowOne = strings.SHOW_EVENT;
  const expectedListenShowTwo = ON_SHOW;

  const mockListenCalls = listen.mock.calls;
  const mockListenCallsHide = mockListenCalls[0];
  const mockListenCallsShow = mockListenCalls[1];
  const actualListenHideOne = mockListenCallsHide[0];
  const actualListenHideTwo = mockListenCallsHide[1];
  const actualListenShowOne = mockListenCallsShow[0];
  const actualListenShowTwo = mockListenCallsShow[1];

  expect(actualListenHideOne).toBe(expectedListenHideOne);
  expect(actualListenHideTwo).toBe(expectedListenHideTwo);
  expect(actualListenShowOne).toBe(expectedListenShowOne);
  expect(actualListenShowTwo).toBe(expectedListenShowTwo);
});

test('Removes hide and show event listeners on unmount', () => {
  const ON_HIDE = () => 'ON_HIDE';
  const ON_SHOW = () => 'ON_SHOW';
  const destroy = () => {};
  const listen = () => {};
  const show = () => {};
  const unlisten = jest.fn();
  const MDCSnackbar = jest.fn();
  MDCSnackbar.mockImplementation(() => ({ destroy, listen, show, unlisten }));
  snackbar.MDCSnackbar = MDCSnackbar;
  const wrapper = mount(<Snackbar message={MESSAGE} onHide={ON_HIDE} onShow={ON_SHOW} />);
  const expectedUnlistenHideOne = strings.HIDE_EVENT;
  const expectedUnlistenHideTwo = ON_HIDE;
  const expectedUnlistenShowOne = strings.SHOW_EVENT;
  const expectedUnlistenShowTwo = ON_SHOW;

  wrapper.unmount();
  const mockUnlistenCalls = unlisten.mock.calls;
  const mockUnlistenCallsHide = mockUnlistenCalls[0];
  const mockUnlistenCallsShow = mockUnlistenCalls[1];
  const actualUnlistenHideOne = mockUnlistenCallsHide[0];
  const actualUnlistenHideTwo = mockUnlistenCallsHide[1];
  const actualUnlistenShowOne = mockUnlistenCallsShow[0];
  const actualUnlistenShowTwo = mockUnlistenCallsShow[1];

  expect(actualUnlistenHideOne).toBe(expectedUnlistenHideOne);
  expect(actualUnlistenHideTwo).toBe(expectedUnlistenHideTwo);
  expect(actualUnlistenShowOne).toBe(expectedUnlistenShowOne);
  expect(actualUnlistenShowTwo).toBe(expectedUnlistenShowTwo);
});

test('Shows the MDCSnackbar component on mount', () => {
  const ACTION_HANDLER = () => 'ACTION_HANDLER';
  const ACTION_TEXT = 'ACTION_TEXT';
  const MULTILINE = true;
  const MULTILINE_ACTION_ON_BOTTOM = true;
  const TIMEOUT = 3000;
  const listen = () => {};
  const show = jest.fn();
  const MDCSnackbar = jest.fn();
  MDCSnackbar.mockImplementation(() => ({ listen, show }));
  snackbar.MDCSnackbar = MDCSnackbar;
  mount(
    <Snackbar
      actionHandler={ACTION_HANDLER}
      actionText={ACTION_TEXT}
      message={MESSAGE}
      multiline={MULTILINE}
      multilineActionOnBottom={MULTILINE_ACTION_ON_BOTTOM}
      timeout={TIMEOUT}
    />,
  );
  const expected = {
    actionHandler: ACTION_HANDLER,
    actionText: ACTION_TEXT,
    message: MESSAGE,
    multiline: MULTILINE,
    multilineActionOnBottom: MULTILINE_ACTION_ON_BOTTOM,
    timeout: TIMEOUT,
  };

  const actual = show.mock.calls[0][0];

  expect(actual).toEqual(expected);
});
