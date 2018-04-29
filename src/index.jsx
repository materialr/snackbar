import { MDCSnackbar } from '@material/snackbar';
import { strings } from '@material/snackbar/constants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/snackbar/mdc-snackbar.scss';

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.snackbar = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.snackbarShow = this.snackbarShow.bind(this);
  }
  componentDidMount() {
    const { HIDE_EVENT, SHOW_EVENT } = strings;
    const { onHide, onShow } = this.props;
    this.snackbar = new MDCSnackbar(this.elementRoot);
    if (onHide) {
      this.snackbar.listen(HIDE_EVENT, onHide);
    }
    if (onShow) {
      this.snackbar.listen(SHOW_EVENT, onShow);
    }
    this.snackbarShow();
  }
  componentWillUnmount() {
    const { HIDE_EVENT, SHOW_EVENT } = strings;
    const { onHide, onShow } = this.props;
    if (onHide) {
      this.snackbar.unlisten(HIDE_EVENT, onHide);
    }
    if (onShow) {
      this.snackbar.unlisten(SHOW_EVENT, onShow);
    }
    this.snackbar.destroy();
  }
  getClassNames() {
    const { alignStart, className } = this.props;
    return classnames({
      'mdc-snackbar': true,
      'mdc-snackbar--align-start': alignStart,
      [className]: !!className,
    });
  }
  snackbarShow() {
    const {
      actionHandler,
      actionText,
      message,
      multiline,
      multilineActionOnBottom,
      timeout,
    } = this.props;
    this.snackbar.show({
      actionHandler,
      actionText,
      message,
      multiline,
      multilineActionOnBottom,
      timeout,
    });
  }
  render() {
    const { getClassNames } = this;
    return (
      <div
        aria-live="assertive"
        aria-atomic="true"
        className={getClassNames()}
        ref={(elementRoot) => { this.elementRoot = elementRoot; }}
      >
        <div className="mdc-snackbar__text" />
        <div className="mdc-snackbar__action-wrapper">
          <button className="mdc-snackbar__action-button" type="button" />
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
  onHide: undefined,
  onShow: undefined,
  timeout: 2750,
};

export default Snackbar;
