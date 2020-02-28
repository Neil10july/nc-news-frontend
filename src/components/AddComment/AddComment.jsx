import React, { Component } from "react";
import { api } from "../../routes/component.routes";
import { navigate } from "@reach/router";

class AddComment extends Component {
  state = { comment: "" };

  render() {
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
          <button id="commentButton" onClick={this.submitComment}>
            COMMENT
          </button>
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
