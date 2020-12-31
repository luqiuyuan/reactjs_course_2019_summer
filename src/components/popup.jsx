// third-party imports
import React, { Component } from 'react';

// imports
import { ButtonRoundCross } from './buttons';

// style imports
import styles from './popup.module.css';

export default function withPopup(Component) {
  class WrappedComponent extends Component {
    state = {
      popup: null,
    }

    render() {
      return (
        <>
          <Popup ref={this._getPopupRef} />
          <Component
            popup={this.state.popup}
            {...this.props} />
        </>
      );
    }

    _getPopupRef = (ref) => {
      if (!this.state.popup) {
        this.setState({ popup: ref });
      }
    }
  }

  return WrappedComponent;
}

class Popup extends Component {

  state = {
    should_show: false,
    content: null,
  }

  render() {
    if (this.state.should_show) {
      return (
        <div
          className={styles.container}
          onClick={this._handleClose}>

          <div
            className={styles.panel}
            onClick={this._handleClickOnPanel}>
            {this.state.content}
          </div>

        </div>
      );
    } else {
      return null;
    }
  }

  alert = (msg) => {
    this.setState({
      should_show: true,
      content: <AlertPopup msg={msg} onClose={this._handleClose} />,
    });
  }

  _handleClose = (event) => {
    this.setState({ should_show: false });
  }

  _handleClickOnPanel = (event) => {
    event.stopPropagation();
  }

}

class AlertPopup extends Component {

  render() {
    return (
      <div className={styles.alert_popup_container}>
        <p className={styles.alert_popup_msg}>{this.props.msg}</p>
        <ButtonRoundCross
          className={styles.alert_popup_button}
          onClick={this.props.onClose} />
      </div>
    );
  }

}
