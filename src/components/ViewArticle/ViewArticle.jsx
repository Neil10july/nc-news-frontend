import React, { Component } from "react";
import axios from "axios";
import "./ViewArticle.css";
import { Link } from "@reach/router";
import {
  Toggle,
  ViewComments,
  api,
  ErrorHandler,
  UpdateVotes
} from "../../routes/component.routes";

class ViewArticle extends Component {
  state = { article: "", err: null, currentVote: null };

  render() {
    const { article, err, currentVote } = this.state;
    const { user, loggedIn, article_id } = this.props;
    const { votes, title, author, created_at, body } = article;

    return err ? (
      <ErrorHandler msg={err} />
    ) : (
      <div>
        <h1>{title}</h1>
        <h4>{created_at}</h4>
        <p>{body}</p>
        <ul id="viewArticleList">
          <li>
            <Link to="/">{author}</Link>
          </li>
          <br />
          <UpdateVotes
            args={{
              content: "article",
              id: article_id,
              votes,
              preRenderVote: this.preRenderVote,
              currentVote,
              loggedIn
            }}
          />
        </ul>
        <br />
        <Toggle text={"View comments"}>
          <ViewComments
            article_id={article_id}
            user={user}
            loggedIn={loggedIn}
          />
        </Toggle>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle() {
    const id = this.props.article_id;
    axios
      .get(`${api.url}/articles/${id}`)
      .then(res => {
        const { article } = res.data;
        this.setState({ article });
      })
      .catch(err => {
        const { msg } = err.response.data;
        const { status } = err.response;
        this.setState({ err: `${status} - ${msg}` });
      });
  }

  preRenderVote = (value, newVoteState) => {
    this.setState(currentState => {
      const { article } = currentState;
      const newState = {
        article: { ...article, votes: (article.votes += value) },
        currentVote: newVoteState
      };
      return newState;
    });
  };
}

export default ViewArticle;
