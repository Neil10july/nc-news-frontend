import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  state = { users: { tickle122: "pass" } };

  render() {
    return (
      <div>
        <form id="loginForm">
          <label>
            <input
              className="loginInput"
              type="text"
              inputfor="user"
              onChange={this.handleChange}
              value="tickle122"
            ></input>
          </label>
          <br></br>
          <label>
            <input
              className="loginInput"
              type="text"
              onChange={this.handleChange}
              value="pass"
            ></input>
          </label>
          <button onClick={this.validateUser}>Log in</button>
        </form>
      </div>
    );
  }

  handleChange = event => {};

  validateUser = event => {
    event.preventDefault();
    this.setState({ username: "tickle122", password: "pass" }, () => {
      const { users, username, password } = this.state;
      if (users[username] && users[username] === password) {
        this.props.logIn(username);
      }
    });
  };
}

export default Login;
