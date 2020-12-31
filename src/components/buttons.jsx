// third-party imports
import React, { Component } from 'react';

// asset imports
import icon_plus from '../assets/images/icons/add.svg';
import icon_cross from '../assets/images/icons/cross.svg';

// style imports
import styles from './buttons.module.css';

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

class ButtonRound extends Component {

  render() {
    return (
      <div
        className={`${styles.button_round_container} ${this.props.className}`}
        onClick={this.props.onClick}>
        <img
          className={styles.button_round_icon}
          src={this.props.icon} />
      </div>
    );
  }

}

export class ButtonRoundPlus extends Component {

  render() {
    return (
      <ButtonRound
        className={`${styles.button_round_plus} ${this.props.className}`}
        icon={icon_plus}
        onClick={this.props.onClick} />
    );
  }

}

export class ButtonRoundCross extends Component {

  render() {
    return (
      <ButtonRound
        className={`${styles.button_round_cross} ${this.props.className}`}
        icon={icon_cross}
        onClick={this.props.onClick} />
    );
  }

}
