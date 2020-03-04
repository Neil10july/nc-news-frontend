import React, { Component } from "react";
import {
  ArticleList,
  ErrorHandler,
  api
} from "../../../routes/component.routes";

class Home extends Component {
  state = {
    path: "/articles?sort_by=comment_count",
    articles: [],
    err: "",
    isLoading: true
  };
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
          topic={"Most Discussed"}
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

export default Home;
