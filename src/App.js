import React, { Component } from "react";
import Button from "./components/Button";
import "./App.css";
import {
  COLOR_SILVER_WHITE,
  COLOR_YAQING,
  COLOR_CRAB_SHELL_CYAN
} from "./contants";
import Text from "./components/Text";
import TextInput from "./components/TextInput";
import WhiteBlank from "./components/WhiteBlank";

class App extends Component {
  state = {
    err_email: "",
    err_password: ""
  };

  onEmailChange = evt => {
    this.email = evt.target.value;
  };

  onEmailBlur = () => {
    this.setState({
      err_email: this.email ? "" : "Required"
    });
  };

  onPasswordChange = () => {};

  onNameChange = () => {};
  render() {
    return (
      <div className="App">
        <div className="Panel">
          <Text style={styles.header} type="RussoOne xl red">
            BIG FISH
          </Text>
          <TextInput
            placeholder="Email"
            errMsg={this.state.err_email}
            onBlur={this.onEmailBlur}
            onChange={this.onEmailChange}
          />
          <WhiteBlank h={8} />
          <TextInput placeholder="Password" onChange={this.onPasswordChange} />
          <WhiteBlank h={8} />
          <TextInput placeholder="Name" onChange={this.onNameChange} />
          <WhiteBlank h={73} />
          <Button buttonFunction={() => {}} label="Sign Up" />
          <div style={{ flexGrow: 1 }} />
          <div style={styles.footer}>
            <p>
              Already have an account? <span>Login</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  header: {
    marginTop: 46,
    marginBotton: 32
  },
  footer: {
    backgroundColor: COLOR_SILVER_WHITE,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 118
  }
};

export default App;
