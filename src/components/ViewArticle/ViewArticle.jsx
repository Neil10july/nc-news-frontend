import React, { Component } from "react";
import axios from "axios";
import "./ViewArticle.css";
import { Link } from "@reach/router";
import {
  Toggle,
  ViewComments,
  api,
  AddComment
} from "../../routes/component.routes";

class ViewArticle extends Component {
  state = { article: "" };
  render() {
    const { article } = this.state;
    return (
      <div>
        <h1>{article.title}</h1>
        <h4>{Date(article.created_at)}</h4>
        <p>{article.body}</p>
        <ul id="viewArticleList">
          <li>
            <Link to="/">{article.author}</Link>
          </li>
          <br></br>
          <li>
            <button>+</button> {article.votes} <button>-</button>
          </li>
        </ul>
        <br></br>
        <Toggle text={"View comments"}>
          <ViewComments article_id={this.props.article_id} />
        </Toggle>
        <AddComment />
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
