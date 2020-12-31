// third-party imports
import React, { Component } from 'react';

// imports
import { TEXTS } from '../constants';

// style imports
import styles from './login_and_signup.module.css';

export default class Login extends Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>

          <p className={styles.title}>{TEXTS.APP_TITLE}</p>

        </div>
      </div>
    );
  }

}
