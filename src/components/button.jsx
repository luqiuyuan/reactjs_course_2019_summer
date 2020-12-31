// third-party imports
import React, { Component } from 'react';

// style imports
import styles from './button.module.css';

export default class Button extends Component {

  render() {
    return (
      <div
        className={`${styles.container} ${this.props.className}`}
        onClick={this.props.onClick}>
        <p className={styles.label}>{this.props.label}</p>
      </div>
    );
  }

}
