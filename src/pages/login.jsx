// third-party imports
import React, { Component } from 'react';
import {withRouter } from 'react-router-dom'

// imports
import { TEXTS } from '../constants';
import InputOneLine from '../components/input_one_line';
import Button from '../components/button';
import { validateExistence } from '../components/validation_rules';
import server from '../components/server';

// style imports
import styles from './login_and_signup.module.css';

class Login extends Component {

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
            className={styles.input_one_line}
            placeholder="Email"
            text={this.state.email}
            validationRules={[ validateExistence ]}
            onTextChange={this._handleEmailTextChange} />
          <InputOneLine
            className={styles.input_one_line}
            placeholder="Password"
            text={this.state.password}
            validationRules={[ validateExistence ]}
            password
            onTextChange={this._handlePasswordTextChange} />

          <div className={styles.spacer} />

          <Button
            className={styles.button}
            label="Login"
            onClick={this._handleLogin} />

          <div className={styles.panel_footer_container}>
            <p>Don't have an account?</p>
            <p
              className={styles.link_to_signup}
              onClick={this._navToSignup}>
              Signup
            </p>
          </div>

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

  _navToSignup = () => {
    this.props.history.push('/signup');
  }

  _handleLogin = () => {
    server.createUserToken(
      { email: this.state.email, password: this.state.password },
      this._createUserTokenSuccessCallback,
      this._createUserTokenFailCallback
    );
  }
  _createUserTokenSuccessCallback = (data) => {
    // store user id and key in local storage
    localStorage.user_token = data.user_token;

    // navigate to main page
    this.props.history.push('/');
  }
  _createUserTokenFailCallback = () => {

  }

}

export default withRouter(Login);
