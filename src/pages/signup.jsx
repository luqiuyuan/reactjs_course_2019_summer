// third-party imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// imports
import { TEXTS } from '../constants';
import Input from '../components/input';
import { ButtonSquare } from '../components/buttons';
import {
  validateExistence,
  validateEmailFormat,
  validateUpperCaseLetter,
  validateLowerCaseLetter,
  validateMinLength,
  validateMaxLength,
} from '../components/validation_rules';
import server from '../components/server';
import withPopup from '../components/popup';

// style imports
import styles from './login_signup.module.css';

class Signup extends Component {

  state = {
    email: "",
    password: "",
    name: "",
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>

          <p className={styles.title}>{TEXTS.APP_TITLE}</p>

          <Input
            ref={ref => this._email_input = ref}
            className={styles.input_one_line}
            placeholder="Email"
            text={this.state.email}
            validationRules={[ validateExistence, validateEmailFormat, (str) => validateMaxLength(str, 255) ]}
            onTextChange={this._handleEmailTextChange} />
          <Input
            ref={ref => this._password_input = ref}
            className={styles.input_one_line}
            placeholder="Password"
            text={this.state.password}
            validationRules={[ validateExistence, validateUpperCaseLetter, validateLowerCaseLetter, (str) => validateMinLength(str, 6), (str) => validateMaxLength(str, 10) ]}
            password
            onTextChange={this._handlePasswordTextChange} />
          <Input
            ref={ref => this._name_input = ref}
            className={styles.input_one_line}
            placeholder="Name"
            text={this.state.name}
            validationRules={[ (str) => validateMaxLength(str, 50) ]}
            onTextChange={this._handleNameTextChange} />

          <div className={styles.spacer} />

          <ButtonSquare
            className={styles.button}
            label="Signup"
            onClick={this._handleSignup} />

          <div className={styles.panel_footer_container}>
            <p>Already have an account?</p>
            <p
              className={styles.link_to_signup}
              onClick={this._navToLogin}>
              Login
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
  _handleNameTextChange = (name) => {
    this.setState({ name });
  }

  _navToLogin = () => {
    this.props.history.push('/login');
  }

  _handleSignup = () => {
    let is_email_valid = this._email_input && this._email_input.isValid();
    let is_password_valid = this._password_input && this._password_input.isValid();
    let is_name_valid = this._name_input && this._name_input.isValid();
    if (is_email_valid && is_password_valid && is_name_valid) {
      server.createUser(
        { email: this.state.email, password: this.state.password, name: this.state.name },
        this._createUserSuccessCallback,
        this._createUserFailCallback
      );
    } else {
      this.props.popup.alert("Please correct the input errors.");
    }
  }
  _createUserSuccessCallback = () => {
    this.props.history.push('/login');
  }
  _createUserFailCallback = () => {
    this.props.popup.alert("The email has been used.");
  }

}

export default withRouter(withPopup(Signup));
