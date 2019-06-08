import React, { Component } from "react";

import styles from "./styles/Button";

export default class Button extends Component {
  state = {
    hovered: false
  };

  render() {
    return (
      <div
        style={{ ...styles.container, opacity: this.state.hovered ? 0.5 : 1 }}
        onMouseEnter={this.startHover}
        onMouseLeave={this.endHover}
        onClick={this.props.buttonFunction}
      >
        <p style={styles.label}>{this.props.label}</p>
      </div>
    );
  }

  startHover = () => {
    this.setState({ hovered: true });
  };

  endHover = () => {
    this.setState({ hovered: false });
  };
}
