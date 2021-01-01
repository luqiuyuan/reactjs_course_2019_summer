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
import icon_camera from '../assets/images/icons/photo-camera.svg';

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
          <Avatar
            className={styles.avatar}
            url={this.state?.user?.avatar_url} />

          <div className={styles.info_container}>
            <Name
              text={this.state?.user?.name}
              editable={this._is_own_user}
              onSaveSuccess={this._getUser} />
            <Description
              className={styles.description}
              text={this.state?.user?.description}
              editable={this._is_own_user}
              onSaveSuccess={this._getUser} />
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

class Avatar extends Component {

  state = {
    should_show_overlay: false,
  }

  render() {
    return (
      <div
        className={`${styles.avatar_container} ${this.props.className}`}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        <img
          alt="avatar"
          className={styles.avatar_image}
          src={this.props.url? this.props.url : default_avatar} />
        
        {this.state.should_show_overlay
        ? <div className={styles.avatar_overlay_container}>
            <img
              className={styles.avatar_icon}
              src={icon_camera} />
            <p className={styles.avatar_label}>Edit your avatar</p>
          </div>
        : null}
      </div>
    );
  }

  _handleMouseEnter = () => {
    this.setState({ should_show_overlay: true });
  }
  _handleMouseLeave = () => {
    this.setState({ should_show_overlay: false });
  }

}

class Name extends Component {

  state = {
    show_edit_button: false,
    editing: false,
  }

  render() {
    return (
      <div
        className={`${this.state?.editing? styles.name_container_editing : styles.name_container} ${this.props.className}`}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>

        {this.state?.editing
        ? <Editor
            text={this.props.text}
            onSave={this._handleSave}
            onCancel={this._stopEditing}
            validationRules={[ str => validateMaxLength(str, 50) ]} />
        : <>
            <p className={this.props.text? styles.name_text : styles.name_text_na}>{this.props.text? this.props.text : "No Name"}</p>
            <EditButton
              className={styles.edit_button}
              shouldShow={this.state?.show_edit_button}
              onClick={this._startEditing} />
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

  _handleSave = (text) => {
    server.updateOwnUser({ name: text }, this._updateOwnUserSuccessCallback);
  }
  _updateOwnUserSuccessCallback = () => {
    this._stopEditing();
    this.props.onSaveSuccess && this.props.onSaveSuccess();
  }

}

class Description extends Component {

  state = {
    show_edit_button: false,
    editing: false,
  }

  render() {
    return (
      <div
        className={`${this.state?.editing? styles.description_container_editing : styles.description_container} ${this.props.className}`}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>

        {this.state?.editing
        ? <Editor
            text={this.props.text}
            onSave={this._handleSave}
            onCancel={this._stopEditing}
            validationRules={[ str => validateMaxLength(str, 60) ]} />
        : <>
            <p className={styles.description_label}>Short Description</p>
            <p className={this.props.text? styles.description_text : styles.description_text_na}>{this.props.text? this.props.text : "Too lazy to write..."}</p>
            <EditButton
              className={styles.edit_button}
              shouldShow={this.state?.show_edit_button}
              onClick={this._startEditing} />
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

  _handleSave = (text) => {
    server.updateOwnUser({ description: text }, this._updateOwnUserSuccessCallback)
  }
  _updateOwnUserSuccessCallback = () => {
    this._stopEditing();
    this.props.onSaveSuccess && this.props.onSaveSuccess();
  }

}

class EditButton extends Component {

  render() {
    return (
      <div
        className={`${styles.edit_button_container} ${this.props.shouldShow? '' : styles.edit_button_container_hidden} ${this.props.className}`}
        onClick={this.props.onClick}>
        <img
          alt="edit icon"
          className={styles.edit_button_icon}
          src={icon_edit} />
        <p className={styles.edit_button_text}>Edit</p>
      </div>
    );
  }

}

class Editor extends Component {

  state = {
    text: this.props.text,
  }

  render() {
    return (
      <div className={styles.editor_container}>
        
        <Input
          ref={ref => this._text_input = ref}
          className={styles.editor_input}
          placeholder="Name"
          text={this.state?.text}
          onTextChange={this._handleTextChange}
          validationRules={this.props.validationRules} />

        <div className={styles.editor_button_container}>
          <ButtonSquare
            className={styles.editor_button_save}
            label="Save"
            onClick={this._handleSave} />
          <ButtonSquare
            className={styles.editor_button_cancel}
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
      this.props.onSave && this.props.onSave(this.state.text);
    }
  }

  _handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  }

}
