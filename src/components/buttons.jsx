// third-party imports
import React, { Component } from 'react';

// asset imports
import icon_plus from '../assets/images/icons/add.svg';
import icon_cross from '../assets/images/icons/cross.svg';

// style imports
import styles from './buttons.module.css';

export class ButtonSquare extends Component {

  render() {
    return (
      <div
        className={`${styles.button_square_container} ${this.props.negative? styles.button_square_container_negative : ''} ${this.props.className}`}
        onClick={this.props.onClick}>
        <p className={`${styles.button_square_label} ${this.props.negative? styles.button_square_label_nagative : ''}`}>{this.props.label}</p>
      </div>
    );
  }

}

export class ButtonRound extends Component {

  render() {
    return (
      <div
        className={`${styles.button_round_container} ${this.props.className}`}
        onClick={this.props.onClick}>
        <img
          className={styles.button_round_icon}
          alt="button icon"
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
