// third-party imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// imports
import Header from '../components/header';
import server from '../components/server';
import Input from '../components/input';
import { validateMaxLength } from '../components/validation_rules';
import { ButtonSquare } from '../components/buttons';

// assets imports
import default_avatar from '../assets/images/avatar_default.jpg';
import icon_edit from '../assets/images/icons/pencil-edit-button.svg';

// style imports
import styles from './profile.module.css';

class Profile extends Component {

  constructor(props) {
    super(props);

    this._is_own_user = this.props.match.params.id? false : true;

    this._getUser();
  }

  render() {
    return (
      <div className={styles.container}>

        <Header />

        <div className={styles.panel}>
          <img
            alt="avatar"
            className={styles.avatar}
            src={this.state?.user?.avatar_url? this.state?.user?.avatar_url : default_avatar} />

            <div className={styles.info_container}>
              <Name
                text={this.state?.user?.name}
                editable={this._is_own_user}
                afterChange={this._getUser} />
            </div>
        </div>

      </div>
    );
  }

  _getUser = () => {
    if (this._is_own_user) {
      server.getOwnUser(this._getUserSuccessCallback);
    } else {
      server.getUser(this.props.match.params.id, this._getUserSuccessCallback);
    }
  }
  _getUserSuccessCallback = (data) => {
    this.setState({ user: data.user });
  }

}

export default withRouter(Profile);

class Name extends Component {

  state = {
    show_edit_button: false,
    editing: false,
  }

  render() {
    return (
      <div
        className={`${this.state?.editing? styles.name_container_editing : styles.name_container}`}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>

        {this.state?.editing
        ? <NameEditor
            text={this.props.text}
            afterChange={() => {
              this.setState({ editing: false });
              this.props.afterChange && this.props.afterChange();
            }}
            onCancel={() => this.setState({ editing: false })} />
        : <>
            <p className={styles.name_text}>{this.props.text}</p>

            {this.state?.show_edit_button
            ? <div
                className={styles.edit_button_container}
                onClick={this._startEditing}>
                <img
                  alt="edit icon"
                  className={styles.edit_button_icon}
                  src={icon_edit} />
                <p className={styles.edit_button_text}>Edit</p>
              </div>
            : null}
          </>}

      </div>
    );
  }

  _handleMouseEnter = () => {
    this.setState({ show_edit_button: true });
  }
  _handleMouseLeave = () => {
    this.setState({ show_edit_button: false });
  }

  _startEditing = () => {
    this.setState({ editing: true });
  }
  _stopEditing = () => {
    this.setState({ editing: false });
  }

}

class NameEditor extends Component {

  state = {
    text: this.props.text,
  }

  render() {
    return (
      <div className={styles.name_editor_container}>
        
        <Input
          ref={ref => this._text_input = ref}
          className={styles.name_editor_input}
          placeholder="Name"
          text={this.state?.text}
          onTextChange={this._handleTextChange}
          validationRules={[ str => validateMaxLength(str, 50) ]} />

        <div className={styles.name_editor_button_container}>
          <ButtonSquare
            className={styles.name_editor_button_save}
            label="Save"
            onClick={this._handleSave} />
          <ButtonSquare
            className={styles.name_editor_button_cancel}
            negative
            label="Cancel"
            onClick={this._handleCancel} />
        </div>

      </div>
    );
  }

  _handleTextChange = (text) => {
    this.setState({ text });
  }

  _handleSave = () => {
    let is_text_valid = this._text_input && this._text_input.isValid();
    if (is_text_valid) {
      server.updateOwnUser({ name: this.state.text }, this._updateOwnUserSuccessCallback);
    }
  }
  _updateOwnUserSuccessCallback = () => {
    this.props.afterChange && this.props.afterChange();
  }

  _handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  }

}
