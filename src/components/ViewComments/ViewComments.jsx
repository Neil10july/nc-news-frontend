import React, { Component } from "react";
import axios from "axios";
import "./ViewComments.css";
import { api, SortBy } from "../../routes/component.routes";
import { Link } from "@reach/router";

class ViewComments extends Component {
  state = { path: `/articles/${this.props.article_id}/comments`, comments: [] };
  render() {
    const { comments } = this.state;
    return (
      <div>
        <br></br>
        <SortBy generateQuery={this.generateQuery} content={"comments"} />
        <ul id="commentsList">
          {comments.map(comment => {
            return (
              <div key={comment.comment_id}>
                <div className="comment">
                  <li className="commentContent">
                    <Link to="/">{comment.author}</Link>
                  </li>
                  <li className="commentContent">{comment.body}</li>
                  <li className="commentContent">
                    <button>+</button> {comment.votes} <button>-</button>
                  </li>
                </div>
                <br></br>
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
    const url = api.url + this.state.path;
    axios.get(url).then(res => {
      const { comments } = res.data;
      this.setState({ comments });
    });
  };

  generateQuery = event => {
    event.preventDefault();
    const id = this.props.article_id;
    const query = event.target.value;
    const queryRef = {
      Newest: { sort_by: "created_at", order: "desc" },
      Oldest: { sort_by: "created_at", order: "asc" },
      Highest_rated: { sort_by: "votes", order: "desc" },
      Lowest_rated: { sort_by: "votes", order: "asc" }
    };
    const { sort_by, order } = queryRef[query];
    this.setState({
      path: `/articles/${id}/comments?sort_by=${sort_by}&order=${order}`
    });
  };
}

export default ViewComments;
