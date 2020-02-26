import React, { Component } from "react";
import axios from "axios";
import * as api from "../../../api/api";

class ViewArticle extends Component {
  state = { article: "" };
  render() {
    const { article } = this.state;
    return (
      <div>
        <h1>{article.title}</h1>
        <h4>{Date(article.created_at)}</h4>
        <p>{article.body}</p>
        <ul>
          <li>Author: {article.author}</li>
          <li>Votes: {article.votes}</li>
          <li>Comments: {article.comment_count}</li>
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle() {
    const id = this.props.article_id;
    axios.get(`${api.url}/articles/${id}`).then(res => {
      const { article } = res.data;
      this.setState({ article });
    });
  }
}

export default ViewArticle;
