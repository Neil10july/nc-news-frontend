import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  state = { users: { admin: "admin", neil: "pass" } };

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
              placeholder="username"
            ></input>
          </label>
          <br></br>
          <label>
            <input
              className="loginInput"
              type="text"
              onChange={this.handleChange}
              placeholder="password"
            ></input>
          </label>
          <button onClick={this.validateUser}>Log in</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { placeholder, value } = event.target;
    this.setState({ [placeholder]: value });
  };

  validateUser = event => {
    event.preventDefault();
    const { users, username, password } = this.state;
    if (users[username] && users[username] === password) {
      this.props.logIn(username);
    }
  };
}

export default Login;
