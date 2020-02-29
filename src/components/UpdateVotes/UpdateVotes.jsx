import React, { Component } from "react";
import { navigate } from "@reach/router";
import { api } from "../../routes/component.routes";
import "./UpdateVotes.css";

class UpdateVotes extends Component {
  state = { vote: null };

  render() {
    const {
      content,
      id,
      votes,
      preRenderVote,
      currentVote,
      loggedIn
    } = this.props.args;
    return (
      <div>
        <button
          id={this.state.vote === "upvote" ? "upvote" : "button"}
          onClick={event => {
            if (loggedIn) {
              this.amendVotes(
                content,
                id,
                "upvote",
                currentVote,
                preRenderVote
              );
            } else {
              navigate("/login");
            }
          }}
        >
          +
        </button>{" "}
        {votes}{" "}
        <button
          id={this.state.vote === "downvote" ? "downvote" : "button"}
          onClick={event => {
            if (loggedIn) {
              this.amendVotes(
                content,
                id,
                "downvote",
                currentVote,
                preRenderVote
              );
            } else {
              navigate("/login");
            }
          }}
        >
          -
        </button>
      </div>
    );
  }

  amendVotes = (content, id, newVote, currentVote, preRenderVote) => {
    const ref = { upvote: 1, downvote: -1 };
    const reverseRef = { upvote: -1, downvote: 1 };

    let voteValue = ref[newVote];
    let newVoteState = newVote;

    if (newVote === currentVote) {
      voteValue = reverseRef[newVote];
      newVoteState = null;
    }

    api.incrementVote(content, id, voteValue);
    preRenderVote(voteValue, newVoteState, id);
    this.setState({ vote: newVoteState });
  };
}

export default UpdateVotes;
