import React, { Component } from "react";
import "./ViewArticle.css";
import { Link } from "@reach/router";
import {
  Toggle,
  ViewComments,
  api,
  ErrorHandler,
  UpdateVotes,
  DeleteContent
} from "../../routes/component.routes";

class ViewArticle extends Component {
  state = {
    article: "",
    err: null,
    currentVote: null,
    isLoading: true
  };

  render() {
    const { article, err, currentVote, isLoading } = this.state;
    const { user, loggedIn, article_id } = this.props;
    const { votes, title, author, created_at, body } = article;
    const date = `${new Date(created_at)}`.slice(0, 21);

    return err ? (
      <ErrorHandler msg={err} />
    ) : isLoading ? (
      <p>Loading article...</p>
    ) : (
      <div className="viewArticle">
        <div id="articleContent">
          <h1>{title}</h1>
          <h4>{date}</h4>
          <p>{body}</p>
          <ul>
            <li>
              <Link id="userLink" to={`/users/${author}`}>
                {author}
              </Link>
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
          {this.canDelete(author) && (
            <DeleteContent
              args={{
                content: "article",
                id: article_id,
                preRenderDelete: this.preRenderDelete
              }}
            />
          )}
          <br />
          <Toggle text={"View comments"}>
            <ViewComments
              article_id={article_id}
              user={user}
              loggedIn={loggedIn}
            />
          </Toggle>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
    this.props.updateCurrentPath(`/articles/${this.props.article_id}`);
  }

  fetchArticle() {
    const { article_id } = this.props;
    api
      .fetchContent(`/articles/${article_id}`)
      .then(({ article }) => {
        this.setState({ article, isLoading: false });
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

  preRenderDelete = () => {
    this.setState({ err: "Article deleted" });
  };

  canDelete = author => {
    const { user } = this.props;
    if (user === author || user === "admin") {
      return true;
    } else return false;
  };
}

export default ViewArticle;
