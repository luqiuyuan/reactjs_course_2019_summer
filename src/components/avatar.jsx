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
        src={this.props.src? this.props.src : default_avatar} />
    );
  }

}

export default withRouter(Avatar);
