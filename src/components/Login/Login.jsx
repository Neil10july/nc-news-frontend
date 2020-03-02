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
          <label>
            {" username "}
            <input
              className="loginInput"
              type="text"
              onChange={event => {
                this.handleChange(event, "username");
              }}
            ></input>
          </label>
          <br></br>
          <label>
            {" password "}
            <input
              className="loginInput"
              type="text"
              onChange={event => {
                this.handleChange(event, "password");
              }}
            ></input>
          </label>
          <button
            onClick={event => {
              this.validateUser(event);
            }}
          >
            Log in
          </button>
          {err && <p className="errText">{err}</p>}
          <br />
          <p>
            {"  or  "}
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create an account
            </button>
          </p>
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
