import React, { Component } from "react";
import axios from "axios";
import { ArticleList, api } from "../../../routes/component.routes";

class Home extends Component {
  state = { articles: [] };
  render() {
    return (
      <div>
        <h2>Most Discussed</h2>
        <ArticleList
          articles={this.state.articles}
          updateCurrentPath={this.props.updateCurrentPath}
        />
      </div>
    );
  }

  fetchArticles() {
    const path = api.url + "/articles?sort_by=comment_count";
    axios.get(path).then(res => {
      const { articles } = res.data;
      this.setState({ articles });
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }
}

export default Home;
