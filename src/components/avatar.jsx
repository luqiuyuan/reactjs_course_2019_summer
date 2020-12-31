// third-party imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// import assets
import default_avatar from '../assets/images/avatar_default.jpg';

// style imports
import styles from './avatar.module.css';

class Avatar extends Component {

  render() {
    return (
      <img
        className={`${styles.image} ${this.props.className}`}
        alt="avatar"
        src={this.props.src? this.props.src : default_avatar}
        onClick={this._handleClick} />
    );
  }

  _handleClick = () => {
    if (this.props.userID) {
      this.props.history.push('/users/' + this.props.userID);
    } else {
      this.props.history.push('/profile');
    }
  }

}

export default withRouter(Avatar);
