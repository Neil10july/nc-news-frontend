import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import "./App.css";
import TestPage from "../TestPage";
import {
  Header,
  Footer,
  Topics,
  ViewTopic,
  Articles,
  ViewArticle,
  Home,
  Login,
  ErrorHandler
} from "../routes/component.routes";

class App extends Component {
  state = { currentPath: "/", user: "", loggedIn: false };

  render() {
    const { user, loggedIn } = this.state;
    return (
      <div>
        <header>
          <Header user={user} loggedIn={loggedIn} />
        </header>
        <Router>
          <Home path="/" updateCurrentPath={this.updateCurrentPath} />
          <Topics path="/topics" />
          <ViewTopic
            path="/topics/:topic"
            updateCurrentPath={this.updateCurrentPath}
          />
          <Articles
            path="/articles"
            updateCurrentPath={this.updateCurrentPath}
          />
          <ViewArticle
            path="/articles/:article_id"
            user={user}
            loggedIn={loggedIn}
          />
          <TestPage path="/test" />
          <Login path="/login" logIn={this.logIn} />
          <ErrorHandler default msg={"404 Page Not Found"} />
        </Router>
        <Footer />
      </div>
    );
  }

  logIn = username => {
    this.setState({ user: username, loggedIn: true }, () => {
      navigate(this.state.currentPath);
    });
  };

  updateCurrentPath = path => {
    this.setState({ currentPath: path });
  };
}

export default App;
