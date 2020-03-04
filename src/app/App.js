import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import "./App.css";
import {
  Header,
  Footer,
  Topics,
  ViewTopic,
  Articles,
  ViewArticle,
  Home,
  Login,
  ErrorHandler,
  Signup
} from "../routes/component.routes";

class App extends Component {
  state = { currentPath: "/", user: "", loggedIn: false };

  render() {
    const { user, loggedIn } = this.state;
    return (
      <div className="app">
        <div>
          <Header user={user} loggedIn={loggedIn} />
        </div>
        <Router className="content">
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
            updateCurrentPath={this.updateCurrentPath}
          />
          <Signup path="/signup" />
          <Login path="/login" logIn={this.logIn} />
          <ErrorHandler
            default
            msg={
              "Ah, you weren't supposed to click that - Page under construction"
            }
          />
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
