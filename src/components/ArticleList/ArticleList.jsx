import React from "react";
import "./ArticleList.css";
import { Link } from "@reach/router";

const ArticleList = props => {
  const { articles } = props;
  return (
    <div>
      <ul id="articlesList">
        {articles.map(article => {
          return (
            <div key={article.article_id}>
              <li className="title">
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </li>
              <li>(Topic) {article.topic}</li>
              <li>(Written By) {article.author}</li>
              <li>{article.comment_count} comments</li>
              <br></br>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
