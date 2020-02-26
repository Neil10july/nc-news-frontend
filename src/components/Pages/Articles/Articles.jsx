import React, { Component } from "react";
import axios from "axios";
import { ArticleList, api } from "../../../routes/component.routes";

class Articles extends Component {
  state = { path: "/articles", articles: [] };
  render() {
    return (
      <div>
        <h1>ARTICLES</h1>
        <label>Sort by</label>{" "}
        <select
          onChange={event => {
            this.generateQuery(event);
          }}
        >
          <option value="/articles"></option>
          <option value="/articles?sort_by=created_at&order=desc">
            Newest first
          </option>
          <option value="/articles?sort_by=created_at&order=asc">
            Oldest first
          </option>
          <option value="/articles?sort_by=votes&order=desc">
            Highest rated
          </option>
          <option value="/articles?sort_by=votes&order=asc">
            Lowest rated
          </option>
          <option value="/articles?sort_by=comment_count&order=desc">
            Most comments
          </option>
          <option value="/articles?sort_by=comment_count&order=asc">
            Least comments
          </option>
        </select>
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }

  fetchArticles() {
    const path = api.url + this.state.path;
    axios.get(path).then(res => {
      const { articles } = res.data;
      this.setState({ articles });
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }

  generateQuery = event => {
    event.preventDefault();
    const query = event.target.value;
    this.setState({ path: query });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.path !== prevState.path) {
      this.fetchArticles();
    }
  }
}

export default Articles;
