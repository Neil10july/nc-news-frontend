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
    voted: {},
    isLoading: true
  };

  render() {
    const { comments } = this.state;
    const { user, loggedIn, article_id } = this.props;

    return this.state.isLoading ? (
      <p>Loading comments...</p>
    ) : (
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
            const { comment_id, votes, author, body, created_at } = comment;
            const date = `${new Date(created_at)}`.slice(0, 21);
            return (
              <div key={comment_id} className="comment">
                <div className="commentItems">
                  <li>
                    <Link id="commentAuthor" to="/">
                      {author}
                    </Link>
                  </li>
                  <li id="commentDate">{date}</li>
                  <li id="commentContent">{body}</li>
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
                  {this.canDelete(author) && (
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
      this.setState({ comments, isLoading: false });
    });
  };

  canDelete = author => {
    const { user } = this.props;
    if (user === author || user === "admin") {
      return true;
    } else return false;
  };

  setPath = path => {
    this.setState({ path });
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
}

export default ViewComments;
