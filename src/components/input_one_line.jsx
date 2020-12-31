// third-party imports
import React, { PureComponent } from 'react';

// style imports
import styles from './input_one_line.module.css';

export default class InputOneLine extends PureComponent {

  state = {
    error_msg: "",
  };

  render() {
    return (
      <div className={styles.container}>

        <input
          type={this.props.password? 'password' : 'text'}
          placeholder={this.props.placeholder}
          onChange={this._handleChange}
          value={this.props.text} />

        <div className={styles.divider} />

        <p className={styles.error_msg}>{this.state.error_msg}</p>

      </div>
    );
  }

  _handleChange = (e) => {
    this.props.onTextChange && this.props.onTextChange(e.target.value);

    // validate text
    if (this.props.validationRules) {
      let error_happened = false;
      for (let i = 0; i < this.props.validationRules.length; i++) {
        let error_msg = this.props.validationRules[i](e.target.value);
        if (error_msg) {
          error_happened = true;
          this.setState({ error_msg });
          break;
        }
      }

      !error_happened && this.setState({ error_msg: "" });
    }
  }

}
