import React, { Component } from "react";
import { api } from "../../routes/component.routes";
import { navigate } from "@reach/router";

class AddComment extends Component {
  state = { comment: "", err: null };

  render() {
    const { err } = this.state;
    return (
      <div>
        <form>
          <textarea
            id="commentText"
            type="text"
            placeholder="Add a comment"
            onChange={this.handleChange}
          ></textarea>
          <button id="commentButton" onClick={this.submitComment}>
            COMMENT
          </button>
          {err && <p className="errText">{err}</p>}
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
    const { user, id, loggedIn } = this.props;
    const { comment } = this.state;

    if (!this.props.loggedIn) {
      navigate("/login");
    } else if (comment.length < 4) {
      this.setState({ err: "comments must contain  atleast 4 characters!" });
    } else {
      if (loggedIn) {
        api.postComment(user, id, comment);
        this.props.preRenderComment(user, comment);
      }
    }
  };
}

export default AddComment;
