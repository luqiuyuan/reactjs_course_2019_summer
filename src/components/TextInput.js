import React, { Component } from "react";

import styles from "./styles/TextInput";
import Text from "./Text";
import WhiteBlank from "./WhiteBlank";

export default class TextInput extends Component {
  render() {
    const { placeholder, errMsg, ...rest } = this.props;
    return (
      <div style={styles.container}>
        <div>
          <input {...rest} placeholder={placeholder} style={styles.input} />
          <WhiteBlank h={5}/>
          <div style={styles.line(errMsg)} />
        </div>
        <Text style={styles.errMsg} type="xs err">{errMsg}</Text>
      </div>
    );
  }
}
