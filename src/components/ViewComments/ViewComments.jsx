import React, { Component } from "react";
import "./ViewComments.css";
import {
  api,
  SortBy,
  AddComment,
  UpdateVotes,
  DeleteContent
} from "../../routes/component.routes";
import { Link } from "@reach/router";

class ViewComments extends Component {
  state = {
    path: `/articles/${this.props.article_id}/comments`,
    comments: [],
    voted: {}
  };

  render() {
    const { comments } = this.state;
    const { user, loggedIn, article_id } = this.props;

    return (
      <div>
        <br></br>
        <AddComment
          user={user}
          loggedIn={loggedIn}
          id={article_id}
          preRenderComment={this.preRenderComment}
        />
        <SortBy
          id={this.props.article_id}
          setPath={this.setPath}
          content={"comments"}
        />
        <ul id="commentsList">
          {comments.map(comment => {
            const { comment_id, votes, author, body } = comment;
            return (
              <div key={comment_id}>
                <div className="comment">
                  <li className="commentContent">
                    <Link to="/">{author}</Link>
                  </li>
                  <li className="commentContent">{body}</li>
                  <UpdateVotes
                    args={{
                      content: "comment",
                      id: comment_id,
                      votes,
                      preRenderVote: this.preRenderVote,
                      currentVote: this.state.voted[comment_id],
                      loggedIn
                    }}
                  />
                  <br />
                  {user === comment.author && (
                    <DeleteContent
                      args={{
                        content: "comment",
                        id: comment_id,
                        preRenderDelete: this.preRenderDelete
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.path !== prevState.path) {
      this.fetchComments();
    }
  }

  fetchComments = () => {
    const { path } = this.state;
    api.fetchContent(path).then(({ comments }) => {
      this.setState({ comments });
    });
  };

  preRenderComment = (author, body) => {
    const newComment = {
      author: author,
      body: body,
      votes: 0,
      comment_id: "temp"
    };
    this.setState(currentState => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  preRenderVote = (value, newVoteState, id) => {
    this.setState(currentState => {
      const { comments, voted } = currentState;
      const newState = {
        comments: comments.map(comment => {
          if (id === comment.comment_id)
            return { ...comment, votes: (comment.votes += value) };
          else return comment;
        }),
        voted: { ...voted, [id]: newVoteState }
      };
      return newState;
    });
  };

  preRenderDelete = id => {
    this.setState(currentState => {
      const { comments } = currentState;
      const newState = {
        comments: comments.filter(comment => comment.comment_id !== id)
      };

      return newState;
    });
  };

  setPath = path => {
    this.setState({ path });
  };
}

export default ViewComments;
