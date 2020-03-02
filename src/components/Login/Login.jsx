import React, { Component } from "react";
import { api } from "../../routes/component.routes";
import { navigate } from "@reach/router";
import "./Login.css";

class Login extends Component {
  state = { username: "", password: null, err: null, match: null };

  render() {
    const { err } = this.state;
    return (
      <div>
        <form id="loginForm">
          <input
            className="loginInput"
            type="text"
            placeholder="username"
            onChange={event => {
              this.handleChange(event, "username");
            }}
          ></input>
          <input
            className="loginInput"
            type="text"
            placeholder="password"
            onChange={event => {
              this.handleChange(event, "password");
            }}
          ></input>
          <br />
          <button
            className="submitBtn"
            onClick={event => {
              this.validateUser(event);
            }}
          >
            Log in
          </button>
          {err && <p className="errText">{err}</p>}
          <div>
            or <br />
            <button
              className="submitBtn"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleChange = (event, type) => {
    const { value } = event.target;
    this.setState({ [type]: value });
  };

  validateUser = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const userInput = { username, password };

    if (username.length === 0) {
      this.setState({ err: "username field cannot be empty" });
    } else {
      api
        .checkUserCreds(userInput)
        .then(result => {
          const { match } = result.data;
          const { logIn } = this.props;
          if (match) {
            logIn(username);
          }
        })
        .catch(err => {
          const { msg } = err.response.data;
          this.setState({ err: msg });
        });
    }
  };
}

export default Login;
