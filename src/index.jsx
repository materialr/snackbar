import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/snackbar/mdc-snackbar.scss';

import snackbarFoundation from './foundation';

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.actionButton = undefined;
    this.componentIsMounted = undefined;
    this.snackbar = undefined;
    this.snackbarFoundation = undefined;
    this.state = {
      actionButtonAriaHidden: 'false',
      actionButtonText: '',
      snackbarAriaHidden: 'false',
      snackbarText: '',
      classNames: [],
    };
    this.getActionButtonAriaHiddenProp = this.getActionButtonAriaHiddenProp.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.getSnackbarAriaHiddenProp = this.getSnackbarAriaHiddenProp.bind(this);
    this.snackbarCreate = this.snackbarCreate.bind(this);
    this.snackbarDestroy = this.snackbarDestroy.bind(this);
    this.snackbarShow = this.snackbarShow.bind(this);
    this.updateActionButtonAriaHidden = this.updateActionButtonAriaHidden.bind(this);
    this.updateActionButtonText = this.updateActionButtonText.bind(this);
    this.updateClassNames = this.updateClassNames.bind(this);
    this.updateSnackbarAriaHidden = this.updateSnackbarAriaHidden.bind(this);
    this.updateSnackbarText = this.updateSnackbarText.bind(this);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    this.snackbarCreate();
    this.snackbarShow();
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
    this.snackbarDestroy();
  }
  getActionButtonAriaHiddenProp() {
    return this.state.actionButtonAriaHidden === 'true' ? { 'aria-hidden': 'true' } : {};
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()} ${this.props.className}`
      .trim().replace('  ', ' ');
  }
  getClassNamesFromProps() {
    return classnames({
      'mdc-snackbar': true,
      'mdc-snackbar--align-start': this.props.alignStart,
    });
  }
  getClassNames() {
    return this.state.classNames.join(' ');
  }
  getSnackbarAriaHiddenProp() {
    return this.state.snackbarAriaHidden === 'true' ? { 'aria-hidden': 'true' } : {};
  }
  snackbarCreate() {
    this.snackbarFoundation = snackbarFoundation({
      elementActionButton: this.actionButton,
      elementSnackbar: this.snackbar,
      notifyHide: this.props.onHide,
      notifyShow: this.props.onShow,
      updateActionButtonAriaHidden: this.updateActionButtonAriaHidden,
      updateActionButtonText: this.updateActionButtonText,
      updateClassNames: this.updateClassNames,
      updateSnackbarAriaHidden: this.updateSnackbarAriaHidden,
      updateSnackbarText: this.updateSnackbarText,
    });
    this.snackbarFoundation.init();
  }
  snackbarDestroy() {
    this.snackbarFoundation.destroy();
    this.snackbarFoundation = undefined;
  }
  snackbarShow() {
    this.snackbarFoundation.show({
      actionHandler: this.props.actionHandler,
      actionOnBottom: this.props.multilineActionOnBottom,
      actionText: this.props.actionText,
      message: this.props.message,
      multiline: this.props.multiline,
      timeout: this.props.timeout,
    });
  }
  updateActionButtonAriaHidden(actionButtonAriaHidden) {
    this.setState({ actionButtonAriaHidden });
  }
  updateActionButtonText(actionButtonText) {
    this.setState({ actionButtonText });
  }
  updateClassNames(classNames) {
    if (this.componentIsMounted) {
      this.setState({ classNames });
    }
  }
  updateSnackbarAriaHidden(snackbarAriaHidden) {
    this.setState({ snackbarAriaHidden });
  }
  updateSnackbarText(snackbarText) {
    this.setState({ snackbarText });
  }
  render() {
    return (
      <div
        aria-live="assertive"
        aria-atomic="true"
        {...this.getSnackbarAriaHiddenProp}
        className={this.getClassNamesAsString()}
        ref={(snackbar) => { this.snackbar = snackbar; }}
      >
        <div className="mdc-snackbar__text">{this.state.snackbarText}</div>
        <div className="mdc-snackbar__action-wrapper">
          <button
            {...this.getActionButtonAriaHiddenProp()}
            className="mdc-snackbar__action-button"
            ref={(actionButton) => { this.actionButton = actionButton; }}
            type="button"
          >
            {this.state.actionButtonText}
          </button>
        </div>
      </div>
    );
  }
}

Snackbar.propTypes = {
  actionHandler: PropTypes.func,
  actionText: PropTypes.string,
  alignStart: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  multilineActionOnBottom: PropTypes.bool,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  timeout: PropTypes.number,
};

Snackbar.defaultProps = {
  actionHandler: undefined,
  actionText: undefined,
  alignStart: false,
  className: undefined,
  multiline: false,
  multilineActionOnBottom: false,
  onHide: () => {},
  onShow: () => {},
  timeout: 2750,
};

export default Snackbar;
