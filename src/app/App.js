import React from "react";
import { Router } from "@reach/router";
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
  Home
} from "../routes/component.routes";

function App() {
  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>
      <Router>
        <Home path="/" />
        <Topics path="/topics" />
        <ViewTopic path="/topics/:topic" />
        <Articles path="/articles" />
        <ViewArticle path="/articles/:article_id" />
        <TestPage path="/test" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
