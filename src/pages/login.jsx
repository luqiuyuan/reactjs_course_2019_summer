// third-party imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// imports
import { TEXTS } from '../constants';
import InputOneLine from '../components/input_one_line';
import { ButtonSquare } from '../components/buttons';
import { validateExistence } from '../components/validation_rules';
import server from '../components/server';
import withPopup from '../components/popup';

// style imports
import styles from './login_signup.module.css';

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
            ref={ref => this._email_input = ref}
            className={styles.input_one_line}
            placeholder="Email"
            text={this.state.email}
            validationRules={[ validateExistence ]}
            onTextChange={this._handleEmailTextChange} />
          <InputOneLine
            ref={ref => this._password_input = ref}
            className={styles.input_one_line}
            placeholder="Password"
            text={this.state.password}
            validationRules={[ validateExistence ]}
            password
            onTextChange={this._handlePasswordTextChange} />

          <div className={styles.spacer} />

          <ButtonSquare
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
    let is_email_valid = this._email_input && this._email_input.isValid();
    let is_password_valid = this._password_input && this._password_input.isValid();
    if (is_email_valid && is_password_valid) {
      server.createUserToken(
        { email: this.state.email, password: this.state.password },
        this._createUserTokenSuccessCallback,
        this._createUserTokenFailCallback
      );
    } else {
      this.props.popup.alert("Please correct the input errors.");
    }
  }
  _createUserTokenSuccessCallback = (data) => {
    // store user id and key in local storage
    localStorage.user_token = data.user_token;

    // navigate to main page
    this.props.history.push('/');
  }
  _createUserTokenFailCallback = () => {
    this.props.popup.alert("Email or password is wrong.");
  }

}

export default withRouter(withPopup(Login));
