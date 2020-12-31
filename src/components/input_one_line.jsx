// third-party imports
import React, { Component } from 'react';

// style imports
import styles from './input_one_line.module.css';

export default class InputOneLine extends Component {

  state = {
    error_msg: "",
  };

  render() {
    return (
      <div className={`${styles.container} ${this.props.className}`}>

        {this.props.multiLine
        ? <textarea
            placeholder={this.props.placeholder}
            onChange={this._handleChange}
            value={this.props.text}
            rows={this.props.rows || 5} />
        : <input
            type={this.props.password? 'password' : 'text'}
            placeholder={this.props.placeholder}
            onChange={this._handleChange}
            value={this.props.text} />}

        <div className={styles.divider} />

        <p className={styles.error_msg}>{this.state.error_msg}</p>

      </div>
    );
  }

  isValid = () => {
    let error_msg = this._validate(this.props.text);
    this.setState({ error_msg });
    return error_msg? false : true;
  }

  _handleChange = (e) => {
    this.props.onTextChange && this.props.onTextChange(e.target.value);

    // validate text
    this.setState({ error_msg: this._validate(e.target.value) });
  }

  // validate text against this.props.validationRules.
  // return error message if error happened, otherwise return ''
  _validate = (text) => {
    if (this.props.validationRules) {
      for (let i = 0; i < this.props.validationRules.length; i++) {
        let error_msg = this.props.validationRules[i](text);
        if (error_msg) {
          return error_msg;
        }
      }
    }

    return '';
  }

}
