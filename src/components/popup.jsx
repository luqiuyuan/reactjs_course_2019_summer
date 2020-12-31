// third-party imports
import React, { Component } from 'react';

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

          <div className={styles.panel}>
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
      content: <AlertPopup msg={msg} />,
    });
  }

  _handleClose = () => {
    this.setState({ should_show: false });
  }

}

class AlertPopup extends Component {

  render() {
    return (
      <div>
        <p>{this.props.msg}</p>
      </div>
    );
  }

}
