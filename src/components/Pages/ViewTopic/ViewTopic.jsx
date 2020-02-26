import React, { Component } from "react";
import axios from "axios";
import { ArticleList, api } from "../../../routes/component.routes";

class ViewTopic extends Component {
  state = { articles: [] };
  render() {
    return (
      <div>
        <h2>{this.props.topic.toUpperCase()}</h2>
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }

  fetchArticles() {
    const { topic } = this.props;
    const path = api.url + `/articles?topic=${topic}`;
    axios.get(path).then(res => {
      const { articles } = res.data;
      this.setState({ articles });
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }
}

export default ViewTopic;
