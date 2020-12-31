// third-party imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// imports
import { TEXTS } from '../constants';
import Avatar from './avatar';

// style imports
import styles from './header.module.css';

class Header extends Component {

  render() {
    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <p onClick={this._navToMainPage} className={styles.logo}>{TEXTS.APP_TITLE}</p>
        <Avatar className={styles.avatar} />
      </div>
    );
  }

  _navToMainPage = () => {
    this.props.history.push('/');
  }

}

export default withRouter(Header);
