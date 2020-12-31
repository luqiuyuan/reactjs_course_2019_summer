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
      <div className={styles.container}>

        <input
          type={this.props.password? 'password' : 'text'}
          placeholder={this.props.placeholder} />

        <div className={styles.divider} />

        <p className={styles.error_msg}>{this.state.error_msg}</p>

      </div>
    );
  }

}
