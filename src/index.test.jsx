import { mount, shallow } from 'enzyme';
import React from 'react';

import snackbarFoundation from './foundation';
import Snackbar, { Empty } from './index';

const ACTION_HANDLER = () => 'ACTION_HANDLER';
const ACTION_TEXT = 'ACTION_TEXT';
const MESSAGE = 'MESSAGE';
const MULTILINE = true;
const MULTILINE_ACTION_ON_BOTTOM = true;
const ON_HIDE = () => 'ON_HIDE';
const ON_SHOW = () => 'ON_SHOW';
const TIMEOUT = 1000;

test('Renders the default classNames', () => {
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const expected = 'mdc-snackbar';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders classnames based on props', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <Snackbar alignStart className={CLASS_NAME} message={MESSAGE} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-snackbar mdc-snackbar--align-start ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Creates and shows the snackbar when the component mounts', () => {
  const snackbarCreate = jest.fn();
  const snackbarShow = jest.fn();
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedComponentIsMounted = true;
  const expectedSnackbarCreate = 1;
  const expectedSnackbarShow = 1;
  instance.snackbarCreate = snackbarCreate;
  instance.snackbarShow = snackbarShow;

  instance.componentDidMount();
  const actualComponentIsMounted = instance.componentIsMounted;
  const actualSnackbarCreate = snackbarCreate.mock.calls.length;
  const actualSnackbarShow = snackbarShow.mock.calls.length;

  expect(actualComponentIsMounted).toBe(expectedComponentIsMounted);
  expect(actualSnackbarCreate).toBe(expectedSnackbarCreate);
  expect(actualSnackbarShow).toBe(expectedSnackbarShow);
});

test('Destroys the snackbar foundation when the component unmounts', () => {
  const snackbarDestroy = jest.fn();
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedComponentIsMounted = false;
  const expectedSnackbarDestroy = 1;
  instance.snackbarDestroy = snackbarDestroy;

  instance.componentWillUnmount();
  const actualComponentIsMounted = instance.componentIsMounted;
  const actualSnackbarDestroy = snackbarDestroy.mock.calls.length;

  expect(actualComponentIsMounted).toBe(expectedComponentIsMounted);
  expect(actualSnackbarDestroy).toBe(expectedSnackbarDestroy);
});

test('Builds the aria-hidden prop for the action button when needed', () => {
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = { 'aria-hidden': 'true' };

  instance.setState({ actionButtonAriaHidden: 'true' });
  const actual = instance.getActionButtonAriaHiddenProp();

  expect(actual).toEqual(expected);
});

test('Builds an empty aria-hidden prop for the action button when not needed', () => {
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = {};

  instance.setState({ actionButtonAriaHidden: 'false' });
  const actual = instance.getActionButtonAriaHiddenProp();

  expect(actual).toEqual(expected);
});

test('Builds the aria-hidden prop for the snackbar when needed', () => {
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = { 'aria-hidden': 'true' };

  instance.setState({ snackbarAriaHidden: 'true' });
  const actual = instance.getSnackbarAriaHiddenProp();

  expect(actual).toEqual(expected);
});

test('Builds an empty aria-hidden prop for the snackbar when not needed', () => {
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = {};

  instance.setState({ snackbarAriaHidden: 'false' });
  const actual = instance.getSnackbarAriaHiddenProp();

  expect(actual).toEqual(expected);
});

test('Creates and shows the snackbar foundation correctly', () => {
  const wrapper = mount(
    <Snackbar
      actionHandler={ACTION_HANDLER}
      actionText={ACTION_TEXT}
      message={MESSAGE}
      multiline={MULTILINE}
      multilineActionOnBottom={MULTILINE_ACTION_ON_BOTTOM}
      onHide={ON_HIDE}
      onShow={ON_SHOW}
      timeout={TIMEOUT}
    />,
  );
  const instance = wrapper.instance();
  const props = wrapper.props();
  const expected = snackbarFoundation({
    elementActionButton: instance.actionButton,
    elementSnackbar: instance.snackbar,
    notifyHide: props.onHide,
    notifyShow: props.onShow,
    updateActionButtonAriaHidden: instance.updateActionButtonAriaHidden,
    updateActionButtonText: instance.updateActionButtonText,
    updateClassNames: instance.updateClassNames,
    updateSnackbarAriaHidden: instance.updateSnackbarAriaHidden,
    updateSnackbarText: instance.updateSnackbarText,
  });
  expected.init();
  expected.show({
    actionHandler: props.actionHandler,
    actionOnBottom: props.multilineActionOnBottom,
    actionText: props.actionText,
    message: props.message,
    multiline: props.multiline,
    timeout: props.timeout,
  });

  const actual = instance.snackbarFoundation;
  // eslint-disable-next-line no-underscore-dangle
  expected.timeoutId_ = actual.timeoutId_;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Destroys the snackbar correctly', () => {
  const destroy = jest.fn();
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedDestroy = 1;
  const expectedSnackbarFoundation = undefined;
  instance.snackbarFoundation = { destroy };

  instance.snackbarDestroy();
  const actualDestroy = destroy.mock.calls.length;
  const actualSnackbarFoundation = instance.snackbarFoundation;

  expect(actualDestroy).toBe(expectedDestroy);
  expect(actualSnackbarFoundation).toBe(expectedSnackbarFoundation);
});

test('Updates the action button\'s aria-hidden attribute', () => {
  const ACTION_BUTTON_ARIA_HIDDEN = 'ACTION_BUTTON_ARIA_HIDDEN';
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const expected = ACTION_BUTTON_ARIA_HIDDEN;

  wrapper.instance().updateActionButtonAriaHidden(ACTION_BUTTON_ARIA_HIDDEN);
  const actual = wrapper.state().actionButtonAriaHidden;

  expect(actual).toBe(expected);
});

test('Updates the action button\'s text attribute', () => {
  const ACTION_BUTTON_TEXT = 'ACTION_BUTTON_TEXT';
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const expected = ACTION_BUTTON_TEXT;

  wrapper.instance().updateActionButtonText(ACTION_BUTTON_TEXT);
  const actual = wrapper.state().actionButtonText;

  expect(actual).toBe(expected);
});

test('Updates the classNames if the component is mounted', () => {
  const CLASS_NAMES = ['CLASS_NAMES'];
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = CLASS_NAMES;
  instance.componentIsMounted = true;

  instance.updateClassNames(CLASS_NAMES);
  const actual = wrapper.state().classNames;

  expect(actual).toEqual(expected);
});

test('Does not update the classNames if the component is unmounted', () => {
  const CLASS_NAMES = ['CLASS_NAMES'];
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = [];
  instance.componentIsMounted = false;

  instance.updateClassNames(CLASS_NAMES);
  const actual = wrapper.state().classNames;

  expect(actual).toEqual(expected);
});

test('Updates the snackbar\'s aria-hidden attribute', () => {
  const SNACKBAR_ARIA_HIDDEN = 'SNACKBAR_ARIA_HIDDEN';
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const expected = SNACKBAR_ARIA_HIDDEN;

  wrapper.instance().updateSnackbarAriaHidden(SNACKBAR_ARIA_HIDDEN);
  const actual = wrapper.state().snackbarAriaHidden;

  expect(actual).toBe(expected);
});

test('Updates the snackbar\'s text attribute', () => {
  const SNACKBAR_TEXT = 'SNACKBAR_TEXT';
  const wrapper = shallow(<Snackbar message={MESSAGE} />, { disableLifecycleMethods: true });
  const expected = SNACKBAR_TEXT;

  wrapper.instance().updateSnackbarText(SNACKBAR_TEXT);
  const actual = wrapper.state().snackbarText;

  expect(actual).toBe(expected);
});

test('Loads default values for \'onHide\' and \'onShow\'', () => {
  const wrapper = mount(
    <Snackbar
      actionHandler={ACTION_HANDLER}
      actionText={ACTION_TEXT}
      message={MESSAGE}
      multiline={MULTILINE}
      multilineActionOnBottom={MULTILINE_ACTION_ON_BOTTOM}
      timeout={TIMEOUT}
    />,
  );
  const props = wrapper.props();

  const actualOnHide = props.onHide;
  const actualOnShow = props.onShow;

  expect(actualOnHide).toBe(Empty);
  expect(actualOnShow).toBe(Empty);
});
