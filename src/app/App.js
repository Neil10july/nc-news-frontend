import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import "./App.css";
import TestPage from "../TestPage";
import {
  Header,
  Footer,
  NavBar,
  Topics,
  ViewTopic,
  Articles,
  ViewArticle,
  Home,
  Login
} from "../routes/component.routes";

class App extends Component {
  state = { user: "", loggedIn: false };

  render() {
    const { user, loggedIn } = this.state;
    return (
      <div>
        <header>
          <Header user={user} loggedIn={loggedIn} />
          <NavBar />
        </header>
        <Router>
          <Home path="/" />
          <Topics path="/topics" />
          <ViewTopic path="/topics/:topic" />
          <Articles path="/articles" />
          <ViewArticle
            path="/articles/:article_id"
            user={user}
            loggedIn={loggedIn}
          />
          <TestPage path="/test" />
          <Login path="/login" logIn={this.logIn} />
        </Router>
        <Footer />
      </div>
    );
  }

  logIn = username => {
    this.setState({ user: username, loggedIn: true }, () => {
      navigate("/");
    });
  };
}

export default App;
