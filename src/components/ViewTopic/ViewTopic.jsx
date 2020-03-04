import React, { Component } from "react";
import { ArticleList, api, ErrorHandler } from "../../routes/component.routes";

class ViewTopic extends Component {
  state = {
    path: ``,
    articles: [],
    err: null,
    isLoading: true
  };

  render() {
    const { err } = this.state;
    return err ? (
      <ErrorHandler msg={err} />
    ) : this.state.isLoading ? (
      <p>Loading articles...</p>
    ) : (
      <div>
        <ArticleList
          articles={this.state.articles}
          updateCurrentPath={this.props.updateCurrentPath}
          topic={this.props.topic.toUpperCase()}
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
    let path = this.state.path;
    if (path === "") {
      path = `/articles?topic=${this.props.topic}`;
    }

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
    const { topic } = this.props;
    this.setState({ path: `${path}&topic=${topic}` });
  };
}

export default ViewTopic;
