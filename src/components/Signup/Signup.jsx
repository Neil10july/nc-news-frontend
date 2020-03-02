import React, { Component } from "react";
import { navigate } from "@reach/router";
import "./Signup.css";
import { api } from "../../routes/component.routes";

class Signup extends Component {
  state = { name: "", username: "", password: "", created: false, err: "" };

  render() {
    const { err, created } = this.state;
    return created ? (
      <div>
        <p>User has been created!</p>
        <br />
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    ) : (
      <div>
        <form id="signupForm">
          <label> Create an account </label>
          <br />
          <input
            className="signupInput"
            placeholder="Name"
            onChange={event => {
              this.handleChange(event, "name");
            }}
          ></input>
          <input
            className="signupInput"
            placeholder="username"
            onChange={event => {
              this.handleChange(event, "username");
            }}
          ></input>
          <input
            className="signupInput"
            placeholder="password"
            onChange={event => {
              this.handleChange(event, "password");
            }}
          ></input>
          <br />
          <button
            className="submitBtn"
            onClick={event => {
              this.sendUserInput(event);
            }}
          >
            submit
          </button>
          {err && <p className="errText">{err}</p>}
        </form>
      </div>
    );
  }

  handleChange = (event, type) => {
    const { value } = event.target;
    this.setState({ [type]: value });
  };

  sendUserInput(event) {
    event.preventDefault();
    const { name, username, password } = this.state;
    const newUser = { name, username, password };

    if (name.length === 0) {
      this.setState({
        err: "Name must be filled out"
      });
    } else if (username.length < 4 || password.length < 4) {
      this.setState({
        err: "username and password must contain atleast 4 characters"
      });
    } else {
      return api
        .createNewUser(newUser)
        .then(() => {
          this.setState({ created: true });
        })
        .catch(err => {
          const { msg } = err.response.data;
          this.setState({ err: msg });
        });
    }
  }
}

export default Signup;
