import React, { Component } from "react";
import {
  ArticleList,
  api,
  SortBy,
  ErrorHandler
} from "../../routes/component.routes";

class ViewTopic extends Component {
  state = {
    path: ``,
    articles: [],
    err: null
  };

  render() {
    const { err } = this.state;
    return err ? (
      <ErrorHandler msg={err} />
    ) : (
      <div>
        <h2>{this.props.topic.toUpperCase()}</h2>
        <SortBy generateQuery={this.generateQuery} content={"articles"} />
        <ArticleList articles={this.state.articles} />
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
        this.setState({ articles });
      })
      .catch(err => {
        const { msg } = err.response.data;
        const { status } = err.response;
        this.setState({ err: `${status} - ${msg}` });
      });
  }

  generateQuery = event => {
    event.preventDefault();
    const { topic } = this.props;
    const query = event.target.value;
    const queryRef = {
      Newest: { sort_by: "created_at", order: "desc" },
      Oldest: { sort_by: "created_at", order: "asc" },
      Highest_rated: { sort_by: "votes", order: "desc" },
      Lowest_rated: { sort_by: "votes", order: "asc" },
      Most_comments: { sort_by: "comment_count", order: "desc" },
      Least_comments: { sort_by: "comment_count", order: "asc" }
    };
    const { sort_by, order } = queryRef[query];
    this.setState({
      path: `/articles?topic=${topic}&sort_by=${sort_by}&order=${order}`
    });
  };
}

export default ViewTopic;
