// third-party imports
import React, { Component } from 'react';

// imports
import { TEXTS } from '../constants';
import InputOneLine from '../components/input_one_line';
import Button from '../components/button';
import { validateExistence } from '../components/validation_rules';

// style imports
import styles from './login_and_signup.module.css';

export default class Login extends Component {

  state = {
    email: "",
    password: "",
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>

          <p className={styles.title}>{TEXTS.APP_TITLE}</p>

          <InputOneLine
            placeholder="Email"
            text={this.state.email}
            validationRules={[ validateExistence ]}
            onTextChange={this._handleEmailTextChange} />
          <InputOneLine
            placeholder="Password"
            text={this.state.password}
            validationRules={[ validateExistence ]}
            password
            onTextChange={this._handlePasswordTextChange} />

          <Button label="Login" />

        </div>
      </div>
    );
  }

  _handleEmailTextChange = (email) => {
    this.setState({ email });
  }

  _handlePasswordTextChange = (password) => {
    this.setState({ password });
  }

}
