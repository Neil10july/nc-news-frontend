import React, { Component } from "react";
import {
  ArticleList,
  api,
  SortBy,
  ErrorHandler
} from "../../../routes/component.routes";

class Articles extends Component {
  state = { path: "/articles", articles: [], err: null, isLoading: true };

  render() {
    const { err } = this.state;
    return this.state.isLoading ? (
      <p>Loading articles...</p>
    ) : err ? (
      <div>
        <ErrorHandler msg={err} />
      </div>
    ) : (
      <div>
        <h1>ARTICLES</h1>
        <SortBy setPath={this.setPath} content={"articles"} />
        <ArticleList
          articles={this.state.articles}
          updateCurrentPath={this.props.updateCurrentPath}
        />
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.path !== prevState.path) {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    const { path } = this.state;
    api
      .fetchContent(path)
      .then(({ articles }) => {
        this.setState({ articles, isLoading: false });
      })
      .catch(err => {
        const { msg } = err.response.data;
        const { status } = err.response;
        this.setState({ err: `${status} - ${msg}` });
      });
  }

  setPath = path => {
    this.setState({ path, isLoading: true });
  };
}

export default Articles;
