// third-party imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// imports
import { TEXTS } from '../constants';
import Avatar from './avatar';
import server from './server';

// style imports
import styles from './header.module.css';

class Header extends Component {

  constructor(props) {
    super(props);

    this._getOwnUser();
  }

  render() {
    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <p onClick={this._navToMainPage} className={styles.logo}>{TEXTS.APP_TITLE}</p>
        <Avatar
          className={styles.avatar}
          src={this.state?.user?.avatar_url} />
      </div>
    );
  }

  _navToMainPage = () => {
    this.props.history.push('/');
  }

  _getOwnUser = () => {
    server.getOwnUser(this._getOwnUserSuccessCallback);
  }
  _getOwnUserSuccessCallback = (data) => {
    this.setState({ user: data.user });
  }

}

export default withRouter(Header);
