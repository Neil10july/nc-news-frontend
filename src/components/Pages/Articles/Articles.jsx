import React, { Component } from "react";
import axios from "axios";
import { ArticleList, api, SortBy } from "../../../routes/component.routes";

class Articles extends Component {
  state = { path: "/articles", articles: [] };
  render() {
    return (
      <div>
        <h1>ARTICLES</h1>
        <SortBy generateQuery={this.generateQuery} />
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
    const url = api.url + this.state.path;
    axios.get(url).then(res => {
      const { articles } = res.data;
      this.setState({ articles });
    });
  }

  generateQuery = event => {
    event.preventDefault();
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
    this.setState({ path: `/articles?sort_by=${sort_by}&order=${order}` });
  };
}

export default Articles;
