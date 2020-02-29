import React, { Component } from "react";
import { api } from "../../routes/component.routes";
import { navigate } from "@reach/router";

class AddComment extends Component {
  state = { comment: "" };

  render() {
    const { comment } = this.state;
    return (
      <div>
        <form>
          <textarea
            id="commentInput"
            type="text"
            minLength="4"
            placeholder="Add a comment"
            onChange={this.handleChange}
          ></textarea>
          {comment.length > 3 ? (
            <button id="commentButton" onClick={this.submitComment}>
              COMMENT
            </button>
          ) : (
            <p>comments must have a minimum of 4 characters!</p>
          )}
        </form>
      </div>
    );
  }

  handleChange = event => {
    const comment = event.target.value;
    this.setState({ comment });
  };

  submitComment = event => {
    event.preventDefault();
    if (!this.props.loggedIn) {
      navigate("/login");
    } else {
      const { user, id, loggedIn } = this.props;
      const { comment } = this.state;
      if (loggedIn && comment.length > 3) {
        api.postComment(user, id, comment);
        this.props.preRenderComment(user, comment);
      }
    }
  };
}

export default AddComment;
