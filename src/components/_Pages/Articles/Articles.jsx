import React, { Component } from "react";
import {
  ArticleList,
  api,
  ErrorHandler
} from "../../../routes/component.routes";

class Articles extends Component {
  state = { path: "/articles", articles: [], err: null, isLoading: true };

  render() {
    const { err, isLoading } = this.state;
    return err ? (
      <div>
        <ErrorHandler msg={err} />
      </div>
    ) : isLoading ? (
      <p>Loading articles...</p>
    ) : (
      <div>
        <ArticleList
          articles={this.state.articles}
          updateCurrentPath={this.props.updateCurrentPath}
          topic="ARTICLES"
          setPath={this.setPath}
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
    this.setState({ path });
  };
}

export default Articles;
